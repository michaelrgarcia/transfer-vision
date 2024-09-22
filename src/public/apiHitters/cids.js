/* eslint-disable import/no-cycle */

import { createListFromDb } from "./articulationFetcher";

const cidsToggle = document.querySelector(".cids > input");

async function appendCids(courseId, articulations) {
  const endpoint = `${process.env.CID_APPENDER}/${courseId}`;

  const response = await fetch(endpoint, {
    body: JSON.stringify(articulations),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let newArticulations;

  if (response.status === 200) {
    newArticulations = await response.json();
  }

  return newArticulations;
}

function checkForCids(articulations) {
  for (let i = 0; i < articulations.length; ) {
    const item = articulations[i];

    if (item.result && checkForCids(item.result)) {
      return true;
    }

    if (Array.isArray(item) && checkForCids(item)) {
      return true;
    }

    if (
      item &&
      item.prefix &&
      item.courseNumber &&
      item.courseTitle &&
      item.cid
    ) {
      return true;
    }

    i += 1;
  }

  return false;
}

function showCids() {
  console.log("i got cids");
}

function hideCids() {
  console.log("hello i hide cids");
}

async function toggleCids(
  courseId,
  articulations,
  linksLength,
  updateProgress,
) {
  let savedArticulations = articulations;

  if (cidsToggle.checked) {
    const hasCids = checkForCids(savedArticulations);
    if (hasCids) {
      showCids();
    } else {
      const newArticulations = await appendCids(courseId, savedArticulations);

      const articulationsDiv = document.querySelector(".articulations");

      articulationsDiv.replaceChildren();
      createListFromDb(newArticulations, linksLength, updateProgress);

      savedArticulations = newArticulations;
    }
  } else {
    hideCids();
  }
}

export function addToggleListener(
  courseId,
  articulations,
  linksLength,
  updateProgress,
) {
  const handler = () =>
    toggleCids(courseId, articulations, linksLength, updateProgress);

  cidsToggle.addEventListener("change", handler);

  return handler;
}

export function removeToggleListener(handler) {
  cidsToggle.removeEventListener("change", handler);
}
