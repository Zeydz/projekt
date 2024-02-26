"use strict";

/* Denna fil fetchar data från nominatim openstreetmap för att på så sätt visa en karta med value från input-fältet. */

import {latitude} from "./weather.js";

console.log(latitude);

window.onload = getLocation();

function getLocation() {
  /* Tar datan, i detta fall koordinater */
  function successCallback(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    showCurrentLocation(latitude, longitude);
  }

  /* Denna funktion anropas om det blir error. */
  function errorCallback(error) {
    console.error(error);
  }
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

/* Hämtar sökknappen samt skapar en eventlistenet för värdet på input. Skickar med value till nästa funktion */
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
  const searchInp = document.getElementById("searchInp").value;
  getData(searchInp);
});

/* Fetchar data med value från eventlistener. Skickar data till cordMap. */
async function getData(searchVal) {
  try {
    /* Fetchar data från openstreetmap, med value från input */
    const response = await fetch(
      "https://nominatim.openstreetmap.org/search?addressdetails=1&q=" +
        searchVal +
        "&format=jsonv2&limit=1"
    );
    let data = await response.json();

    /* Tar longitude och latitude */
    let lon = data[0].lon;
    let lat = data[0].lat;

    showCurrentLocation(lat, lon);
  } catch (error) {
    console.error("Kunde inte fetcha, följande felmeddelande skapades:", error);
  }
}

/* Visa karta vid inladdning */
var map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

/* Skapar markör */
let marker = L.marker([62.39264256963892, 17.284794169579705]).addTo(map);

/* Visa karta med position nuvarande position vid inladdning, eller position från input */
function showCurrentLocation(latitude, longitude) {
  map.setView([latitude, longitude], 12);
  marker.setLatLng([latitude, longitude]);
}
