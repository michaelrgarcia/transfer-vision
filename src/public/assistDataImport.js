export default async function getFourYears(schoolList) {
  try {
    const endpoint = "https://classglance.onrender.com/schools/four-years";
    const response = await fetch(endpoint);
    const data = await response.json();

    const select = schoolList;

    return data;
  } catch (error) {
    console.error("Error fetching schools:", error);
  }
}
