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
  getId,
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
  changeSelectedClassTxt,
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

classList.addEventListener("change", () => {
  removeDisabledState(submit.parentNode);
});

submit.addEventListener("click", async (event) => {
  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  const selectedMajor = majorList.options[majorList.selectedIndex];
  const majorKey = selectedMajor.dataset.key;

  applyDisabledState(submit.parentNode);

  if (classList.value) {
    const links = await getArticulationParams(receivingId, majorKey);

    const selectedClass = classList.options[classList.selectedIndex];
    const courseId = selectedClass.dataset.id;

    hideSplash();

    if (selectedClass) {
      // call initial DB searcher here...

      // if class found, render the data (handle pending status)

      // pending status will make the user wait until "complete" status

      // if no class found (404)...
      changeSelectedClassTxt(selectedClass.textContent);

      await getArticulationData(links, courseId);

      console.log("h");

      // invoke cache completer endpoint w/ array of lower div ids
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
