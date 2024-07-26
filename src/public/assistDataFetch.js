import {
  hideResultsInfo,
  showRandomLoadingGif,
  showResults,
} from "./cssTransitions";
import { createClassLists, organizeArticulations } from "./assistDataRender";
import { updateProgressTracker } from "./utils";

async function getSchoolData(url, cacheKey) {
  const now = new Date();

  try {
    const response = await fetch(url);
    const data = await response.json();
    const dataArray = Object.values(data);

    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem("cacheTimestamp", now.toISOString());

    return dataArray;
  } catch (error) {
    console.error("error caching school data:", error);
  }

  return null;
}

async function getCommunityColleges() {
  try {
    const now = new Date().getTime();
    const fiveDaysMs = 5 * (24 * 60 * 60 * 1000);

    const cachedCCs = localStorage.getItem("communityColleges");
    const cacheTimestamp = localStorage.getItem("cacheTimestamp");

    if (cachedCCs && cacheTimestamp) {
      const lastUpdateMs = new Date(cacheTimestamp).getTime();

      if (now - lastUpdateMs < fiveDaysMs) {
        return JSON.parse(cachedCCs);
      }
    } else {
      const endpoint =
        "https://cs46plizg2.execute-api.us-east-2.amazonaws.com/community-colleges";

      const latestData = await getSchoolData(endpoint, "communityColleges");

      return latestData;
    }
  } catch (error) {
    console.error("Error fetching community colleges:", error);
  }

  return null;
}

export async function getFourYears() {
  try {
    const now = new Date().getTime();
    const fiveDaysMs = 5 * (24 * 60 * 60 * 1000);

    const cachedFourYears = localStorage.getItem("fourYears");
    const cacheTimestamp = localStorage.getItem("cacheTimestamp");

    if (cachedFourYears && cacheTimestamp) {
      const lastUpdateMs = new Date(cacheTimestamp).getTime();

      if (now - lastUpdateMs < fiveDaysMs) {
        return JSON.parse(cachedFourYears);
      }
    } else {
      const endpoint =
        "https://cs46plizg2.execute-api.us-east-2.amazonaws.com/four-years";

      const latestData = await getSchoolData(endpoint, "fourYears");

      return latestData;
    }
  } catch (error) {
    console.error("Error retrieving community colleges:", error);
  }

  return null;
}

export async function getMajorData(receivingId) {
  try {
    const endpoint = `https://cs46plizg2.execute-api.us-east-2.amazonaws.com/major-data/${receivingId}/74`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const dataArray = Object.values(data);

    return dataArray;
  } catch (error) {
    console.error(`Error fetching majors for ${receivingId}:`, error);

    return null;
  }
}

export async function getLowerDivs(receivingId, key) {
  try {
    const endpoint = `https://cs46plizg2.execute-api.us-east-2.amazonaws.com/74/6/${receivingId}/${key}/lower-divs`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const dataArray = Object.values(data);

    return dataArray;
  } catch (error) {
    console.error(`Error fetching lower divs for ${receivingId}:`, error);

    return null;
  }
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
