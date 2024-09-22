/* eslint-disable import/no-cycle */

import waitForElementTransition from "wait-for-element-transition";

import {
  hideBackButton,
  hideCidSlider,
  hideResults,
  showSplash,
} from "./domFunctions/cssTransitions";

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

export function createProgressTracker(linksLength) {
  let totalProcessed = 0;

  const updateProgress = (processed) => {
    totalProcessed += processed;
    updateProgressTracker(totalProcessed, linksLength);
  };

  return updateProgress;
}

export function changeSelectedClassTxt(classString) {
  const selectedClass = document.querySelector(".selected-class");

  selectedClass.textContent = `Articulations for: ${classString}`;
}

export function resetResults() {
  const results = document.querySelector(".results");

  const progressTracker = document.querySelector(".progress-tracker");
  const selectedClass = document.querySelector(".selected-class");
  const articulations = document.querySelector(".articulations");
  const cidInput = document.querySelector(".cids > input");

  waitForElementTransition(results).then(() => {
    articulations.replaceChildren();
    progressTracker.textContent = "";
    selectedClass.textContent = "";
    cidInput.checked = false;
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

function abortRequest(abortController) {
  abortController.abort();

  hideCidSlider();
  hideResults();
  hideBackButton();

  showSplash();
  resetResults();
}

export function abortHandler(abortController) {
  const abortButton = document.querySelector(".back");
  let isAborted = false;

  abortButton.addEventListener("click", () => {
    isAborted = true;
    abortRequest(abortController);
  });

  return { signal: abortController.signal, isAborted };
}

function removeBackBtnListener(backHandler) {
  const backButton = document.querySelector(".back");

  backButton.removeEventListener("click", backHandler);
}

export function addBackBtnListener(
  removeDisabledState,
  removeToggleListener,
  toggleHandler,
) {
  const backButton = document.querySelector(".back");
  const submit = document.querySelector(".submit");

  function backHandler() {
    removeDisabledState(submit.parentNode);
    removeToggleListener(toggleHandler);
    removeBackBtnListener(backHandler);
  }

  backButton.addEventListener("click", backHandler);

  return backHandler;
}
