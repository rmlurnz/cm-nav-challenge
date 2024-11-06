import { pubsub } from "./pubsub.js";

export const navbar = {
  container: null,
  activeMenuItem: null,
  cities: [],
  render: (container) => {
    navbar.container = container;
    // populate city menu items in nav
    navbar.cities.forEach((city) => {
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(city.label));
      li.setAttribute("class", "city");
      li.setAttribute("tz", city.timezone);
      container.appendChild(li);
    });
    // add click listener to activate city selection
    container.addEventListener("click", navbar.menuItemSelected);
  },
  menuItemSelected: (e) => {
    // handle resize
    window.onresize = () => {
      // These lines set the transition time to 0ms so that the resize happens immediately, but
      // I can't seem to find a way to reset it back to 400ms after the resizing is complete - TBD
      //
      // const root = document.querySelector(":root");
      // root.style.setProperty("--underline-transition-time", `"0ms"`);

      navbar.renderMenuSelection(); // render animated underline
    };
    // validate click source before continuing
    if (e.target.tagName == "LI") {
      // if there is an existing activeMenuItem, remove it's "active" status styling
      if (navbar.activeMenuItem)
        navbar.activeMenuItem.classList.remove("active-menu-item");
      // set activeMenuItem with newly clicked item
      navbar.activeMenuItem = e.target;
      navbar.renderMenuSelection(); // render animated underline
      pubsub.publish("menuItemClicked", navbar.activeMenuItem); // announce menu item was clicked to pubsub
    }
  },
  renderMenuSelection: () => {
    // apply relevant styles to calc underline position
    navbar.container.style.setProperty(
      "--decoration-left",
      navbar.activeMenuItem.offsetLeft + "px"
    ); // find underline start point (starting from left side)
    navbar.container.style.setProperty(
      "--decoration-width",
      navbar.activeMenuItem.offsetWidth + "px"
    ); // draw underline for entire width of active element
    navbar.activeMenuItem.classList.add("active-menu-item"); // apply "active" status styling
  },
};
