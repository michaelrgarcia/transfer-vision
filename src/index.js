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
  getClassName,
} from "./public/domFunctions/assistDataRender";

import {
  applyDisabledState,
  hideSplash,
  removeDisabledState,
  showRandomLoadingGif,
} from "./public/domFunctions/cssTransitions";

import {
  deSelectAllClasses,
  selectClassByIndex,
  getSelectedClass,
} from "./public/utils";

const selects = [
  document.getElementById("four-year"),
  document.getElementById("major"),
  document.getElementById("class"),
];

const schoolList = selects[0];
const majorList = selects[1];
const classList = selects[2];

const submit = document.querySelector(".submit");

const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector(".close-dialog");

const backButton = document.querySelector(".back");

document.addEventListener("DOMContentLoaded", async () => {
  for (let i = 1; i < selects.length; ) {
    if (selects[i].parentNode) {
      applyDisabledState(selects[i].parentNode);
      i += 1;
    }
  }

  applyDisabledState(submit.parentNode);

  renderFourYears(schoolList);

  await showRandomLoadingGif();

  // remove old caches that may be stuck on devices

  localStorage.removeItem("cacheTimestamp");
  localStorage.removeItem("fourYears");
  localStorage.removeItem("communityColleges");
});

schoolList.addEventListener("input", () => {
  const selectedOption = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedOption.dataset.sending;

  renderMajorData(majorList, receivingId);

  majorList.replaceChildren();
  classList.replaceChildren();

  applyDisabledState(classList.parentNode);
  applyDisabledState(submit.parentNode);
});

majorList.addEventListener("input", () => {
  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  const selectedMajor = majorList.options[majorList.selectedIndex];
  const { key } = selectedMajor.dataset;

  classList.replaceChildren();

  renderLowerDivs(classList, receivingId, key);

  applyDisabledState(submit.parentNode);
});

classList.addEventListener("change", (event) => {
  const selectedIndex = Number(event.target.value);

  if (selectedIndex !== "") {
    const lowerDivsList = JSON.parse(
      sessionStorage.getItem("selectedLowerDivs"),
    );

    deSelectAllClasses(lowerDivsList);
    selectClassByIndex(lowerDivsList, selectedIndex);
  }

  removeDisabledState(submit.parentNode);
});

submit.addEventListener("click", async (event) => {
  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  const selectedMajor = majorList.options[majorList.selectedIndex];
  const majorKey = selectedMajor.dataset.key;

  applyDisabledState(submit.parentNode);

  if (classList.value) {
    const params = await getArticulationParams(receivingId, majorKey);

    const selectedLowerDivs = sessionStorage.getItem("selectedLowerDivs");

    const selectedClass = getSelectedClass(JSON.parse(selectedLowerDivs));
    const formattedClass = getClassName(selectedClass);

    hideSplash();

    if (selectedLowerDivs) {
      await getArticulationData(params, selectedClass, formattedClass);
    }
  }

  event.preventDefault();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});

backButton.addEventListener("click", () => {
  removeDisabledState(submit.parentNode);
});
