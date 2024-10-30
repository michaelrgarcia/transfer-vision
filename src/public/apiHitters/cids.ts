import {
  disableCidSection,
  enableCidSection,
} from "../domFunctions/cssTransitions";

import { createListFromDb } from "./articulationFetcher";

import { ApiArticulations } from "../../interfaces/assistData";

const cidsToggle = document.querySelector(".cids > input");

async function appendCids(courseId: string, articulations: ApiArticulations) {
  const endpoint = `${process.env.CID_APPENDER}/${courseId}`;

  disableCidSection();

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
    enableCidSection();
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
  const cidElements = document.querySelectorAll(".cid");

  cidElements.forEach((element) => {
    const cid = element;

    cid.style.display = "inline";
  });
}

function hideCids() {
  const cidElements = document.querySelectorAll(".cid");

  cidElements.forEach((element) => {
    const cid = element;

    cid.style.display = "none";
  });
}

async function toggleCids(courseId, state, linksLength, updateProgress) {
  const savedArticulations = state.articulations;

  if (cidsToggle.checked) {
    const hasCids = checkForCids(savedArticulations);
    if (hasCids) {
      showCids();
    } else {
      const newArticulations = await appendCids(courseId, savedArticulations);

      const articulationsDiv = document.querySelector(".articulations");

      articulationsDiv.replaceChildren();
      createListFromDb(newArticulations, linksLength, updateProgress);

      // eslint-disable-next-line no-param-reassign
      state.articulations = newArticulations;

      showCids();
    }
  } else {
    hideCids();
  }

  return savedArticulations;
}

export function addToggleListener(
  courseId,
  articulations,
  linksLength,
  updateProgress,
) {
  const state = { articulations };

  const handler = async () =>
    toggleCids(courseId, state, linksLength, updateProgress);

  cidsToggle.addEventListener("change", handler);

  return handler;
}

export function removeToggleListener(handler) {
  cidsToggle.removeEventListener("change", handler);
}
