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

const selects = [
  document.getElementById("four-year"),
  document.getElementById("major"),
  document.getElementById("class"),
  document.getElementById("academic-year"),
];

const schoolList = selects[0];
const majorList = selects[1];
const classList = selects[2];
const yearList = selects[3];

const submit = document.querySelector(".submit");

const backButton = document.querySelector(".back");
const closeDialogBtn = document.querySelector(".close-dialog");

const cidInfo = document.querySelector(".cid-info");

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
  const selectedOption = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedOption.dataset.sending;

  const year = selectedYear.value;

  majorList.replaceChildren();
  classList.replaceChildren();

  if (selectedOption) {
    renderMajorData(majorList, receivingId, year);
  }

  applyDisabledState(majorList.parentNode);
  applyDisabledState(classList.parentNode);
  applyDisabledState(submit.parentNode);
});

schoolList.addEventListener("input", () => {
  const selectedYear = yearList.options[yearList.selectedIndex];
  const selectedOption = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedOption.dataset.sending;

  const year = selectedYear.value;

  renderMajorData(majorList, receivingId, year);

  majorList.replaceChildren();
  classList.replaceChildren();

  applyDisabledState(classList.parentNode);
  applyDisabledState(submit.parentNode);
});

majorList.addEventListener("input", () => {
  const selectedYear = yearList.options[yearList.selectedIndex];
  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  const selectedMajor = majorList.options[majorList.selectedIndex];
  const year = selectedYear.value;
  const { key } = selectedMajor.dataset;

  classList.replaceChildren();

  renderLowerDivs(classList, receivingId, key, year);

  applyDisabledState(submit.parentNode);
});

classList.addEventListener("change", () => {
  removeDisabledState(submit.parentNode);
});

submit.addEventListener("click", async (event) => {
  const selectedYear = yearList.options[yearList.selectedIndex];
  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  const selectedMajor = majorList.options[majorList.selectedIndex];
  const majorKey = selectedMajor.dataset.key;

  const year = selectedYear.value;

  applyDisabledState(submit.parentNode);

  if (classList.value) {
    const links = await getArticulationParams(receivingId, majorKey, year);

    const selectedClass = classList.options[classList.selectedIndex];
    const courseId = selectedClass.dataset.id;

    hideSplash();

    if (selectedClass) {
      changeSelectedClassTxt(selectedClass.textContent);

      const articulationData = await getArticulationData(links, courseId, year);
      const { articulations, updateProgress } = articulationData;

      const toggleHandler = addToggleListener(
        courseId,
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
