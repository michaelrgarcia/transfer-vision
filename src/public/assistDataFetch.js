export async function getFourYears() {
  try {
    const endpoint = "https://classglance.onrender.com/schools/four-years";

    const response = await fetch(endpoint);
    const data = await response.json();
    const dataArray = Object.values(data);

    return dataArray;
  } catch (error) {
    console.error("Error fetching schools:", error);

    return null;
  }
}

export async function getCCCIds() {
  try {
    const endpoint =
      "https://classglance.onrender.com/schools/community-colleges";

    const response = await fetch(endpoint);
    const data = await response.json();
    const dataArray = Object.values(data);

    const idArray = [];

    dataArray.forEach((college) => {
      if (college.id) {
        idArray.push(college.id);
      }
    });

    return idArray;
  } catch (error) {
    console.error("Error fetching schools:", error);

    return null;
  }
}

async function getArticulationParams(receivingId, majorKey) {
  const articulationParams = [];
  const cccIds = await getCCCIds();

  const year = 74;
  const receiving = receivingId;
  const key = majorKey;

  cccIds.forEach((id) => {
    articulationParams.push({ year, id, receiving, key });
  });

  return articulationParams;
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

export async function getAllMajorArticulations(receivingId, majorKey) {
  const receiving = receivingId;
  const key = majorKey;

  const articulationParams = await getArticulationParams(receiving, key);
  const endpoint =
    "https://classglance.onrender.com/articulations/articulation-params";

  const json = JSON.stringify(articulationParams);

  // h
  const res = await fetch(endpoint, {
    method: "POST",
    body: json,
  });
}
