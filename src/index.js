/* eslint-disable no-unused-vars */

import helveticaNeueLightWoff from "./fonts/helveticaneuelight-webfont.woff";
import helveticaNeueLightWoff2 from "./fonts/helveticaneuelight-webfont.woff2";
import selectArrow from "./imgs/arrow-204-16.png";
import helpBox from "./svgs/help-box.svg";
import closeBox from "./svgs/close-box.svg";

import {
  renderFourYears,
  renderLowerDivs,
  renderMajorData,
} from "./public/assistDataRender";
import {
  applyDisabledState,
  hideSplash,
  removeDisabledState,
} from "./public/cssTransitions";
import {
  debouncedGetArticulationData,
  getArticulationParams,
} from "./public/assistDataFetch";

const selects = [
  document.getElementById("four-year"),
  document.getElementById("major"),
  document.getElementById("class"),
];

const form = document.querySelector("form");
const submit = document.querySelector(".submit");

const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector(".close-dialog");

document.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i < selects.length; ) {
    if (selects[i].parentNode) {
      applyDisabledState(selects[i].parentNode);
      i += 1;
    }
  }

  applyDisabledState(submit.parentNode);

  renderFourYears(selects[0]);
});

selects[0].addEventListener("input", () => {
  const schoolList = selects[0];
  const majorList = selects[1];
  const classList = selects[2];

  const selectedOption = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedOption.dataset.sending;

  renderMajorData(majorList, receivingId);

  majorList.replaceChildren();
  classList.replaceChildren();
  applyDisabledState(classList.parentNode);
  applyDisabledState(submit.parentNode);
});

selects[1].addEventListener("input", () => {
  const schoolList = selects[0];
  const majorList = selects[1];
  const classList = selects[2];

  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  const selectedMajor = majorList.options[majorList.selectedIndex];
  const { key } = selectedMajor.dataset;

  classList.replaceChildren();
  renderLowerDivs(classList, receivingId, key);
  applyDisabledState(submit.parentNode);
});

selects[2].addEventListener("input", () => {
  removeDisabledState(submit.parentNode);
});

submit.addEventListener("click", async (event) => {
  const schoolList = selects[0];
  const majorList = selects[1];
  const classList = selects[2];

  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  const selectedMajor = majorList.options[majorList.selectedIndex];
  const majorKey = selectedMajor.dataset.key;

  if (classList.value) {
    // const params = await getArticulationParams(receivingId, majorKey);
    // await debouncedGetArticulationData(params);
    applyDisabledState(submit.parentNode);
    hideSplash();
    // "get class from backend" function
    // can get lower divs through getLowerDivs and compare the title, number, and prefix from the string
  }

  event.preventDefault();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});

// save school data in sessionStorage

// (the API needs to start up to load the schools)
