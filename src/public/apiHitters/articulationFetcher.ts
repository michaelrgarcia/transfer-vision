/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */

import {
  createClassLists,
  organizeArticulations,
} from "../domFunctions/assistDataRender";

import { getCommunityColleges } from "./schoolDataFetch";

import {
  showResults,
  hideLoadingContainer,
  showDialog,
  showCidSlider,
} from "../domFunctions/cssTransitions";

import { createProgressTracker, abortHandler } from "../utils";

import {
  cacheFinalizeError,
  processingPrompt,
} from "../domFunctions/elementPresets";
import { FullArticulation } from "../../interfaces/assistData";

interface ArticulationParams {
  link: string;
  agreementLink: string;
}

import { ApiArticulations } from "../../interfaces/assistData";

export async function getArticulationParams(
  receivingId: number,
  majorKey: string,
  year: number,
) {
  const articulationParams: ArticulationParams[] = [];
  const communityColleges = await getCommunityColleges();

  communityColleges.forEach((college) => {
    if (college.id) {
      const sending = college.id;
      const link = `${process.env.ASSIST_API_PARAMS}=${year}/${sending}/to/${receivingId}/Major/${majorKey}`;
      const agreementLink = `${process.env.ASSIST_AGREEMENT_PARAMS}=${year}&institution=${sending}&agreement=${receivingId}&agreementType=to&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=${year}/${sending}/to/${receivingId}/Major/${majorKey}`;

      articulationParams.push({ link, agreementLink });
    }
  });

  return articulationParams;
}

async function processStream(
  stream: ReadableStream,
  updateProgress: (processed: number) => void,
) {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");

  const streamArticulations: ApiArticulations = [];
  let accumulatedData = "";

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    const decodedChunk = decoder.decode(value, { stream: true });
    accumulatedData += decodedChunk;

    let end = accumulatedData.indexOf("\n");

    while (end !== -1) {
      const jsonString = accumulatedData.slice(0, end);
      accumulatedData = accumulatedData.slice(end + 1);

      try {
        const articulation: { result: FullArticulation } =
          JSON.parse(jsonString);

        if (articulation.result) {
          createClassLists(articulation);
          streamArticulations.push(articulation);
        }

        updateProgress(1);
      } catch (error: any) {
        console.error(`error parsing articulation: ${error}`);
      }

      end = accumulatedData.indexOf("\n");
    }
  }

  return streamArticulations;
}

async function requestArticulations(
  links: ArticulationParams[],
  signal: AbortSignal,
  courseId: string,
  year: number,
  updateProgress: (processed: number) => void,
) {
  let streamArticulations: ApiArticulations;

  try {
    const linksList = JSON.stringify(links);

    const endpoint = `${process.env.NEW_ARTICULATION_FETCHER}/?courseId=${courseId}&year=${year}`;

    const response = await fetch(endpoint, {
      body: linksList,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
      },
      signal,
    });

    streamArticulations = await processStream(response.body, updateProgress);
  } catch (error: any) {
    console.error(`error processing stream: ${error}`);
  }

  return streamArticulations;
}

async function processChunks(
  processingQueue: ArticulationParams[],
  signal: AbortSignal,
  courseId: string,
  updateProgress: (processed: number) => void,
  year: number,
  assistArticulations: ApiArticulations = [],
) {
  const concurrencyLimit = 29;

  let linksChunk: ArticulationParams[];

  if (processingQueue.length === 0) return assistArticulations;

  if (processingQueue.length < concurrencyLimit) {
    linksChunk = processingQueue.splice(0, processingQueue.length - 1);
  } else {
    linksChunk = processingQueue.splice(0, concurrencyLimit);
  }

  try {
    const streamArticulations = await requestArticulations(
      linksChunk,
      signal,
      courseId,
      year,
      updateProgress,
    );

    assistArticulations.push(...streamArticulations);

    return await processChunks(
      processingQueue,
      signal,
      courseId,
      updateProgress,
      year,
      assistArticulations,
    ); // recursive call
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("aborted request");
    } else {
      console.error("error processing chunk:", error);
    }
  }
}

export function createListFromDb(
  articulations: ApiArticulations,
  linksLength: number,
  updateProgress: (processed: number) => void,
): void {
  for (let i = 0; i < articulations.length; ) {
    const articulation = articulations[i];

    if (articulation) {
      createClassLists(articulation);
    }

    i += 1;
  }

  updateProgress(linksLength);
  hideLoadingContainer();
  showCidSlider();
}

async function getClassFromDb(
  fullCourseId: string,
  linksLength: number,
  updateProgress: (processed: number) => void,
): Promise<ApiArticulations | boolean> {
  const courseGrabber = process.env.COURSE_GRABBER;

  try {
    const response = await fetch(`${courseGrabber}/${fullCourseId}`);

    if (response.status === 200) {
      const articulations: ApiArticulations = await response.json();

      createListFromDb(articulations, linksLength, updateProgress);

      return articulations;
    }

    if (response.status === 204) {
      console.log("restarting incomplete caching job...");
      return false;
    }

    if (response.status === 206) {
      hideLoadingContainer();
      processingPrompt();
      showDialog();

      return true;
    }
  } catch (err: any) {
    console.error("error getting class from db", err);
  }

  return false;
}

async function finalizeSearch(
  fullCourseId: string,
  articulations: ApiArticulations,
): Promise<void> {
  const cacheFinalizer = process.env.CACHE_COMPLETER;

  if (articulations) {
    organizeArticulations();

    try {
      await fetch(cacheFinalizer, {
        body: JSON.stringify({
          fullCourseId,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      showCidSlider();
    } catch (err: any) {
      console.error(`error finalizing cache job: ${err}`);
      cacheFinalizeError();
    }
  }
}

export async function getArticulationData(
  links: ArticulationParams[],
  courseId: string,
  year: number,
) {
  const fullCourseId = `${courseId}_${year}`;
  const processingQueue = links.slice();

  const abortController = new AbortController();
  const { signal, isAborted } = abortHandler(abortController);

  const updateProgress = createProgressTracker(links.length);

  let articulations: ApiArticulations | boolean;

  window.addEventListener("beforeunload", () => abortController.abort());

  showResults();
  updateProgress(0);

  try {
    articulations = await getClassFromDb(
      fullCourseId,
      links.length,
      updateProgress,
    );

    if (!articulations) {
      articulations = await processChunks(
        processingQueue,
        signal,
        courseId,
        updateProgress,
        year,
      );

      hideLoadingContainer();

      if (!isAborted) {
        await finalizeSearch(fullCourseId, articulations);
      }
    }
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.log("requests aborted due to page unload");
    } else {
      console.error("error processing requests", error);
    }
  } finally {
    window.removeEventListener("beforeunload", () => abortController.abort());
  }

  return { articulations, updateProgress };
}
