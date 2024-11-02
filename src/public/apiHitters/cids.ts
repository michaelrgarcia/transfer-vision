import {
  disableCidSection,
  enableCidSection,
} from "../domFunctions/cssTransitions";

import { createListFromDb } from "./articulationFetcher";

import {
  ApiArticulations,
  FullArticulation,
  Series,
} from "../../interfaces/assistData";

import { isLowerDiv, isSeries } from "../../interfaces/assistDataCheckers";

const cidsToggle = document.querySelector(".cids > input") as HTMLInputElement;

async function appendCids(
  courseId: string,
  articulations: ApiArticulations,
): Promise<ApiArticulations> {
  const endpoint = `${process.env.CID_APPENDER}/${courseId}`;

  disableCidSection();

  const response = await fetch(endpoint, {
    body: JSON.stringify(articulations),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  let newArticulations: ApiArticulations;

  if (response.status === 200) {
    newArticulations = await response.json();
    enableCidSection();
  }

  return newArticulations;
}

function checkForCids(
  articulations: ApiArticulations | FullArticulation | Series,
): boolean {
  for (let i = 0; i < articulations.length; i += 1) {
    const item = articulations[i];

    if (
      item &&
      typeof item === "object" &&
      "result" in item &&
      Array.isArray(item.result)
    ) {
      if (checkForCids(item.result)) {
        return true;
      }
    }

    if (item && isSeries(item) && checkForCids(item)) {
      return true;
    }

    if (item && isLowerDiv(item) && item.cid) {
      return true;
    }
  }

  return false;
}

function showCids(): void {
  const cidElements = document.querySelectorAll<HTMLSpanElement>(".cid");

  cidElements.forEach((element) => {
    element.style.display = "inline";
  });
}

function hideCids(): void {
  const cidElements = document.querySelectorAll<HTMLSpanElement>(".cid");

  cidElements.forEach((element) => {
    element.style.display = "none";
  });
}

async function toggleCids(
  courseId: string,
  state: { articulations: ApiArticulations },
  linksLength: number,
  updateProgress: (processed: number) => void,
): Promise<ApiArticulations> {
  const savedArticulations = state.articulations;

  if (cidsToggle.checked) {
    const hasCids = checkForCids(savedArticulations);

    if (hasCids) {
      showCids();
    } else {
      const newArticulations = await appendCids(courseId, savedArticulations);

      const articulationsDiv = document.querySelector(
        ".articulations",
      ) as HTMLDivElement;

      articulationsDiv.replaceChildren();
      createListFromDb(newArticulations, linksLength, updateProgress);

      state.articulations = newArticulations;

      showCids();
    }
  } else {
    hideCids();
  }

  return savedArticulations;
}

export function addToggleListener(
  courseId: string,
  articulations: ApiArticulations,
  linksLength: number,
  updateProgress: (processed: number) => void,
): () => Promise<ApiArticulations> {
  const state = { articulations };

  const handler = async () =>
    toggleCids(courseId, state, linksLength, updateProgress);

  cidsToggle.addEventListener("change", handler);

  return handler;
}

export function removeToggleListener(handler: () => void): void {
  cidsToggle.removeEventListener("change", handler);
}
