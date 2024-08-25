import {
  createClassLists,
  organizeArticulations,
} from "../domFunctions/assistDataRender";

import { getCommunityColleges } from "./schoolDataFetch";
import { getMatches } from "./jsonHelper";

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

async function sendArticulationRequests(links, signal) {
  const linksList = JSON.stringify(links);

  const endpoint = process.env.ARTICULATION_FETCHER;

  const response = await fetch(endpoint, {
    body: linksList,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal,
  });

  const data = await response.json();
  const dataArray = Object.values(data);

  return dataArray;
}

async function processChunks(
  processingQueue,
  articulationData,
  signal,
  totalColleges,
  lowerDiv,
) {
  const concurrencyLimit = 29; // dynamic value

  let linksChunk;

  if (processingQueue.length === 0) return;

  if (processingQueue.length < concurrencyLimit) {
    linksChunk = processingQueue.splice(0, processingQueue.length - 1);
  } else {
    linksChunk = processingQueue.splice(0, concurrencyLimit);
  }

  try {
    const result = await sendArticulationRequests(linksChunk, signal);
    const articulationChunk = getMatches(result, lowerDiv);

    articulationData.push(...result);

    createClassLists(articulationChunk);

    updateProgressTracker(articulationData.length, totalColleges);

    await processChunks(
      processingQueue,
      articulationData,
      signal,
      totalColleges,
      lowerDiv,
    );
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("aborted request");
    } else {
      console.error("error processing request:", error);
    }
  }
}

export async function getArticulationData(
  articulationParams,
  selectedClass,
  formattedClass,
) {
  const articulationData = [];
  const processingQueue = articulationParams.slice(); // shallow copy

  const startingValue = 0;
  const totalColleges = articulationParams.length;

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

  changeSelectedClassTxt(formattedClass);
  updateProgressTracker(startingValue, totalColleges);

  try {
    await processChunks(
      processingQueue,
      articulationData,
      signal,
      totalColleges,
      selectedClass,
    );

    if (!aborted) {
      organizeArticulations();

      hideLoadingContainer();

      console.log("all requests processed");
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

  return articulationData;
}
