/* eslint-disable no-unused-vars */

import helveticaNeueLightWoff from "./fonts/helveticaneuelight-webfont.woff";
import helveticaNeueLightWoff2 from "./fonts/helveticaneuelight-webfont.woff2";
import selectArrow from "./imgs/arrow-204-16.png";
import helpBox from "./svgs/help-box.svg";
import closeBox from "./svgs/close-box.svg";

import {
  debouncedGetArticulationData,
  getArticulationParams,
} from "./public/assistDataFetch";

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

const requestInProgress = sessionStorage.getItem("requestInProgress");

const selects = [
  document.getElementById("four-year"),
  document.getElementById("major"),
  document.getElementById("class"),
];

const schoolList = selects[0];
const majorList = selects[1];
const classList = selects[2];

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

  // call a backend endpoint that tells frontend if there is request done
  // if response says "done", change sessionStorage requestInProgress to false
  // else, keep requestInProgress the way it is
});

selects[0].addEventListener("input", () => {
  const selectedOption = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedOption.dataset.sending;

  renderMajorData(majorList, receivingId);

  majorList.replaceChildren();
  classList.replaceChildren();

  applyDisabledState(classList.parentNode);
  applyDisabledState(submit.parentNode);
});

selects[1].addEventListener("input", () => {
  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  const selectedMajor = majorList.options[majorList.selectedIndex];
  const { key } = selectedMajor.dataset;

  classList.replaceChildren();

  renderLowerDivs(classList, receivingId, key);

  applyDisabledState(submit.parentNode);
});

selects[2].addEventListener("input", () => {
  if (requestInProgress === false) {
    removeDisabledState(submit.parentNode);
  }
});

submit.addEventListener("click", async (event) => {
  const selectedSchool = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedSchool.dataset.sending;

  const selectedMajor = majorList.options[majorList.selectedIndex];
  const majorKey = selectedMajor.dataset.key;

  if (classList.value && requestInProgress === false) {
    // const params = await getArticulationParams(receivingId, majorKey);
    // await debouncedGetArticulationData(params);

    applyDisabledState(submit.parentNode);
    hideSplash();

    // get the specific class from getLowerDivs
    // make a function on backend that gets that 1 class
    // route will include the prefix, course #, and class title
  } else if (requestInProgress === true) {
    // show dialog saying that a request is in progress
    // tell user that sound will play when request is open
    // "unmute tab and keep it open"
    // 1 big request is allowed at a time
    // beg the user for help (better API tier, how to handle multiple big requests)
  }

  event.preventDefault();
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});

// save school data in sessionStorage

// (the API needs to start up to load the schools)
