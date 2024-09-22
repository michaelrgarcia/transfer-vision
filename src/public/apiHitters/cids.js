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

  let newArticulations;

  if (response.status === 200) {
    newArticulations = await response.json();
    const articulationsDiv = document.querySelector(".articulations");

    articulationsDiv.replaceChildren();
    createListFromDb(newArticulations, linksLength, updateProgress);
  }

  return newArticulations;
}

export function checkForCids(articulations) {
  for (let i = 0; i < articulations.length; ) {
    const item = articulations[i];

    if (item.result) {
      checkForCids(item.result);
    }

    if (Array.isArray(item)) {
      checkForCids(item);
    }

    if (item && item.prefix && item.courseNumber && item.courseTitle) {
      if (item.cid) {
        return true;
      }
    }

    i += 1;
  }

  return false;
}

export function showCids() {
  console.log("hello i show cids");
}

export function hideCids() {
  console.log("hello i hide cids");
}

export function cidToggleEventListener(
  courseId,
  articulations,
  linksLength,
  updateProgress,
) {
  const cidsToggle = document.querySelector(".cids > input");
  const savedArticulations = articulations;

  cidsToggle.addEventListener("change", async () => {
    if (cidsToggle.checked) {
      if (checkForCids(savedArticulations)) {
        console.log("logic works");
        console.log(savedArticulations);
        // showCids();
      } else {
        /*
        const newArticulations = await getCids(
          courseId,
          savedArticulations,
          linksLength,
          updateProgress,
        );

        if (newArticulations) {
          savedArticulations = newArticulations;
        }
        */
      }
    } else {
      hideCids();
    }
  });
}
