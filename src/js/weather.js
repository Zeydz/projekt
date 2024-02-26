"use strict";

/* Ladda getLocation direkt vid besök på webbplatsen */
window.onload = getLocation;

let latitude, longitude;
/* Fråga om plats genom getLocation, behövs för att skicka lat & long till getWeather */
function getLocation() {
  /* Tar datan, i detta fall koordinater */
  function successCallback(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    getWeather(latitude, longitude);
  }

  /* Denna funktion anropas om det blir error. */
  function errorCallback(error) {
    console.error(error);
  }
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

export {latitude, longitude};

/* Fetcha väder */
async function getWeather(lat, long) {
  try {
    let response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${long}&apikey=T8QHUJD8PXwsm1dSaig8GEE0Q6M8et2`
    );
    let data = await response.json();

    displayWeather(data);
    
  } catch (error) {
    console.log("Gick inte att fetcha:" + error);
  }
}


function displayWeather(data) {

    let daily = data.timelines.daily;
    let weatherEl = document.getElementById("weather");
    let sideBarWeatherEl = document.getElementById("celsside");


   sideBarWeatherEl.innerHTML += `
   <span class="textcelsius nav-text celsius">${Math.round(daily[0].values.temperatureAvg)}&#8451</span><br>`

/*     daily.forEach(day => {
        console.log(day.values.temperatureAvg);

        weatherEl.innerHTML += `
        <article>
        <p>Medeltemperatur: ${day.values.temperatureAvg}&#8451</p>
        
        </article>
        `;
    }); */
    console.log(data.timelines.daily);
}

