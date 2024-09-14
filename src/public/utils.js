import _ from "lodash";
import waitForElementTransition from "wait-for-element-transition";

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

export async function getRandomLoadingGif(imgElement) {
  const img = imgElement;

  const response = await fetch(process.env.LOADING_GIF_ENDPOINT, {
    mode: "cors",
  });
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

export function changeSelectedClassTxt(classString) {
  const selectedClass = document.querySelector(".selected-class");

  selectedClass.textContent = `Articulations for: ${classString}`;
}

export function alphaSort(array1, array2) {
  let arr = array1;
  arr = _.orderBy(arr, array2, ["asc"]);

  return arr;
}

export function resetResults() {
  const results = document.querySelector(".results");

  const progressTracker = document.querySelector(".progress-tracker");
  const selectedClass = document.querySelector(".selected-class");
  const articulations = document.querySelector(".articulations");

  waitForElementTransition(results).then(() => {
    articulations.replaceChildren();
    progressTracker.textContent = "";
    selectedClass.textContent = "";
  });
}

export function filterLowerDiv(objOrArray) {
  const lowerDiv = objOrArray;

  if (typeof lowerDiv === "object" && !Array.isArray(lowerDiv)) {
    delete lowerDiv.courseId;
  } else if (Array.isArray(lowerDiv)) {
    for (let i = 0; i < lowerDiv.length; ) {
      const item = lowerDiv[i];

      if (item.seriesId) {
        lowerDiv.splice(i, 1);
      }

      i += 1;
    }
  }

  return lowerDiv;
}
