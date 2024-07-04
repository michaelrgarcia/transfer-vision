/* eslint-disable no-unused-vars */

import helveticaNeueLightWoff from "./fonts/helveticaneuelight-webfont.woff";
import helveticaNeueLightWoff2 from "./fonts/helveticaneuelight-webfont.woff2";
import selectArrow from "./imgs/arrow-204-16.png";
import helpBox from "./svgs/help-box.svg";
import closeBox from "./svgs/close-box.svg";

import { renderFourYears, renderMajorData } from "./public/assistDataRender";
import {
  applyDisabledState,
  removeDisabledState,
} from "./public/cssTransitions";

const selects = [
  document.getElementById("four-year"),
  document.getElementById("major"),
  document.getElementById("class"),
];

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

  applyDisabledState(submit);

  renderFourYears(selects[0]);
});

selects[0].addEventListener("input", () => {
  const schoolList = selects[0];
  const majorList = selects[1];

  const selectedOption = schoolList.options[schoolList.selectedIndex];
  const receivingId = selectedOption.dataset.sending;

  removeDisabledState(schoolList.parentNode);

  renderMajorData(majorList, receivingId);

  removeDisabledState(majorList.parentNode);
});

closeDialog.addEventListener("click", () => {
  dialog.close();
});

// save school data in sessionStorage? (maybe all data?)
