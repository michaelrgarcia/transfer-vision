import {
  createClassLists,
  organizeArticulations,
} from "../domFunctions/assistDataRender";

import { getCommunityColleges } from "./schoolDataFetch";
import { getMatches } from "./jsonHelper";

import {
  showResults,
  hideLoadingContainer,
} from "../domFunctions/cssTransitions";

import { changeSelectedClassTxt, updateProgressTracker } from "../utils";

export async function getArticulationParams(receivingId, majorKey) {
  const articulationParams = [];
  const communityColleges = await getCommunityColleges();

  const year = 74;
  const receiving = receivingId;
  const key = majorKey;

  communityColleges.forEach((college) => {
    if (college.id) {
      const sending = college.id;
      const link = `https://assist.org/api/articulation/Agreements?Key=${year}/${sending}/to/${receiving}/Major/${key}`;
      const agreementLink = `https://assist.org/transfer/results?year=${year}&institution=${sending}&agreement=${receiving}&agreementType=to&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=${year}/${sending}/to/${receiving}/Major/${key}`;

      articulationParams.push({ link, agreementLink });
    }
  });

  return articulationParams;
}

async function sendArticulationRequests(links, signal) {
  const linksList = JSON.stringify(links);

  const endpoint =
    "https://g4sc52rxwf.execute-api.us-east-2.amazonaws.com/articulation-data";

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

  const abortController = new AbortController();
  const { signal } = abortController;

  window.addEventListener("beforeunload", () => abortController.abort());

  showResults();

  changeSelectedClassTxt(formattedClass);
  updateProgressTracker(startingValue, totalColleges);

  // this function will check dataBase for selected class

  // if not in there, pass in allLowerDivs array to processChunks

  // if in there, pass in selected class only, make the requests

  try {
    await processChunks(
      processingQueue,
      articulationData,
      signal,
      totalColleges,
      selectedClass,
    );

    // put articulation params in session storage

    // need to put assist links in the headers

    organizeArticulations();

    console.log("all requests processed");

    hideLoadingContainer();
    sessionStorage.removeItem("selectedLowerDivs");
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("requests aborted due to page unload");
    } else {
      console.error("error processing requests", error);
    }
  } finally {
    window.removeEventListener("beforeunload", () => abortController.abort());
  }

  console.log(articulationData);
  return articulationData;
}
