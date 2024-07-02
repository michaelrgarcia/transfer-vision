/* eslint-disable no-unused-vars */

import helveticaNeueLightWoff from "./fonts/helveticaneuelight-webfont.woff";
import helveticaNeueLightWoff2 from "./fonts/helveticaneuelight-webfont.woff2";
import selectArrow from "./imgs/arrow-204-16.png";
import helpBox from "./svgs/help-box.svg";
import getFourYears from "./public/assistDataImport";

const schoolList = document.getElementById("four-year");
const majorList = document.getElementById("major");
const classList = document.getElementById("class");

getFourYears(schoolList);
