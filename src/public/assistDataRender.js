import { defaultOption, selectOption } from "./elementPresets";

import {
  showDialog,
  closeDialog,
  startLoading,
  stopLoading,
} from "./cssTransitions";

import { getFourYears, getMajorData } from "./assistDataFetch";

export async function renderFourYears(schoolList) {
  const formRow = schoolList.parentElement;
  const loadingText = formRow.querySelector(".loading");

  showDialog();
  startLoading(schoolList.parentNode, loadingText);

  const fourYears = await getFourYears();

  const select = schoolList;
  const placeholder = defaultOption("school");

  select.appendChild(placeholder);

  fourYears.forEach((school) => {
    if (school.id < 200) {
      const option = selectOption(school.name, school.id);

      select.appendChild(option);
    }
  });

  closeDialog();
  stopLoading(schoolList.parentNode, loadingText);
}

export async function renderMajorData(majorList, receivingId) {
  const formRow = majorList.parentElement;
  const loadingText = formRow.querySelector(".loading");

  startLoading(majorList.parentNode, loadingText);

  const majorData = await getMajorData(receivingId);

  const select = majorList;
  const placeholder = defaultOption("major");

  select.replaceChildren();
  select.appendChild(placeholder);

  majorData.forEach((obj) => {
    const option = selectOption(obj.major, obj.key);

    select.appendChild(option);
  });

  stopLoading(majorList.parentNode, loadingText);
}
