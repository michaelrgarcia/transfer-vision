const schoolDataFetcher = process.env.SCHOOL_DATA_FETCHER;

async function fetchSchoolData(url) {
  let dataArray;

  try {
    const response = await fetch(url);
    const data = await response.json();
    dataArray = Object.values(data);
  } catch (error) {
    console.error("error fetching school data:", error);
  }

  return dataArray;
}

// need to accommodate this for dynamodb

async function fetchLowerDivs(receivingId, key) {
  try {
    const endpoint = `${schoolDataFetcher}/74/6/${receivingId}/${key}/lower-divs`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const latestData = Object.values(data);

    sessionStorage.setItem("selectedLowerDivs", JSON.stringify(data));

    return latestData;
  } catch (error) {
    console.log("error fetching lower divs:", error);
  }

  return null;
}

export async function getCommunityColleges() {
  try {
    const endpoint = `${schoolDataFetcher}/community-colleges`;

    const latestData = await fetchSchoolData(endpoint, "communityColleges");

    return latestData;
  } catch (error) {
    console.error("error retrieving community colleges:", error);
  }

  return null;
}

export async function getFourYears() {
  try {
    const now = new Date().getTime();
    const tenDaysMs = 10 * (24 * 60 * 60 * 1000);

    const cachedFourYears = localStorage.getItem("fourYears");
    const cacheTimestamp = localStorage.getItem("cacheTimestamp");

    if (cachedFourYears && cacheTimestamp) {
      const lastUpdateMs = new Date(cacheTimestamp).getTime();

      // flawed caching system

      // lets look into dynamo db...
      if (now - lastUpdateMs > tenDaysMs) {
        return JSON.parse(cachedFourYears);
      }
    } else {
      const endpoint = `${schoolDataFetcher}/four-years`;

      const latestData = await fetchSchoolData(endpoint, "fourYears");

      return latestData;
    }
  } catch (error) {
    console.error("error retrieving four years:", error);
  }

  return null;
}

export async function getMajorData(receivingId) {
  try {
    const endpoint = `${schoolDataFetcher}/major-data/${receivingId}/74`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const dataArray = Object.values(data);

    return dataArray;
  } catch (error) {
    console.error(`Error fetching majors for ${receivingId}:`, error);

    return null;
  }

  // cache this on schoolDataFetcher DB
}

export async function getLowerDivs(receivingId, key) {
  try {
    const latestData = await fetchLowerDivs(receivingId, key);

    return latestData;
  } catch (error) {
    console.error("error retrieving lower divs:", error);
  }

  return null;
}
