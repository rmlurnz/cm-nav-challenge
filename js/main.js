import { navbar } from "./navbar.js";
import { timeSection } from "./time-section.js";

// path to data file provided by CM (manually updated to store timezones)
const CITY_DATA_PATH = "./data/navigation.json";

// container elements to pass to render functions
const navListElement = document.getElementById("city-list");
const dateTimeInfoElement = document.getElementById("date-time-info");

// make "API call" to local file used as DB
fetch(CITY_DATA_PATH)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("There was an issue retrieving city data");
  })
  .then((data) => {
    // store data in navbar cities property
    navbar.cities = data.cities;
    // render functions
    navbar.render(navListElement);
    timeSection.render(dateTimeInfoElement);
  })
  .catch((error) => {
    console.log(error);
  });
