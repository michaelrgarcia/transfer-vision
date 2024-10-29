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

import { filterSeries } from "../utils";

import {
  FullArticulation,
  LowerDiv,
  UnfilteredSeries,
  Articulation,
} from "../../interfaces/assistData";

import {
  isArticulation,
  isSeries,
  isLowerDiv,
  isSeriesIdObject,
  isUnfilteredSeries,
} from "../../interfaces/assistDataCheckers";

export async function renderFourYears(
  schoolList: HTMLSelectElement,
): Promise<void> {
  const formRow = schoolList.parentNode as HTMLDivElement;
  const loadingText = formRow.querySelector(".loading") as HTMLParagraphElement;

  showDialog();
  startLoading(formRow, loadingText);

  const fourYears = await getFourYears();
  const placeholder = defaultOption("school");

  schoolList.appendChild(placeholder);

  fourYears.forEach((school) => {
    if (school.id < 200) {
      const option = selectOption(school.name, school.id, "sending");

      schoolList.appendChild(option);
    }
  });

  closeDialog();
  stopLoading(formRow, loadingText);
}

export async function renderMajorData(
  majorList: HTMLSelectElement,
  receivingId: number,
  year: number,
): Promise<void> {
  const formRow = majorList.parentElement as HTMLDivElement;
  const loadingText = formRow.querySelector(".loading") as HTMLParagraphElement;

  startLoading(formRow, loadingText);

  const majorData = await getMajorData(receivingId, year);
  const placeholder = defaultOption("major");

  majorList.replaceChildren();
  majorList.appendChild(placeholder);

  majorData.forEach((majorObj) => {
    const option = selectOption(majorObj.major, majorObj.key, "key");

    majorList.appendChild(option);
  });

  stopLoading(formRow, loadingText);
}

function getSeriesString(seriesArray: UnfilteredSeries) {
  const seriesArrayCopy = seriesArray.slice();
  const filtered = filterSeries(seriesArrayCopy); // filters out SeriesIdObject

  let seriesString = "";

  filtered.forEach((item, index) => {
    let courseConnector: string;

    if (isLowerDiv(item)) {
      const { prefix, courseNumber } = item;

      const className = `${prefix} ${courseNumber}`;

      seriesString += className;
    } else if (typeof item === "string") {
      courseConnector = item.toLowerCase();

      seriesString += courseConnector;
    }

    if (index < filtered.length - 1) {
      seriesString += " ";
    }
  });

  return seriesString;
}

export function getClassName(objOrArray: LowerDiv | UnfilteredSeries) {
  let formattedClass = "";

  if (isLowerDiv(objOrArray)) {
    formattedClass = `${objOrArray.prefix} ${objOrArray.courseNumber} - ${objOrArray.courseTitle}`;
  } else if (Array.isArray(objOrArray)) {
    formattedClass = getSeriesString(objOrArray);
  }

  return formattedClass;
}

export function getId(objOrArray: LowerDiv | UnfilteredSeries) {
  let id: number | string;

  if (isLowerDiv(objOrArray)) {
    id = objOrArray.courseId;
  } else if (isUnfilteredSeries(objOrArray)) {
    for (let i = 0; i < objOrArray.length; i += 1) {
      const item = objOrArray[i];

      if (isSeriesIdObject(item)) {
        id = item.seriesId;
      }
    }
  }

  return id;
}

export async function renderLowerDivs(
  classList: HTMLSelectElement,
  receivingId: number,
  key: string,
  year: number,
): Promise<void> {
  const formRow = classList.parentNode;
  const loadingText = formRow.querySelector(".loading");

  startLoading(formRow, loadingText);

  const lowerDivs = await getLowerDivs(receivingId, key, year);

  const placeholder = defaultOption("class");

  classList.replaceChildren();
  classList.appendChild(placeholder);

  lowerDivs.forEach((lowerDiv, classIndex) => {
    const className = getClassName(lowerDiv);
    const id = getId(lowerDiv);
    const option = lowerDivOption(className, classIndex, id);

    classList.appendChild(option);
  });

  stopLoading(formRow, loadingText);
}

export function organizeArticulations(): void {
  const articulationsDiv = document.querySelector(
    ".articulations",
  ) as HTMLDivElement;
  const classLists = document.querySelectorAll<HTMLDivElement>(".class-list");

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

function sortClassData(classData: (Articulation | string)[]) {
  classData.sort((a, b) => {
    if (typeof a === "string") {
      return 0;
    }

    if (typeof b === "string") {
      return 0;
    }

    if ("prefix" in a && "prefix" in b) {
      const prefixComparison = a.prefix.localeCompare(b.prefix);

      if (prefixComparison !== 0) return prefixComparison;
    }

    if ("courseNumber" in a && "courseNumber" in b) {
      const courseNumberComparison = a.courseNumber.localeCompare(
        b.courseNumber,
      );

      if (courseNumberComparison !== 0) return courseNumberComparison;
    }

    return 0;
  });

  return classData;
}

function renderItems(
  items: (Articulation | string)[],
  classListDiv: HTMLDivElement,
): void {
  const sortedItems = sortClassData(items);

  for (let i = 0; i < sortedItems.length; ) {
    const subitem = sortedItems[i];

    if (isSeries(subitem)) {
      renderItems(subitem, classListDiv);
    } else if (typeof subitem === "string") {
      if (subitem.toLowerCase() === "and") {
        connector(subitem, classListDiv);
      } else if (subitem.toLowerCase() === "or") {
        conjunction(subitem, classListDiv);
      }
    } else if (isLowerDiv(subitem)) {
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

export function createClassLists(articulation: {
  result: FullArticulation;
}): void {
  if (articulation && articulation.result) {
    const { result } = articulation;

    const courseCache: (Articulation | string)[] = [];
    let collegeName = "";
    let agreementLink = "";

    for (let i = 0; i < result.length; ) {
      const item = result[i];

      if (item) {
        if (typeof item == "object" && "ccName" in item) {
          collegeName = item.ccName;
        } else if (typeof item == "object" && "agreementLink" in item) {
          agreementLink = item.agreementLink;
        } else if (typeof item === "string" || isArticulation(item)) {
          courseCache.push(item);
        }

        if (collegeName && agreementLink) {
          const classListDiv = classListMainDiv();
          classListHeader(classListDiv, collegeName, agreementLink);

          renderItems(courseCache, classListDiv);
        }
      }

      i += 1;
    }
  }
}
