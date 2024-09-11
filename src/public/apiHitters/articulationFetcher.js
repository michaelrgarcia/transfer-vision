/* eslint-disable no-await-in-loop */

import {
  createClassLists,
  organizeArticulations,
} from "../domFunctions/assistDataRender";

import { getCommunityColleges } from "./schoolDataFetch";

import {
  showResults,
  hideLoadingContainer,
  hideResults,
  showSplash,
  hideBackButton,
} from "../domFunctions/cssTransitions";

import {
  changeSelectedClassTxt,
  updateProgressTracker,
  resetResults,
} from "../utils";

function abortRequest(abortController) {
  abortController.abort();

  hideResults();
  hideBackButton();
  showSplash();
  resetResults();
}

export async function getArticulationParams(receivingId, majorKey) {
  const articulationParams = [];
  const communityColleges = await getCommunityColleges();

  const year = 74;
  const receiving = receivingId;
  const key = majorKey;

  communityColleges.forEach((college) => {
    if (college.id) {
      const sending = college.id;
      const link = `${process.env.ASSIST_API_PARAMS}=${year}/${sending}/to/${receiving}/Major/${key}`;
      const agreementLink = `${process.env.ASSIST_AGREEMENT_PARAMS}=${year}&institution=${sending}&agreement=${receiving}&agreementType=to&view=agreement&viewBy=major&viewSendingAgreements=false&viewByKey=${year}/${sending}/to/${receiving}/Major/${key}`;

      articulationParams.push({ link, agreementLink });
    }
  });

  return articulationParams;
}

async function processStream(stream) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  let chunk = await reader.read();

  while (!chunk.done) {
    const data = decoder.decode(chunk.value, { stream: true });
    const articulation = JSON.parse(data);

    createClassLists(articulation);

    // updateProgressTracker(startingValue, totalColleges);

    chunk = await reader.read();
  }

  reader.releaseLock();

  return null;
}

async function requestArticulations(links, signal, receivingId, courseId) {
  try {
    const linksList = JSON.stringify(links);

    const endpoint = `${process.env.ARTICULATION_FETCHER}/${receivingId}/${courseId}/articulation-data`;

    const response = await fetch(endpoint, {
      body: linksList,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
    });

    await processStream(response.body);
  } catch (error) {
    console.error(`error processing stream: ${error}`);
  }

  return null;
}

export async function getArticulationData(links, receivingId, courseId) {
  const abortButton = document.querySelector(".back");

  const abortController = new AbortController();
  const { signal } = abortController;

  let aborted = false;

  window.addEventListener("beforeunload", () => abortController.abort());

  abortButton.addEventListener("click", () => {
    aborted = true;
    abortRequest(abortController);
  });

  showResults();

  // just to selected option's text
  // changeSelectedClassTxt(formattedClass);

  try {
    await requestArticulations(links, signal, receivingId, courseId);

    if (!aborted) {
      organizeArticulations();

      hideLoadingContainer();

      console.log("request finished");
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("requests aborted due to page unload");
    } else {
      console.error("error processing requests", error);
    }
  } finally {
    window.removeEventListener("beforeunload", () => abortController.abort());
  }

  return null;
}
