"use strict";

/* Denna fil fetchar data från nominatim openstreetmap för att på så sätt visa en karta med value från input-fältet. */

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
    let longitude = data[0].lon;
    let latitude = data[0].lat;


    /* Visa karta med position */
    var map = L.map("map").setView([latitude, longitude], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    console.log(longitude, latitude);
  } catch (error) {
    console.error("Kunde inte fetcha, följande felmeddelande skapades:", error);
  }
}
