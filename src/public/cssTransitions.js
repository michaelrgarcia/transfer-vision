const dialog = document.querySelector("dialog");

export function loadingState(nodeList) {
  dialog.showModal();
  dialog.style.opacity = 1;

  nodeList.forEach((element) => {
    const node = element;

    node.style.opacity = 0.15;
    node.disabled = true;
    node.style.userSelect = "none";

    if (node.style.cursor === "pointer") {
      node.style.cursor = "not-allowed";
    }
  });
}

export function reverseLoadingState(nodeList) {
  dialog.style.opacity = 0;
  dialog.close();

  nodeList.forEach((element) => {
    const node = element;

    node.style.opacity = 1;
    node.disabled = false;
    node.style.userSelect = "auto";

    if (node.style.cursor === "not-allowed") {
      node.style.cursor = "pointer";
    }
  });
}

export function showLoadingText(loadingText) {
  const loading = loadingText;
  loading.style.display = "block";
  loading.style.opacity = 1;
}

export function hideLoadingText(loadingText) {
  const loading = loadingText;

  loading.style.opacity = 0;
  loading.style.display = "none";
}

export function applyDisabledState(formRow) {
  const row = formRow;
  const imgBtn = row.querySelector("label > img");
  const select = row.querySelector("select");

  row.id = "disabled";

  if (imgBtn && select) {
    imgBtn.id = "disabled";
    select.classList.add("disabled-input");
  } else {
    const submit = row.querySelector(".submit");

    submit.id = "disabled";
  }
}

export function removeDisabledState(formRow) {
  const row = formRow;

  if (row.id === "disabled") {
    row.removeAttribute("id");
  }

  row.forEach((node) => {
    if (node.id === "disabled") {
      node.removeAttribute("id");
    } else if (node.classList.contains("disabled-input")) {
      node.classList.remove("disabled-input");
    }
  });
}
