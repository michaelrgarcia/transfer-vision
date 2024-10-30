import {
  Articulation,
  LowerDiv,
  SeriesIdObject,
  UnfilteredSeries,
  Series,
} from "./assistData";

export function isLowerDiv(item: any): item is LowerDiv {
  if (
    typeof item.prefix === "string" &&
    typeof item.courseNumber === "string" &&
    typeof item.courseTitle === "string" &&
    (typeof item.courseId === "undefined" ||
      typeof item.courseId === "number") &&
    (typeof item.cid === "undefined" || typeof item.cid === "string")
  ) {
    return true;
  } else {
    return false;
  }
}

export function isSeriesIdObject(item: any): item is SeriesIdObject {
  if (typeof item.seriesId === "string") {
    return true;
  } else {
    return false;
  }
}

function isUnfilteredSeriesItem(
  item: any,
): item is LowerDiv | string | SeriesIdObject {
  if (typeof item === "string" || isLowerDiv(item) || isSeriesIdObject(item)) {
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

function isSeriesItem(item: any): item is LowerDiv | string {
  if (isLowerDiv(item) || typeof item === "string") {
    return true;
  } else {
    return false;
  }
}

export function isSeries(array: any): array is Series {
  if (Array.isArray(array) && array.every(isSeriesItem)) {
    return true;
  } else {
    return false;
  }
}

export function isArticulation(item: any): item is Articulation {
  if (isLowerDiv(item) || isSeries(item)) {
    return true;
  } else {
    return false;
  }
}
