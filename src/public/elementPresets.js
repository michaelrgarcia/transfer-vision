export function selectOption(value, id) {
  const option = document.createElement("option");

  option.textContent = value;
  option.value = value;
  option.setAttribute("data-sending", id);

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
