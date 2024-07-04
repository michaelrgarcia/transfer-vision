import { defaultOption, selectOption } from "./elementPresets";

import {
  loadingState,
  reverseLoadingState,
  showLoadingText,
  hideLoadingText,
  showDialog,
  closeDialog,
} from "./cssTransitions";

import { getFourYears, getMajorData } from "./assistDataFetch";

export async function renderFourYears(schoolList) {
  const formRow = schoolList.parentElement;
  const loadingText = formRow.querySelector(".loading");
  const everythingElse = formRow.querySelectorAll(":not(.loading)");

  showDialog();
  loadingState(everythingElse);
  showLoadingText(loadingText);

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
  hideLoadingText(loadingText);
  reverseLoadingState(everythingElse);
}

export async function renderMajorData(majorList, receivingId) {
  const formRow = majorList.parentElement;
  const loadingText = formRow.querySelector(".loading");
  const everythingElse = formRow.querySelectorAll(":not(.loading)");

  loadingState(everythingElse);
  showLoadingText(loadingText);

  const majorData = await getMajorData(receivingId);

  const select = majorList;
  const placeholder = defaultOption("major");

  select.appendChild(placeholder);

  majorData.forEach((obj) => {
    const option = selectOption(obj.major, obj.key);

    select.appendChild(option);
  });

  hideLoadingText(loadingText);
  reverseLoadingState(everythingElse);
}
