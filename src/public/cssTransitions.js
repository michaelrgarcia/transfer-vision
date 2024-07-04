const dialog = document.querySelector("dialog");

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
  loading.style.display = "block";
  loading.style.opacity = 1;
}

export function hideLoadingText(loadingText) {
  const loading = loadingText;

  loading.style.opacity = 0;
  loading.style.display = "none";
}

export function loadingState(nodeList) {
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

export function applyDisabledState(formRow) {
  const row = formRow;

  const imgBtn = row.querySelector("label > img");
  const select = row.querySelector("select");
  const submit = row.querySelector(".submit");

  row.setAttribute("id", "disabled");

  if (imgBtn && select) {
    imgBtn.setAttribute("id", "disabled");

    select.classList.add("disabled-input");
    select.disabled = true;
  } else if (submit) {
    submit.setAttribute("id", "disabled");
    submit.disabled = true;
  }
}

export function removeDisabledState(formRow) {
  const row = formRow;

  const imgBtn = row.querySelector("label > img");
  const select = row.querySelector("select");

  row.removeAttribute("id");

  if (imgBtn && select) {
    imgBtn.removeAttribute("id");

    select.classList.remove("disabled-input");
    select.disabled = false;
  } else {
    const submit = row.querySelector(".submit");

    submit.removeAttribute("id");
    submit.disabled = false;
  }
}
