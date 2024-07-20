/* eslint-disable import/no-extraneous-dependencies */

import waitForElementTransition from "wait-for-element-transition";

const dialog = document.querySelector("dialog");
const form = document.querySelector("form");

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

export async function randomLoadingGif() {
  const img = document.querySelector("img.loading-gif");

  img.style.display = "block";
  const response = await fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=uldN0xaiyhNfeuN7QN98ROsslA7JpaDG&s=loading",
    { mode: "cors" },
  );
  const gifData = await response.json();

  try {
    if (gifData) {
      img.src = gifData.data.images.original.url;
    }
  } catch (error) {
    console.log(error);
  }
}

export function hideLoadingGif() {
  const img = document.querySelector("img.loading-gif");

  img.style.opacity = 0;
  waitForElementTransition(img).then(() => {
    img.style.display = "none";
    img.src = "#";
  });
}
