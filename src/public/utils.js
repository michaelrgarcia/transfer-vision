export function conjoin(array, conjunction) {
  const result = [];

  array.forEach((item, index) => {
    result.push(item);

    if (index < array.length - 1) {
      result.push(conjunction);
    }
  });

  return result;
}

export async function getRandomLoadingGif(imgElement) {
  const img = imgElement;

  const response = await fetch(
    "https://api.giphy.com/v1/gifs/translate?api_key=uldN0xaiyhNfeuN7QN98ROsslA7JpaDG&s=loading",
    { mode: "cors" },
  );
  const gifData = await response.json();

  try {
    if (gifData) {
      img.src = gifData.data.images.original.url;
    }
  } catch (error) {
    console.log(error);
  }
}

export function updateProgressTracker(collegesProcessed, totalColleges) {
  const progressTracker = document.querySelector(".progress-tracker");

  progressTracker.textContent = `${collegesProcessed} out of ${totalColleges} colleges searched`;
}

export function changeSelectedClassTxt(classString) {
  const selectedClass = document.querySelector(".selected-class");

  selectedClass.textContent = `Articulations for: ${classString}`;
}
