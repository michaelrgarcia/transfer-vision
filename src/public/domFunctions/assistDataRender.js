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

export function createClassLists(chunk) {
  chunk.forEach((college) => {
    if (college.result) {
      const classListDiv = classListMainDiv();

      const collegeName = getCollegeName(college.result);

      classListHeader(classListDiv, collegeName);
    }
  });
}

/*

function getChunkArticulationData(jsonArray) {
  const dataChunk = [];

  jsonArray.forEach((json) => {
    const articulationData = Object.values(json)[0];
    const collegeName = getChunkCollegeName(articulationData);
    console.log(collegeName);

    const list = createArticulationList(articulationData);

    if (list) {
      if (list.length >= 2) {
        list.push(collegeName);
      }

      dataChunk.push(list);
    }
  });

  return dataChunk;
}



function createArticulationList(articulationData) {
  if (articulationData) {
    if (articulationData.articulations) {
      const availableArticulations = deNest(articulationData.articulations);
      let articulationGroup = [];

      availableArticulations.forEach((dataset) => {
        const articulationObj = dataset.articulation;

        const receiving = getReceivingCourses(articulationObj);
        const sending = getSendingCourses(articulationObj);

        articulationGroup.push({ receiving, sending });
      });

      return articulationGroup;
    }
  }
}

function getReceivingCourses(articulationObj) {
  if (articulationObj.course) {
    const courseObj = articulationObj.course;

    return getCourse(courseObj);
  } else if (articulationObj.series) {
    const seriesObj = articulationObj.series;

    return seriesBreakdown(seriesObj);
  }
}





*/
