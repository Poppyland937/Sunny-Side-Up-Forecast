function submitSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityPlace = document.querySelector("#weather-city");
  let city = (cityPlace.innerHTML = searchInput.value);
  fetchWeather(city);
}
function fetchWeather(city) {
  let apiKey = "c48264o7b5ff7a9343004et42e6b4c41";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(url).then(displayTemperature);
  console.log(url);
}
function displayTemperature(response) {
  let temperatureNumber = document.querySelector("#weather-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

  let icon = document.querySelector("#weather-icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}"> `;

  temperatureNumber.innerHTML = temperature;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}Km/h`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

function initialize() {
  let defaultCity = "Paris";
  fetchWeather(defaultCity);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "c48264o7b5ff7a9343004et42e6b4c41";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5)
      forecastHtml =
        forecastHtml +
        `   
    <div class="weather-forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <div><img src="${day.condition.icon_url}" class="forecast-icon"></div>
        <div class="forecast-temperature">
          <div class="forecast-temperature-max">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="forecast-temperature-min">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>
      
             
            `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

window.onload = initialize;
