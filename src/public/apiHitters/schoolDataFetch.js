const schoolDataFetcher = process.env.SCHOOL_DATA_FETCHER;

async function fetchSchoolData(url) {
  let schoolData;

  try {
    const response = await fetch(url);
    const data = await response.json();

    schoolData = Object.values(data);
  } catch (error) {
    console.error("error fetching school data:", error);
  }

  return schoolData;
}

async function fetchLowerDivs(receivingId, key) {
  let lowerDivs;

  try {
    const endpoint = `${schoolDataFetcher}/lower-divs/74/6/${receivingId}/${key}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const latestData = Object.values(data);

    lowerDivs = latestData;
  } catch (error) {
    console.log("error fetching lower divs:", error);
  }

  return lowerDivs;
}

export async function getCommunityColleges() {
  let communityColleges;

  try {
    const endpoint = `${schoolDataFetcher}/community-colleges`;

    const latestData = await fetchSchoolData(endpoint);

    communityColleges = latestData;
  } catch (error) {
    console.error("error retrieving community colleges:", error);
  }

  return communityColleges;
}

export async function getFourYears() {
  let fourYears;

  try {
    const endpoint = `${schoolDataFetcher}/four-years`;

    const latestData = await fetchSchoolData(endpoint, "fourYears");

    fourYears = latestData;
  } catch (error) {
    console.error("error retrieving four years:", error);
  }

  return fourYears;
}

export async function getMajorData(receivingId) {
  let majorData;

  try {
    const year = 74;
    const endpoint = `${schoolDataFetcher}/major-data/${receivingId}/${year}`;

    const response = await fetch(endpoint);
    const data = await response.json();
    const dataArray = Object.values(data);

    majorData = dataArray;
  } catch (error) {
    console.error(`Error fetching majors for ${receivingId}:`, error);
  }

  return majorData;
}

export async function getLowerDivs(receivingId, key) {
  let lowerDivs;

  try {
    const latestData = await fetchLowerDivs(receivingId, key);

    lowerDivs = latestData;
  } catch (error) {
    console.error("error retrieving lower divs:", error);
  }

  return lowerDivs;
}
