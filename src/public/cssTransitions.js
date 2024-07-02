export function loadingState(loadingText, nodeList) {
  const loading = loadingText;
  nodeList.forEach((element) => {
    const node = element;

    node.style.opacity = 0.3;
    node.disabled = true;
    node.style.userSelect = "none";

    if (node.style.cursor === "pointer") {
      node.style.cursor = "not-allowed";
    }
  });

  loading.style.opacity = 1;
  loading.style.display = "block";
}

export function reverseLoadingState(loadingText, nodeList) {
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
  loading.style.opacity = 1;
  loading.style.display = "block";
}

export function hideLoadingText(loadingText) {
  const loading = loadingText;
  loading.style.opacity = 0;
  loading.style.display = "none";
}
