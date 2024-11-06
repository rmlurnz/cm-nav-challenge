import { pubsub } from "./pubsub.js";

export const timeSection = {
  interval: null,
  container: null,
  render: (container) => {
    timeSection.container = container;
    // we want to listen for when menu items are clicked
    pubsub.subscribe("menuItemClicked", timeSection.updateDateTimeInfo);
  },
  updateDateTimeInfo: (item) => {
    // apply once before interval is set so that the UI updates immediately
    let output = timeSection.formatOutput(item);
    timeSection.container.innerText = output;

    // kill old interval when changing active menu items to avoid conflicts
    clearInterval(timeSection.interval);

    // set interval so that UI shows constantly updating "clock" with live time
    timeSection.interval = setInterval(() => {
      output = timeSection.formatOutput(item);
      timeSection.container.innerText = output;
    }, 1000);

    // unhide section with CSS
    document.querySelector(".time-section").style.display = "flex";
  },
  formatOutput: (item) => {
    // build pieces of formatted date / time
    let activeCityName = item.innerText;
    let tz = item.getAttribute("tz");

    let now = new Date();
    let activeCityTime = now.toLocaleTimeString("en-US", {
      timeZone: tz,
    });
    let activeCityDate = now.toLocaleDateString("en-US", {
      timeZone: tz,
    });

    // concatenate into formatted string
    let formatted = `The current time in ${activeCityName} is ${activeCityTime} on ${activeCityDate}.`;

    return formatted;
  },
};
