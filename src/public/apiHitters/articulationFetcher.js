import { getCommunityColleges } from "./schoolDataFetch";
import { updateProgressTracker } from "../utils";
import { createClassLists, organizeArticulations } from "../assistDataRender";

import {
  showRandomLoadingGif,
  showResults,
  hideResultsInfo,
} from "../cssTransitions";

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

      articulationParams.push({ link });
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

  if (!response.ok) {
    throw new Error("api is not ok");
  }

  const data = await response.json();
  const dataArray = Object.values(data);

  return dataArray;
}

async function processChunks(
  processingQueue,
  articulationData,
  signal,
  totalColleges,
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

    articulationData.push(...result);
    createClassLists(result);

    updateProgressTracker(articulationData.length, totalColleges);
    // render the result as it comes
    console.log("processed request");

    await processChunks(
      processingQueue,
      articulationData,
      signal,
      totalColleges,
    );
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("aborted request");
    } else {
      console.error("error processing request:", error);
    }
  }
}

export async function getArticulationData(articulationParams) {
  const articulationData = [];
  const processingQueue = articulationParams.slice(); // shallow copy

  const startingValue = 0;
  const totalColleges = articulationParams.length;

  const abortController = new AbortController();
  const { signal } = abortController;

  window.addEventListener("beforeunload", () => abortController.abort());

  await showRandomLoadingGif();
  showResults();

  updateProgressTracker(startingValue, totalColleges);

  try {
    await processChunks(
      processingQueue,
      articulationData,
      signal,
      totalColleges,
    );

    organizeArticulations();

    console.log("all requests processed");

    hideResultsInfo();

    // play a sound? user will have interacted with the page
    // install howler
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
