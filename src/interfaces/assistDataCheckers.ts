import { LowerDiv, SeriesIdObject, UnfilteredSeries } from "./assistData";

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

export function isSeriesIdObject(item: any): item is SeriesIdObject {
  if (typeof item.seriesId === "number") {
    return true;
  } else {
    return false;
  }
}

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
