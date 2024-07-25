/* eslint-disable import/no-extraneous-dependencies */

import waitForElementTransition from "wait-for-element-transition";
import { getRandomLoadingGif } from "./utils";

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const img = document.querySelector("img.loading-gif");
const results = document.querySelector(".results");

export function showDialog() {
  dialog.showModal();
  dialog.style.opacity = 1;
}

export function closeDialog() {
  dialog.style.opacity = 0;
  dialog.close();
}

export function showLoadingText(loadingText) {
  const loading = loadingText;
  loading.style.opacity = 1;
  loading.style.display = "block";
}

export function hideLoadingText(loadingText) {
  const loading = loadingText;

  loading.style.opacity = 0;
  loading.style.display = "none";
}

export function applyDisabledState(formRow) {
  const row = formRow;

  const select = row.querySelector("select");
  const children = row.querySelectorAll(":not(.loading)");

  if (select) {
    select.disabled = true;
  }

  children.forEach((node) => {
    const element = node;

    element.setAttribute("aria-disabled", "true");
  });
}

export function removeDisabledState(formRow) {
  const row = formRow;

  const select = row.querySelector("select");
  const children = row.querySelectorAll(":not(.loading)");

  if (select) {
    select.disabled = false;
  }

  children.forEach((node) => {
    const element = node;
    element.setAttribute("aria-disabled", "false");
  });
}

export function startLoading(formRow, loadingText) {
  applyDisabledState(formRow);
  showLoadingText(loadingText);
}

export function stopLoading(formRow, loadingText) {
  removeDisabledState(formRow);
  hideLoadingText(loadingText);
}

export function hideSplash() {
  form.style.opacity = 0;
  waitForElementTransition(form).then(() => {
    form.style.display = "none";
  });
}

export async function showRandomLoadingGif() {
  waitForElementTransition(form).then(async () => {
    await getRandomLoadingGif(img);

    img.style.display = "block";
    img.style.opacity = 1;
  });
}

export function showResults() {
  waitForElementTransition(form).then(() => {
    results.style.opacity = 1;
  });

  results.style.display = "flex";
}

export function hideResultsInfo() {
  const resultsInfo = document.querySelector(".results-info");

  // below code block, can turn into hideElement(element) function?
  resultsInfo.style.opacity = 0;

  waitForElementTransition(resultsInfo).then(() => {
    resultsInfo.style.display = "none";
  });
}
