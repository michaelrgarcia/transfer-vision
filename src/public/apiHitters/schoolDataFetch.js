async function fetchSchoolData(url, cacheKey) {
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

async function fetchLowerDivs(receivingId, key) {
  try {
    const endpoint = `https://cs46plizg2.execute-api.us-east-2.amazonaws.com/74/6/${receivingId}/${key}/lower-divs`;

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
    const now = new Date().getTime();
    const tenDaysMs = 10 * (24 * 60 * 60 * 1000);

    const cachedCCs = localStorage.getItem("communityColleges");
    const cacheTimestamp = localStorage.getItem("cacheTimestamp");

    if (cachedCCs && cacheTimestamp) {
      const lastUpdateMs = new Date(cacheTimestamp).getTime();

      if (now - lastUpdateMs < tenDaysMs) {
        return JSON.parse(cachedCCs);
      }
    } else {
      const endpoint =
        "https://cs46plizg2.execute-api.us-east-2.amazonaws.com/community-colleges";

      const latestData = await fetchSchoolData(endpoint, "communityColleges");

      return latestData;
    }
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

      if (now - lastUpdateMs < tenDaysMs) {
        return JSON.parse(cachedFourYears);
      }
    } else {
      const endpoint =
        "https://cs46plizg2.execute-api.us-east-2.amazonaws.com/four-years";

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
    const endpoint = `https://cs46plizg2.execute-api.us-east-2.amazonaws.com/major-data/${receivingId}/74`;

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
