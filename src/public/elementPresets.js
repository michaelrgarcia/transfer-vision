export function selectOption(value, id, keyword) {
  const option = document.createElement("option");

  option.textContent = value;
  option.value = value;

  if (id && keyword) {
    option.setAttribute(`data-${keyword}`, id);
  }

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

  articulations.append(classListDiv);

  return classListDiv;
}

export function classListHeader(parentDiv, collegeName) {
  const header = document.createElement("button");

  header.type = "button";
  header.textContent = collegeName;

  parentDiv.append(header);
}
