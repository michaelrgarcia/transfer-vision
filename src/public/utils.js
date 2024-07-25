export function conjoin(array, conjunction) {
  const result = [];

  array.forEach((item, index) => {
    result.push(item);

    if (index < array.length - 1) {
      result.push(conjunction);
    }
  });

  return result;
}

export function seriesBreakdown(seriesObj) {
  const connector = seriesObj.conjunction;
  const series = [];

  if (seriesObj.courses) {
    const coursesInSeries = seriesObj.courses;

    coursesInSeries.forEach((course) => {
      const { prefix, courseNumber, courseTitle } = course;

      series.push({ prefix, courseNumber, courseTitle });
    });

    return conjoin(series, connector);
  }

  return null;
}

export function deNest(data) {
  const json = JSON.parse(data);

  if (json) {
    const processed = Object.values(json);

    return processed;
  }

  return null;
}

export async function getRandomLoadingGif(imgElement) {
  const img = imgElement;

  const response = await fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=uldN0xaiyhNfeuN7QN98ROsslA7JpaDG&s=loading",
    { mode: "cors" },
  );
  const gifData = await response.json();

  try {
    if (gifData) {
      img.src = gifData.data.images.original.url;
    }
  } catch (error) {
    console.log(error);
  }
}

export function updateProgressTracker(collegesProcessed, totalColleges) {
  const progressTracker = document.querySelector(".progress-tracker");

  progressTracker.textContent = `${collegesProcessed} out of ${totalColleges} colleges searched`;
}

export function getCollegeName(articulationData) {
  if (articulationData && articulationData.sendingInstitution) {
    const sendingData = deNest(articulationData.sendingInstitution);
    let collegeName;

    sendingData.forEach((item) => {
      if (Array.isArray(item)) {
        if (item[0].name) {
          const { name } = item[0];

          collegeName = name;
        }
      }
    });

    return collegeName;
  }

  return null;
}