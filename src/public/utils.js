export function conjoin(array, conjunction) {
  const result = [];

  array.forEach((item, index) => {
    result.push(item);

    if (index < array.length - 1) {
      result.push(conjunction);
    }
  });

  return result;
}

export function seriesBreakdown(seriesObj) {
  const connector = seriesObj.conjunction;
  const series = [];

  if (seriesObj.courses) {
    const coursesInSeries = seriesObj.courses;

    coursesInSeries.forEach((course) => {
      const { prefix, courseNumber, courseTitle } = course;

      series.push({ prefix, courseNumber, courseTitle });
    });

    return conjoin(series, connector);
  }

  return null;
}

export function deNest(data) {
  const json = JSON.parse(data);

  if (json) {
    const processed = Object.values(json);

    return processed;
  }

  return null;
}
