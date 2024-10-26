/* eslint-disable no-unused-vars */

import helveticaNeueLightWoff from "./fonts/helveticaneuelight-webfont.woff";
import helveticaNeueLightWoff2 from "./fonts/helveticaneuelight-webfont.woff2";
import selectArrow from "./imgs/arrow-204-16.png";
import helpBox from "./svgs/help-box.svg";
import closeBox from "./svgs/close-box.svg";
import leftArrow from "./imgs/arrow-left.svg";

import {
  getArticulationData,
  getArticulationParams,
} from "./public/apiHitters/articulationFetcher";

import {
  renderFourYears,
  renderLowerDivs,
  renderMajorData,
} from "./public/domFunctions/assistDataRender";

import {
  applyDisabledState,
  hideSplash,
  removeDisabledState,
  showDialog,
  showRandomLoadingGif,
  closeDialog,
} from "./public/domFunctions/cssTransitions";

import { addBackBtnListener, changeSelectedClassTxt } from "./public/utils";

import {
  addToggleListener,
  removeToggleListener,
} from "./public/apiHitters/cids";
import { cidPrompt } from "./public/domFunctions/elementPresets";

const schoolList = document.getElementById("four-year") as HTMLSelectElement;
const majorList = document.getElementById("major") as HTMLSelectElement;
const classList = document.getElementById("class") as HTMLSelectElement;
const yearList = document.getElementById("academic-year") as HTMLSelectElement;

const selects = document.querySelectorAll<HTMLElement>("select");

const submit = document.querySelector(".submit") as HTMLButtonElement;

const backButton = document.querySelector(".back") as HTMLImageElement;
const closeDialogBtn = document.querySelector(
  ".close-dialog",
) as HTMLImageElement;

const cidInfo = document.querySelector(".cid-info") as HTMLImageElement;

document.addEventListener("DOMContentLoaded", async () => {
  for (let i = 1; i < selects.length - 1; ) {
    if (selects[i].parentNode) {
      applyDisabledState(selects[i].parentNode);
      i += 1;
    }
  }

  applyDisabledState(submit.parentNode);

  renderFourYears(schoolList);

  await showRandomLoadingGif();
});

yearList.addEventListener("input", () => {
  const selectedYear = yearList.options[yearList.selectedIndex];
  const year = selectedYear.value;

  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  majorList.replaceChildren();
  classList.replaceChildren();

  if (selectedSchool.value) {
    renderMajorData(majorList, receivingId, year);
  }

  applyDisabledState(majorList.parentNode);
  applyDisabledState(classList.parentNode);
  applyDisabledState(submit.parentNode);
});

schoolList.addEventListener("input", () => {
  const selectedYear = yearList.options[yearList.selectedIndex];
  const year = selectedYear.value;

  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  renderMajorData(majorList, receivingId, year);

  majorList.replaceChildren();
  classList.replaceChildren();

  applyDisabledState(classList.parentNode);
  applyDisabledState(submit.parentNode);
});

majorList.addEventListener("input", () => {
  const selectedYear = yearList.options[yearList.selectedIndex];
  const year = selectedYear.value;

  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  const selectedMajor = majorList.options[majorList.selectedIndex];
  const majorKey = selectedMajor.dataset.key;

  classList.replaceChildren();

  renderLowerDivs(classList, receivingId, majorKey, year);

  applyDisabledState(submit.parentNode);
});

classList.addEventListener("change", () => {
  removeDisabledState(submit.parentNode);
});

submit.addEventListener("click", async (event) => {
  const selectedYear = yearList.options[yearList.selectedIndex];
  const year = selectedYear.value;

  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  const selectedMajor = majorList.options[majorList.selectedIndex];
  const majorKey = selectedMajor.dataset.key;

  const selectedClass = classList.options[classList.selectedIndex];
  const courseId = selectedClass.dataset.id;

  applyDisabledState(submit.parentNode);

  if (classList.value) {
    const links = await getArticulationParams(receivingId, majorKey, year);

    const fullCourseId = `${courseId}_${year}`;

    hideSplash();

    if (selectedClass) {
      changeSelectedClassTxt(selectedClass.textContent);

      const articulationData = await getArticulationData(links, courseId, year);
      const { articulations, updateProgress } = articulationData;

      const toggleHandler = addToggleListener(
        fullCourseId,
        articulations,
        links.length,
        updateProgress,
      );

      addBackBtnListener(removeToggleListener, toggleHandler);
    }
  }

  event.preventDefault();
});

closeDialogBtn.addEventListener("click", () => {
  closeDialog();
});

cidInfo.addEventListener("click", () => {
  cidPrompt();
  showDialog();
});

backButton.addEventListener("click", () => {
  removeDisabledState(submit.parentNode);
});
