import { hideLoadingGif, randomLoadingGif } from "./cssTransitions";

async function getCommunityColleges() {
  try {
    const endpoint =
      "https://classglance.onrender.com/schools/community-colleges";

    const response = await fetch(endpoint);
    const data = await response.json();
    const dataArray = Object.values(data);

    return dataArray;
  } catch (error) {
    console.error("Error fetching community colleges:", error);

    return null;
  }
}

export async function getFourYears() {
  try {
    const endpoint = "https://classglance.onrender.com/schools/four-years";

    const response = await fetch(endpoint);
    const data = await response.json();
    const dataArray = Object.values(data);

    return dataArray;
  } catch (error) {
    console.error("Error fetching universities:", error);

    return null;
  }
}

export async function getMajorData(receivingId) {
  try {
    const endpoint = `https://classglance.onrender.com/schools/major-data/${receivingId}/74`;

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
    const endpoint = `https://classglance.onrender.com/schools/74/6/${receivingId}/${key}/lower-divs`;

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

  const endpoint = "https://assistscraper.onrender.com/articulation-data";

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

async function processNext(processingQueue, results, signal) {
  const concurrencyLimit = 7;

  if (processingQueue.length !== 0) {
    const linksChunk = processingQueue.splice(0, concurrencyLimit);

    try {
      const result = await sendArticulationRequests(linksChunk, signal);
      results.push(...result);
      // render the result as it comes
      console.log("processed request");

      await processNext(processingQueue, results, signal);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("aborted request");
      } else {
        console.error("error processing request:", error);
      }
    }
  }
}

export async function getArticulationData(articulationParams) {
  const results = [];
  const processingQueue = articulationParams.slice();
  const concurrencyLimit = 1;

  const abortController = new AbortController();
  const { signal } = abortController;

  window.addEventListener("beforeunload", () => abortController.abort());

  await randomLoadingGif();

  const initialPromises = Array.from({ length: concurrencyLimit }, () =>
    processNext(processingQueue, results, signal),
  );

  try {
    await Promise.all(initialPromises);

    hideLoadingGif();
    console.log("all requests processed");
    // play a sound. user will have interacted with the page
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

  console.log(results);
  return results;
}
