export function selectOption(value, id, keyword) {
  const option = document.createElement("option");

  option.textContent = value;
  option.value = value;

  if (id && keyword) {
    option.setAttribute(`data-${keyword}`, id);
  }

  return option;
}

export function lowerDivOption(text, value, id) {
  const option = document.createElement("option");

  option.textContent = text;
  option.value = value;

  option.setAttribute("data-id", id);

  return option;
}

export function defaultOption(keyword) {
  const option = document.createElement("option");

  option.textContent = `Select a ${keyword}`;
  option.value = "";
  option.disabled = true;
  option.selected = true;

  return option;
}

export function classListMainDiv() {
  const articulations = document.querySelector(".articulations");
  const classListDiv = document.createElement("div");

  classListDiv.classList.add("class-list");

  classListDiv.style.display = "flex";
  classListDiv.style.opacity = "1";

  articulations.append(classListDiv);

  return classListDiv;
}

export function classListHeader(parentDiv, collegeName, agreementLink) {
  const linkElement = document.createElement("a");

  linkElement.href = agreementLink;
  linkElement.target = "_blank";

  linkElement.textContent = collegeName;

  parentDiv.append(linkElement);
}

export function course(className, parent) {
  const textElement = document.createElement("p");

  textElement.textContent = className;
  parent.appendChild(textElement);

  return textElement;
}

export function connector(text, parent) {
  const textElement = document.createElement("p");
  textElement.classList.add("connector");

  textElement.textContent = text;
  parent.appendChild(textElement);
}

export function conjunction(text, parent) {
  const textElement = document.createElement("p");
  textElement.classList.add("conjunction");

  textElement.textContent = text;
  parent.appendChild(textElement);
}

export function noArticulations(parent) {
  const textElement = document.createElement("p");
  textElement.classList.add("no-articulations");

  textElement.textContent = "No articulations found.";
  parent.appendChild(textElement);

  textElement.style.opacity = 1;
}

export function processingPrompt() {
  const dialog = document.querySelector("dialog");
  const dialogText = dialog.querySelector("p");

  dialogText.textContent = "Data may be processing. Try again shortly.";
}

export function cid(cidText) {
  const spanElement = document.createElement("span");

  spanElement.classList.add("cid");
  spanElement.textContent = `(${cidText})`;

  return spanElement;
}
