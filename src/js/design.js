"use strict";

/* Javascript för att toggla darkmode och navigationsmenyn */
const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
const modeSwitch = body.querySelector(".toggle-switch");
const modeText = body.querySelector(".mode-text");

/* Ladda checkMode när man besöker webbplatsen */
window.onload = checkMode();

/* Sätta på darkmode och spara i localhost */
function enableDarkMode() {
  body.classList.add("dark");
  modeText.innerText = "Light Mode";
  localStorage.setItem("darkMode", "true");
}

/* Stänga av darkMode och spara i localhost */
function disableDarkMode() {
  body.classList.remove("dark");
  modeText.innerText = "Dark Mode";
  localStorage.setItem("darkMode", "false");
}

/* Navigationsmeny toggle */
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

/* Togglar dark/light mode om man klickar på knapp. */
modeSwitch.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});

/* Tittar ifall darkMode är sparat som true eller ej i localstorage */
function checkMode() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}