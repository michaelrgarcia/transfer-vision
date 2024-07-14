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
      articulationParams.push({ year, sending, receiving, key });
    }
  });

  return articulationParams;
}

async function sendArticulationRequest(paramsObj) {
  const { year, sending, receiving, key } = paramsObj;

  const endpoint = `https://classglance.onrender.com/articulations/${year}/${sending}/${receiving}/${key}`;
  const response = await fetch(endpoint);

  const data = await response.json();
  const dataArray = Object.values(data);

  return dataArray;
}

async function processNext(processingQueue, results) {
  if (processingQueue.length !== 0) {
    const params = processingQueue.shift();

    try {
      const result = await sendArticulationRequest(params);
      results.push(result);
      // render the result as it comes
      console.log(`processed request for ${params.sending}`);
    } catch (error) {
      console.error("error processing request:", error);
    }

    await processNext(processingQueue, results);
  }
}

async function getArticulationData(articulationParams) {
  let isProcessing = false;

  if (!isProcessing) {
    isProcessing = true;

    const results = [];
    const processingQueue = articulationParams.slice();
    const concurrencyLimit = 5;

    const initialPromises = Array.from({ length: concurrencyLimit }, () =>
      processNext(processingQueue, results),
    );
    await Promise.all(initialPromises);

    console.log("all requests processed");
    isProcessing = false;

    return results.flat();
  }

  return "Please wait until the current process is finished.";
}

function debounce(func, delay) {
  let debounceTimeout;

  return (...args) => {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export async function debouncedGetArticulationData(articulationParams) {
  const debounceDelay = 100000;

  const debouncedRequest = debounce(() => {
    getArticulationData(articulationParams);
  }, debounceDelay);

  return debouncedRequest;
}
