import { defaultOption, selectOption } from "./elementPresets";

import {
  showDialog,
  closeDialog,
  startLoading,
  stopLoading,
} from "./cssTransitions";

import { getFourYears, getLowerDivs, getMajorData } from "./assistDataFetch";

export async function renderFourYears(schoolList) {
  const formRow = schoolList.parentNode;
  const loadingText = formRow.querySelector(".loading");

  showDialog();
  startLoading(formRow, loadingText);

  const fourYears = await getFourYears();

  const select = schoolList;
  const placeholder = defaultOption("school");

  select.appendChild(placeholder);

  fourYears.forEach((school) => {
    if (school.id < 200) {
      const option = selectOption(school.name, school.id, "sending");

      select.appendChild(option);
    }
  });

  closeDialog();
  stopLoading(formRow, loadingText);
}

export async function renderMajorData(majorList, receivingId) {
  const formRow = majorList.parentElement;
  const loadingText = formRow.querySelector(".loading");

  startLoading(formRow, loadingText);

  const majorData = await getMajorData(receivingId);

  const select = majorList;
  const placeholder = defaultOption("major");

  select.replaceChildren();
  select.appendChild(placeholder);

  majorData.forEach((obj) => {
    const option = selectOption(obj.major, obj.key, "key");

    select.appendChild(option);
  });

  stopLoading(formRow, loadingText);
}

export async function renderLowerDivs(classList, receivingId, key) {
  const formRow = classList.parentNode;
  const loadingText = formRow.querySelector(".loading");

  startLoading(formRow, loadingText);

  const lowerDivs = await getLowerDivs(receivingId, key);
  // will send this data to backend through the form

  // comparisons will happen there

  const select = classList;
  const placeholder = defaultOption("class");

  select.replaceChildren();
  select.appendChild(placeholder);

  // make below statement into a function?

  lowerDivs.forEach((obj) => {
    if (Array.isArray(obj)) {
      let connector;
      let seriesString = "";

      obj.forEach((item, index) => {
        if (typeof item === "string") {
          connector = item.toLowerCase();

          if (index < obj.length - 1) {
            seriesString += ` ${connector} `;
          }
        }

        if (item.prefix && item.courseNumber && item.courseTitle) {
          const { prefix } = item;
          const { courseNumber } = item;

          const className = ` ${prefix} ${courseNumber} `;

          seriesString += className;
        }
      });

      const option = selectOption(seriesString);
      select.appendChild(option);
    } else {
      const className = `${obj.prefix} ${obj.courseNumber} - ${obj.courseTitle}`;
      const option = selectOption(className, null, null);

      select.appendChild(option);
    }
  });

  stopLoading(formRow, loadingText);
}