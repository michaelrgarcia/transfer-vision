/* eslint-disable import/no-cycle */
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

import { processingPrompt } from "../domFunctions/elementPresets";

export async function getArticulationParams(receivingId, majorKey) {
  const articulationParams = [];
  const communityColleges = await getCommunityColleges();

  const year = 74;
  const receiving = receivingId;
  const key = majorKey;

  communityColleges.forEach((college) => {
    if (college.id) {
      const sending = college.id;
      const link = `${process.env.ASSIST_API_PARAMS}=${year}/${sending}/to/${receiving}/Major/${key}`;
      const agreementLink = `${process.env.ASSIST_AGREEMENT_PARAMS}=${year}&institution=${sending}&agreement=${receiving}&agreementType=to&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=${year}/${sending}/to/${receiving}/Major/${key}`;

      articulationParams.push({ link, agreementLink });
    }
  });

  return articulationParams;
}

async function processStream(stream, updateProgress) {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");

  const streamArticulations = [];
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
        const articulation = JSON.parse(jsonString);

        if (articulation.result) {
          createClassLists(articulation);
          streamArticulations.push(articulation);
        }

        updateProgress(1);
      } catch (error) {
        console.error(`error parsing articulation: ${error}`);
      }

      end = accumulatedData.indexOf("\n");
    }
  }

  return streamArticulations;
}

async function requestArticulations(links, signal, courseId, updateProgress) {
  let streamArticulations;

  try {
    const linksList = JSON.stringify(links);

    const endpoint = `${process.env.NEW_ARTICULATION_FETCHER}/?courseId=${courseId}`;

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
  } catch (error) {
    console.error(`error processing stream: ${error}`);
  }

  return streamArticulations;
}

async function processChunks(
  processingQueue,
  signal,
  courseId,
  updateProgress,
  assistArticulations = [],
) {
  const concurrencyLimit = 29;

  let linksChunk;

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
      updateProgress,
    );

    assistArticulations.push(...streamArticulations);

    return await processChunks(
      processingQueue,
      signal,
      courseId,
      updateProgress,
      assistArticulations,
    ); // recursive call
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("aborted request");
    } else {
      console.error("error processing chunk:", error);
    }
  }
}

export function createListFromDb(dbResponse, linksLength, updateProgress) {
  const articulations = dbResponse;

  for (let i = 0; i < articulations.length; ) {
    const articulation = articulations[i];

    createClassLists(articulation);

    i += 1;
  }

  updateProgress(linksLength);
  hideLoadingContainer();
  showCidSlider();
}

async function getClassFromDb(courseId, linksLength, updateProgress) {
  const courseGrabber = process.env.COURSE_GRABBER;

  try {
    const response = await fetch(`${courseGrabber}/${courseId}`);

    if (response.status === 200) {
      const articulations = await response.json();

      createListFromDb(articulations, linksLength, updateProgress);

      return articulations;
    }

    if (response.status === 204) {
      console.log("restarting incomplete caching job...");
      return false;
    }

    if (response.status === 206) {
      hideLoadingContainer(); // redirect function here instead?
      processingPrompt();
      showDialog();

      return true;
    }
  } catch (err) {
    console.error("error getting class from db", err);
  }

  return false;
}

async function finalizeSearch(courseId, articulations) {
  const cacheFinalizer = process.env.CACHE_COMPLETER;

  if (articulations) {
    organizeArticulations();

    try {
      await fetch(cacheFinalizer, {
        body: JSON.stringify({
          courseId,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      showCidSlider();
    } catch (err) {
      console.error(`error finalizing cache job: ${err}`);
      // redirect user back to home page and show error box "there was an error finalizing cache job."
    }
  }
}

export async function getArticulationData(links, courseId) {
  const processingQueue = links.slice();

  const abortController = new AbortController();
  const { signal, isAborted } = abortHandler(abortController);

  const updateProgress = createProgressTracker(links.length);

  let articulations;

  window.addEventListener("beforeunload", () => abortController.abort());

  showResults();
  updateProgress(0);

  try {
    articulations = await getClassFromDb(
      courseId,
      links.length,
      updateProgress,
    );

    if (!articulations) {
      articulations = await processChunks(
        processingQueue,
        signal,
        courseId,
        updateProgress,
      );

      hideLoadingContainer();

      if (!isAborted) {
        await finalizeSearch(courseId, articulations);
      }
    }
  } catch (error) {
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
