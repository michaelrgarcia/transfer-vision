export interface LowerDiv {
  prefix: string;
  courseNumber: number;
  courseTitle: string;
  courseId?: number; // series courses do not have a course ID
}

export function isLowerDiv(item: any): item is LowerDiv {
  if (
    typeof item.prefix === "string" &&
    typeof item.courseNumber === "number" &&
    typeof item.courseTitle === "string" &&
    (typeof item.courseId === "undefined" || typeof item.courseId === "number")
  ) {
    return true;
  } else {
    return false;
  }
}

interface SeriesIdObject {
  seriesId: number;
}

export function isSeriesIdObject(item: any): item is SeriesIdObject {
  if (typeof item.seriesId === "number") {
    return true;
  } else {
    return false;
  }
}

export type UnfilteredSeries = (LowerDiv | string | SeriesIdObject)[];
export type FilteredSeries = (LowerDiv | string)[];

function isUnfilteredSeriesItem(
  item: any,
): item is LowerDiv | string | SeriesIdObject {
  if (item === "string" || isLowerDiv(item) || isSeriesIdObject(item)) {
    return true;
  } else {
    return false;
  }
}

export function isUnfilteredSeries(array: any): array is UnfilteredSeries {
  if (Array.isArray(array) && array.every(isUnfilteredSeriesItem)) {
    return true;
  } else {
    return false;
  }
}

interface ccNameObject {
  ccName: "string";
}

interface agreementLinkObject {
  agreementLink: "string";
}

type Course = (LowerDiv | ccNameObject | agreementLinkObject)[];
export type CourseChain = (LowerDiv | string)[];

export type Articulations = (Course | CourseChain)[];
