/* eslint-disable import/no-cycle */

import { createListFromDb } from "./articulationFetcher";

export async function getCids(
  courseId,
  articulations,
  linksLength,
  updateProgress,
) {
  const endpoint = `${process.env.CID_APPENDER}/${courseId}`;

  const response = await fetch(endpoint, {
    body: JSON.stringify(articulations),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const modifiedArticulations = await response.json();
    const articulationsDiv = document.querySelector(".articulations");

    articulationsDiv.replaceChildren();
    createListFromDb(modifiedArticulations, linksLength, updateProgress);
  }
}

export function checkForCids(articulations) {
  if (articulations) {
    console.log("these look like articulations");
  }

  return true;
}

export function showCids() {
  console.log("hello i show cids");
}

export function hideCids() {
  console.log("hello i hide cids");
}
