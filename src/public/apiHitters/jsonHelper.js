import { conjoin, alphaSort } from "../utils";

function getCourse(courseObj) {
  const { prefix, courseNumber, courseTitle } = courseObj;

  return { prefix, courseNumber, courseTitle };
}

function deNest(data) {
  const json = JSON.parse(data);

  if (json) {
    const processed = Object.values(json);

    return processed;
  }

  return null;
}

function seriesBreakdown(seriesObj) {
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

export function getCollegeName(articulationData) {
  if (articulationData && articulationData.sendingInstitution) {
    const sendingData = deNest(articulationData.sendingInstitution);
    let collegeName;

    sendingData.forEach((item) => {
      if (Array.isArray(item)) {
        if (item[item.length - 1].name) {
          const { name } = item[item.length - 1];

          collegeName = name;
        }
      }
    });

    return collegeName;
  }

  return null;
}

export function createGroup(conjunction, groupCourses) {
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

export function extractGroupConnector(sendingArticulation) {
  if (sendingArticulation.courseGroupConjunctions) {
    const arr = sendingArticulation.courseGroupConjunctions;
    const lastItem = arr[arr.length - 1];

    if (lastItem) {
      if (lastItem.groupConjunction) {
        return lastItem.groupConjunction;
      }
    }
  }

  return null;
}

export function getSendingCourses(articulationObj, ccName) {
  const { sendingArticulation } = articulationObj;

  if (sendingArticulation.items) {
    const { items } = sendingArticulation;

    if (!sendingArticulation.noArticulationReason) {
      let courseList = [];

      items.forEach((courseObj) => {
        const courses = courseObj.items;

        if (courses.length > 1) {
          const connector = courseObj.courseConjunction;
          const courseGroup = createGroup(connector, courses);

          courseList.push(courseGroup);
        } else {
          const course = getCourse(courses[0]);

          courseList.push(course);
        }
      });

      if (items.length > 1) {
        const groupConnector = extractGroupConnector(sendingArticulation);

        courseList = conjoin(courseList, groupConnector);
      }

      courseList.push(ccName);

      return courseList;
    }
  }

  return null;
}

export function getMatches(responseArray, lowerDiv) {
  const matches = [];

  responseArray.forEach((response) => {
    const { agreementLink } = response;

    const articulationData = Object.values(response)[0];
    const ccName = getCollegeName(articulationData);

    if (articulationData && articulationData.articulations && agreementLink) {
      const availableArticulations = deNest(articulationData.articulations);

      availableArticulations.forEach((dataset) => {
        const articulationObj = dataset.articulation;
        let receivingCourse;

        if (articulationObj.course) {
          const courseObj = articulationObj.course;

          receivingCourse = getCourse(courseObj);
        } else if (articulationObj.series) {
          const seriesObj = articulationObj.series;

          receivingCourse = seriesBreakdown(seriesObj);
        }

        if (JSON.stringify(lowerDiv) === JSON.stringify(receivingCourse)) {
          const articulations = getSendingCourses(articulationObj, ccName);

          if (articulations && Array.isArray(articulations)) {
            articulations.push(agreementLink);
            matches.push(articulations);
          }
        }
      });
    }
  });

  return matches;
}
