import {
  classListHeader,
  classListMainDiv,
  defaultOption,
  selectOption,
} from "./elementPresets";
import { getCollegeName } from "./utils";

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
} from "./apiHitters/schoolDataFetch";

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
  // cache data
  // if for some reason cached, use cached data

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

function getSendingCourses(articulationObj) {
  const sendingArticulation = articulationObj.sendingArticulation;
  if (sendingArticulation.items) {
    const items = sendingArticulation.items;

    if (!sendingArticulation.noArticulationReason) {
      let courseList = [];

      items.forEach((courseObj) => {
        const courses = courseObj.items;

        if (courses.length > 1) {
          const connector = courseObj.courseConjunction;
          let courseGroup = createGroup(connector, courses);

          courseList.push(courseGroup);
        } else {
          const course = getCourse(courses[0]);

          courseList.push(course);
        }
      });

      if (items.length > 1) {
        const groupConnector = extractGroupConnector(sendingArticulation);

        courseList = conjoin(courseList, groupConnector);

        return courseList;
      } else {
        return courseList;
      }
    } else {
      return sendingArticulation.noArticulationReason;
    }
  }
}

function extractGroupConnector(sendingArticulation) {
  if (sendingArticulation.courseGroupConjunctions) {
    const arr = sendingArticulation.courseGroupConjunctions;
    const lastItem = arr[arr.length - 1];

    if (lastItem) {
      if (lastItem.groupConjunction) {
        return lastItem.groupConjunction;
      }
    }
  }
}

function getCourse(courseObj) {
  const { prefix, courseNumber, courseTitle } = courseObj;

  return { prefix, courseNumber, courseTitle };
}

function createGroup(conjunction, groupCourses) {
  const connector = conjunction;
  const coursesInGroup = groupCourses;
  let group = [];

  // may not need these...
  const pad1 = connector.padStart(connector.length + 1, " ");
  const pad2 = pad1.padEnd(pad1.length + 1, " ");

  coursesInGroup.forEach((courseObj) => {
    const course = getCourse(courseObj);

    group.push(course);
  });

  group = alphaSort(group, ["courseNumber"]);

  return conjoin(group, pad2);
}

*/
