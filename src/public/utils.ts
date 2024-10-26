/* eslint-disable import/no-cycle */

import waitForElementTransition from "wait-for-element-transition";

import {
  hideBackButton,
  hideCidSlider,
  hideResults,
  showSplash,
} from "./domFunctions/cssTransitions";

interface GifData {
  data: {
    images: {
      original: {
        url: string;
      };
    };
  };
}

export async function getRandomLoadingGif(
  imgElement: HTMLImageElement,
): Promise<void> {
  const response = await fetch(process.env.LOADING_GIF_ENDPOINT, {
    mode: "cors",
  });
  const gifData: GifData = await response.json();

  try {
    if (gifData) {
      imgElement.src = gifData.data.images.original.url;
    }
  } catch (error) {
    console.log(error);
  }
}

export function updateProgressTracker(
  collegesProcessed: number,
  totalColleges: number,
): void {
  const progressTracker = document.querySelector(
    ".progress-tracker",
  ) as HTMLParagraphElement;

  progressTracker.textContent = `${collegesProcessed} out of ${totalColleges} colleges searched`;
}

export function createProgressTracker(linksLength: number) {
  let totalProcessed = 0;

  const updateProgress = (processed: number) => {
    totalProcessed += processed;
    updateProgressTracker(totalProcessed, linksLength);
  };

  return updateProgress;
}

export function changeSelectedClassTxt(classString: string): void {
  const selectedClass = document.querySelector(
    ".selected-class",
  ) as HTMLParagraphElement;

  selectedClass.textContent = `Articulations for: ${classString}`;
}

export function resetResults(): void {
  const results = document.querySelector(".results") as HTMLDivElement;

  const progressTracker = document.querySelector(
    ".progress-tracker",
  ) as HTMLParagraphElement;
  const selectedClass = document.querySelector(
    ".selected-class",
  ) as HTMLParagraphElement;
  const articulations = document.querySelector(
    ".articulations",
  ) as HTMLDivElement;
  const cidInput = document.querySelector(".cids > input") as HTMLInputElement;

  waitForElementTransition(results).then(() => {
    articulations.replaceChildren();
    progressTracker.textContent = "";
    selectedClass.textContent = "";
    cidInput.checked = false;
  });
}

export function filterLowerDiv(lowerDiv: (string | object)[]) {
  for (let i = 0; i < lowerDiv.length; ) {
    const item = lowerDiv[i];

    if (typeof item === "object" && "seriesId" in item) {
      lowerDiv.splice(i, 1);
    }

    i += 1;
  }

  return lowerDiv;
}

function abortRequest(abortController: AbortController) {
  abortController.abort();

  // clean code???????????

  hideCidSlider();
  hideResults();
  hideBackButton();

  showSplash();
  resetResults();
}

export function abortHandler(abortController: AbortController) {
  const abortButton = document.querySelector(".back") as HTMLImageElement;
  let isAborted = false;

  abortButton.addEventListener("click", () => {
    isAborted = true;
    abortRequest(abortController);
  });

  return { signal: abortController.signal, isAborted };
}

function removeBackBtnListener(backHandler: () => void): void {
  const backButton = document.querySelector(".back") as HTMLImageElement;

  backButton.removeEventListener("click", backHandler);
}

export function addBackBtnListener(
  removeToggleListener: (handler: () => void) => void,
  toggleHandler: () => void,
) {
  const backButton = document.querySelector(".back") as HTMLImageElement;

  function backHandler(): void {
    removeToggleListener(toggleHandler);
    removeBackBtnListener(backHandler);
  }

  backButton.addEventListener("click", backHandler);

  return backHandler;
}
