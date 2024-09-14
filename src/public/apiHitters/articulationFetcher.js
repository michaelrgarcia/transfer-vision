/* eslint-disable no-await-in-loop */

import {
  createClassLists,
  organizeArticulations,
} from "../domFunctions/assistDataRender";

import { getCommunityColleges } from "./schoolDataFetch";

import {
  showResults,
  hideLoadingContainer,
  hideResults,
  showSplash,
  hideBackButton,
} from "../domFunctions/cssTransitions";

import {
  changeSelectedClassTxt,
  updateProgressTracker,
  resetResults,
} from "../utils";

function abortRequest(abortController) {
  abortController.abort();

  hideResults();
  hideBackButton();
  showSplash();
  resetResults();
}

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
        }

        updateProgress(1);
      } catch (error) {
        console.error(`error parsing articulation: ${error}`);
      }

      end = accumulatedData.indexOf("\n");
    }
  }

  if (accumulatedData.length > 0) {
    console.log(accumulatedData);
  }

  return null;
}

async function requestArticulations(
  links,
  signal,
  receivingId,
  courseId,
  updateProgress,
) {
  try {
    const linksList = JSON.stringify(links);

    const endpoint = `${process.env.NEW_ARTICULATION_FETCHER}/?receivingId=${receivingId}&courseId=${courseId}`;

    const response = await fetch(endpoint, {
      body: linksList,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Connection: "keep-alive",
      },
      signal,
    });

    await processStream(response.body, updateProgress);
  } catch (error) {
    console.error(`error processing stream: ${error}`);
  }

  return null;
}

async function processChunks(
  processingQueue,
  signal,
  receivingId,
  courseId,
  updateProgress,
) {
  const concurrencyLimit = 29;

  let linksChunk;

  if (processingQueue.length === 0) return;

  if (processingQueue.length < concurrencyLimit) {
    linksChunk = processingQueue.splice(0, processingQueue.length - 1);
  } else {
    linksChunk = processingQueue.splice(0, concurrencyLimit);
  }

  try {
    await requestArticulations(
      linksChunk,
      signal,
      receivingId,
      courseId,
      updateProgress,
    );

    await processChunks(
      processingQueue,
      signal,
      receivingId,
      courseId,
      updateProgress,
    );
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("aborted reqeust");
    } else {
      console.error("error processing chunk:", error);
    }
  }
}

export async function getArticulationData(links, receivingId, courseId) {
  const processingQueue = links.slice();
  const abortButton = document.querySelector(".back");

  const abortController = new AbortController();
  const { signal } = abortController;

  let aborted = false;

  window.addEventListener("beforeunload", () => abortController.abort());

  abortButton.addEventListener("click", () => {
    aborted = true;
    abortRequest(abortController);
  });

  showResults();

  let totalProcessed = 0;
  const updateProgress = (processed) => {
    totalProcessed += processed;
    updateProgressTracker(totalProcessed, links.length);
  };

  updateProgressTracker(0, links.length);

  try {
    await processChunks(
      processingQueue,
      signal,
      receivingId,
      courseId,
      updateProgress,
    );

    if (!aborted) {
      organizeArticulations();

      hideLoadingContainer();

      console.log("request finished");
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

  return null;
}
