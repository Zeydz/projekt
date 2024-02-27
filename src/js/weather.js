"use strict";

/* Ladda getLocation direkt vid besök på webbplatsen */
window.onload = getLocation();

/* Fråga om plats genom getLocation, behövs för att skicka lat & long till getWeather */
function getLocation() {
  /* Tar datan, i detta fall koordinater */
  function successCallback(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
    showCurrentLocation(latitude, longitude);
  }

  /* Denna funktion anropas om det blir error. */
  function errorCallback(error) {
    console.error(error);
  }
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

/* Fetcha väder */
async function getWeather(lat, long) {
  try {
    let response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${long}&apikey=T8QHUJD8PXwsm1dSaig8GEE0Q6M8et2u`
    );
    let data = await response.json();

    /* Kallar på funktion för att visa temperatur i navigationsmeny */
    displayWeather(data);

    /* Returnerar data till getData*/
    return data;

    /* Catch error */
  } catch (error) {
    console.log("Gick inte att fetcha:" + error);
    throw error;
  }
}

/* Gör så att temperatur visas i navigationsmenyn. */
function displayWeather(data) {
  let daily = data.timelines.daily;
  let sideBarWeatherEl = document.getElementById("celsside");

  sideBarWeatherEl.innerHTML = `
   <span class="textcelsius nav-text celsius">${Math.round(
     daily[0].values.temperatureAvg
   )}&#8451</span><br>`;

  /*     daily.forEach(day => {
        console.log(day.values.temperatureAvg);

        weatherEl.innerHTML += `
        <article>
        <p>Medeltemperatur: ${day.values.temperatureAvg}&#8451</p>
        
        </article>
        `;
    });*/

  console.log(data.timelines.daily);
}

/* Karta */

/* Hämtar sökknappen samt skapar en eventlistenet för värdet på input. Skickar med value till nästa funktion */
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", function () {
  const searchInp = document.getElementById("searchInp").value;
  getData(searchInp);
});

/* Fetchar data med value från eventlistener. Skickar data till showCurrentLocation. Gör även så att popupcontent skapas på vald stad.*/
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
    let name = data[0].name;

    /* Variabel för att kalla på funktion */
    let weatherData = await getWeather(lat, lon, name);

    /* Kallar på funktion när variabel används */
    let popupContent = `<b>${name}</b><br>Temperatur: ${Math.round(
      weatherData.timelines.daily[0].values.temperatureAvg
    )}&#8451`;

    /* Skapar popup med vald data. */
    marker.bindPopup(popupContent).openPopup();

    /* Kallar på showCurrentLocation */
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

/* map control, hitta din plats */
L.control.locate().addTo(map);

/* Visa karta med position nuvarande position vid inladdning, eller position från input */
function showCurrentLocation(latitude, longitude) {
  map.setView([latitude, longitude], 12);
  marker.setLatLng([latitude, longitude]);
}
