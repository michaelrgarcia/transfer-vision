import {
  classListHeader,
  classListMainDiv,
  defaultOption,
  selectOption,
  lowerDivOption,
} from "./elementPresets";

import {
  showDialog,
  closeDialog,
  startLoading,
  stopLoading,
} from "./cssTransitions";

import {
  getFourYears,
  getLowerDivs,
  getMajorData,
} from "../apiHitters/schoolDataFetch";

import { getCollegeName } from "../apiHitters/jsonHelper";

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

  const select = classList;
  const placeholder = defaultOption("class");

  select.replaceChildren();
  select.appendChild(placeholder);

  lowerDivs.forEach((obj, classIndex) => {
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

      const option = lowerDivOption(seriesString, classIndex);
      select.appendChild(option);
    } else {
      const className = `${obj.prefix} ${obj.courseNumber} - ${obj.courseTitle}`;
      const option = lowerDivOption(className, classIndex);

      select.appendChild(option);
    }
  });

  stopLoading(formRow, loadingText);
}

export function organizeArticulations() {
  const articulationsDiv = document.querySelector(".articulations");
  const classLists = document.querySelectorAll(".class-list");

  const listArray = Array.from(classLists);

  listArray.sort((a, b) => {
    const currentButton = a.querySelector("button");
    const nextButton = b.querySelector("button");

    if (currentButton && nextButton) {
      return currentButton.textContent.localeCompare(nextButton.textContent);
    }

    return 0;
  });

  listArray.forEach((list) => {
    articulationsDiv.appendChild(list);
  });
}

export function createClassLists(articulationChunk) {
  articulationChunk.forEach((articulation) => {
    if (Array.isArray(articulation)) {
      const collegeName = articulation[articulation.length - 1];
      const noCollegeName = articulation.slice(0, -1);

      const classListDiv = classListMainDiv();

      classListHeader(classListDiv, collegeName);

      let finalString = "";

      noCollegeName.forEach((item, index) => {
        if (typeof item === "object") {
          if (item.prefix && item.courseNumber && item.CourseTitle) {
            const className = `${item.prefix} ${item.courseNumber} - ${item.courseTitle}`;

            finalString += className;
          }
        } else if (Array.isArray(item)) {
          let seriesString = "";
          const connector = item.find((subitem) => typeof subitem === "string");

          item.forEach((obj, subindex) => {
            if (typeof item === "object") {
              if (obj.prefix && obj.courseNumber && obj.CourseTitle) {
                const className = `${obj.prefix} ${obj.courseNumber} - ${obj.courseTitle}`;

                seriesString += className;

                if (subindex < item.length - 1) {
                  seriesString += connector || "";
                }
              }
            }
          });

          finalString += seriesString;
        } else if (
          typeof item === "string" &&
          index < noCollegeName.length - 1
        ) {
          finalString += `\n${item}`;
        }
      });

      const textElement = document.createElement("p");
      textElement.textContent = finalString;

      classListDiv.appendChild(textElement);
    }
  });
}
