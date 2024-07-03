/* eslint-disable no-unused-vars */

import helveticaNeueLightWoff from "./fonts/helveticaneuelight-webfont.woff";
import helveticaNeueLightWoff2 from "./fonts/helveticaneuelight-webfont.woff2";
import selectArrow from "./imgs/arrow-204-16.png";
import helpBox from "./svgs/help-box.svg";
import closeBox from "./svgs/close-box.svg";

import { renderFourYears, renderMajorData } from "./public/assistDataRender";

const schoolList = document.getElementById("four-year");
const majorList = document.getElementById("major");
const classList = document.getElementById("class");

const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector(".close-dialog");

renderFourYears(schoolList);
// renderMajorData(majorList, 79);

closeDialog.addEventListener("click", () => {
  dialog.close();
});
