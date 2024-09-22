import {
  classListHeader,
  classListMainDiv,
  defaultOption,
  selectOption,
  lowerDivOption,
  connector,
  conjunction,
  course,
  noArticulations,
  cid,
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

import { filterLowerDiv } from "../utils";

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

function getSeriesString(seriesArray) {
  const seriesArrayCopy = seriesArray.slice();
  const filtered = filterLowerDiv(seriesArrayCopy);

  let seriesString = "";

  filtered.forEach((lowerDiv, index) => {
    let courseConnector;
    const seriesCourse = lowerDiv;

    if (typeof seriesCourse === "object") {
      const { prefix, courseNumber } = seriesCourse;

      const className = `${prefix} ${courseNumber}`;

      seriesString += className;
    } else if (typeof seriesCourse === "string") {
      courseConnector = seriesCourse.toLowerCase();

      seriesString += courseConnector;
    }

    if (index < filtered.length - 1) {
      seriesString += " ";
    }
  });

  return seriesString;
}

export function getClassName(objOrArray) {
  let formattedClass = "";

  if (typeof objOrArray === "object" && !Array.isArray(objOrArray)) {
    formattedClass = `${objOrArray.prefix} ${objOrArray.courseNumber} - ${objOrArray.courseTitle}`;
  } else if (Array.isArray(objOrArray)) {
    formattedClass = getSeriesString(objOrArray);
  }

  return formattedClass;
}

export function getId(objOrArray) {
  let id;

  if (typeof objOrArray === "object" && !Array.isArray(objOrArray)) {
    id = objOrArray.courseId;
  } else if (Array.isArray(objOrArray)) {
    for (let i = 0; i < objOrArray.length; ) {
      const item = objOrArray[i];

      if (item.seriesId) {
        id = item.seriesId;
      }

      i += 1;
    }
  }

  return id;
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

  lowerDivs.forEach((lowerDiv, classIndex) => {
    const className = getClassName(lowerDiv, classIndex);
    const id = getId(lowerDiv);
    const option = lowerDivOption(className, classIndex, id);

    select.appendChild(option);
  });

  stopLoading(formRow, loadingText);
}

export function organizeArticulations() {
  const articulationsDiv = document.querySelector(".articulations");
  const classLists = document.querySelectorAll(".class-list");

  const listArray = Array.from(classLists);

  if (classLists.length === 0) {
    noArticulations(articulationsDiv);
  } else {
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
}

function renderItems(items, classListDiv) {
  for (let i = 0; i < items.length; ) {
    const subitem = items[i];

    if (Array.isArray(subitem)) {
      renderItems(subitem, classListDiv);
    } else if (typeof subitem === "string") {
      if (subitem.toLowerCase() === "and") {
        connector(subitem, classListDiv);
      } else if (subitem.toLowerCase() === "or") {
        conjunction(subitem, classListDiv);
      }
    } else if (subitem.courseNumber && subitem.courseTitle && subitem.prefix) {
      const className = `${subitem.prefix} ${subitem.courseNumber} - ${subitem.courseTitle}`;

      const courseElement = course(className, classListDiv);

      if (subitem.cid) {
        const cidElement = cid(subitem.cid);

        courseElement.appendChild(cidElement);
      }
    }

    i += 1;
  }
}

export function createClassLists(articulation) {
  if (articulation && articulation.result) {
    const { result } = articulation;

    const courseCache = [];
    let collegeName = "";
    let agreementLink = "";

    for (let i = 0; i < result.length; ) {
      const item = result[i];

      if (item.ccName) {
        collegeName = item.ccName;
      } else if (item.agreementLink) {
        agreementLink = item.agreementLink;
      } else {
        courseCache.push(item);
      }

      if (collegeName && agreementLink) {
        const classListDiv = classListMainDiv();
        classListHeader(classListDiv, collegeName, agreementLink);

        renderItems(courseCache, classListDiv);
      }

      i += 1;
    }
  }
}
