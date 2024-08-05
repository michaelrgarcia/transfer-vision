import waitForElementTransition from "wait-for-element-transition";

import { getRandomLoadingGif } from "../utils";

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const img = document.querySelector("img.loading-gif");
const results = document.querySelector(".results");
const loadingContainer = document.querySelector(".loading-container");

function showLoadingContainer() {
  loadingContainer.style.opacity = 1;
  loadingContainer.style.display = "flex";
}

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
    showLoadingContainer();
  });

  results.style.display = "flex";
}

export function hideLoadingContainer() {
  // below code block, can turn into hideElement(element) function?
  loadingContainer.style.opacity = 0;

  waitForElementTransition(loadingContainer).then(() => {
    loadingContainer.style.display = "none";
  });
}

export function hideResults() {
  results.style.opacity = "0";

  waitForElementTransition(results).then(() => {
    results.style.display = "none";
  });
}

export function showSplash() {
  waitForElementTransition(results).then(() => {
    form.style.opacity = 1;
    form.style.display = "flex";
  });
}
