export function selectOption(value, id, keyword) {
  const option = document.createElement("option");

  option.textContent = value;
  option.value = value;
  option.setAttribute(`data-${keyword}`, id);

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
