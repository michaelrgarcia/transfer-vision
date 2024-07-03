import { defaultOption, selectOption } from "./elementPresets";

import {
  loadingState,
  reverseLoadingState,
  showLoadingText,
  hideLoadingText,
} from "./cssTransitions";

export default async function getFourYears(schoolList) {
  const formRow = schoolList.parentElement;
  const loadingText = formRow.querySelector(".loading");
  const everythingElse = formRow.querySelectorAll(":not(.loading)");

  try {
    const endpoint = "https://classglance.onrender.com/schools/four-years";
    loadingState(everythingElse);
    showLoadingText(loadingText);
    const response = await fetch(endpoint);
    const data = await response.json();
    hideLoadingText(loadingText);
    reverseLoadingState(everythingElse);
    const dataArray = Object.values(data);

    const select = schoolList;
    const placeholder = defaultOption("school");

    select.appendChild(placeholder);

    dataArray.forEach((school) => {
      if (school.id < 200) {
        const option = selectOption(school.name, school.id);

        select.appendChild(option);
      }
    });
  } catch (error) {
    console.error("Error fetching schools:", error);
  }
}
