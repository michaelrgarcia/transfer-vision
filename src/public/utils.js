import _ from "lodash";

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

export function changeSelectedClassTxt(classString) {
  const selectedClass = document.querySelector(".selected-class");

  selectedClass.textContent = `Articulations for: ${classString}`;
}

export function alphaSort(array1, array2) {
  let arr = array1;
  arr = _.orderBy(arr, array2, ["asc"]);

  return arr;
}

export function selectClassByIndex(lowerDivsList, selectedIndex) {
  lowerDivsList.forEach((item, index) => {
    const lowerDiv = item;
    const selected = true;

    if (index === selectedIndex) {
      if (Array.isArray(lowerDiv)) {
        lowerDiv.push({ selected });
      } else {
        lowerDiv.selected = true;
      }
    }
  });

  sessionStorage.setItem("selectedLowerDivs", JSON.stringify(lowerDivsList));
}

export function deSelectAllClasses(lowerDivsList) {
  lowerDivsList.forEach((item) => {
    const lowerDiv = item;

    if (Array.isArray(lowerDiv)) {
      lowerDiv.forEach((subitem, subIndex) => {
        if (typeof subitem === "object" && subitem.selected) {
          lowerDiv.splice(subIndex, 1);
        }
      });
    } else if (typeof lowerDiv === "object" && !Array.isArray(lowerDiv)) {
      delete lowerDiv.selected;
    }
  });

  sessionStorage.setItem("selectedLowerDivs", JSON.stringify(lowerDivsList));
}
