import { LowerDiv, UnfilteredSeries } from "../../interfaces/assistData";

const schoolDataFetcher = process.env.SCHOOL_DATA_FETCHER;

interface School {
  id: number;
  name: string;
}

interface Major {
  major: string;
  key: string;
}

type RawLowerDivs = (LowerDiv | UnfilteredSeries)[];

async function fetchSchoolData(url: string): Promise<School[]> {
  let schoolData: School[];

  try {
    const response = await fetch(url);
    const data: Promise<object> = await response.json();

    schoolData = Object.values(data);
  } catch (error) {
    console.error("error fetching school data:", error);
  }

  return schoolData;
}

async function fetchLowerDivs(
  receivingId: number,
  key: string,
  year: number,
): Promise<RawLowerDivs> {
  let lowerDivs: RawLowerDivs; // series add dimensions

  try {
    const endpoint = `${schoolDataFetcher}/lower-divs/${year}/6/${receivingId}/${key}`; // 6 is a placeholder community college

    const response = await fetch(endpoint);
    const data: Promise<object> = await response.json();

    lowerDivs = Object.values(data);
  } catch (error) {
    console.log("error fetching lower divs:", error);
  }

  return lowerDivs;
}

export async function getCommunityColleges(): Promise<School[]> {
  let communityColleges: School[];

  try {
    const endpoint = `${schoolDataFetcher}/community-colleges`;

    const latestData: School[] = await fetchSchoolData(endpoint);

    communityColleges = latestData;
  } catch (error) {
    console.error("error retrieving community colleges:", error);
  }

  return communityColleges;
}

export async function getFourYears(): Promise<School[]> {
  let fourYears: School[];

  try {
    const endpoint = `${schoolDataFetcher}/four-years`;

    const latestData: School[] = await fetchSchoolData(endpoint);

    fourYears = latestData;
  } catch (error) {
    console.error("error retrieving four years:", error);
  }

  return fourYears;
}

export async function getMajorData(
  receivingId: number,
  year: number,
): Promise<Major[]> {
  let majorData: Major[];

  try {
    const endpoint = `${schoolDataFetcher}/major-data/${receivingId}/${year}`;

    const response = await fetch(endpoint);
    const data: Promise<object> = await response.json();

    majorData = Object.values(data);
  } catch (error) {
    console.error(`Error fetching majors for ${receivingId}:`, error);
  }

  return majorData;
}

export async function getLowerDivs(
  receivingId: number,
  key: string,
  year: number,
): Promise<RawLowerDivs> {
  let lowerDivs: RawLowerDivs;

  try {
    const latestData: RawLowerDivs = await fetchLowerDivs(
      receivingId,
      key,
      year,
    );

    lowerDivs = latestData;
  } catch (error) {
    console.error("error retrieving lower divs:", error);
  }

  return lowerDivs;
}
