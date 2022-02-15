// global vars
var btnGo = document.getElementById("go");

// var cityInput = document.getElementById("city-input");
// var histCont = document.getElementById("hist-cont");
// var dateEl = document.getElementById("date-el");
// var cityName = document.getElementById("city-name");
// var weatherIcon = document.getElementById("weather-icon");
// var countryName = document.getElementById("country-name");
// var weatherDetails = document.getElementById("weather-details");
// var btnClearHistory = document.getElementById("clear-btn"); 
// var forecastEl = document.getElementById('forecast')
// var forecastTile = document.getElementById('forecast-title')
// var forecastHR = document.getElementById('hr-fore')

// // variables
// var apiKey = "30c3e6ac5e44b312b04c4ccf20184f89";
// var today = moment().format("MMM Do, YYYY");

// // show the error that that place does not exist when searching for place that does not exist in api
// function showError() {
//     var alertEl = document.createElement("div");
//     alertEl.setAttribute("class", "");
//     alertEl.setAttribute("role", "alert");
//     alertEl.textContent = "That's not a real place...";
//     histCont.appendChild(alertEl);
//     setTimeout(function () {
//         histCont.removeChild(alertEl);
//     }, 2000);
// }

// // check that the variable being saved to local is not already in local
// function isDoubles(city) {
//   for (let i = 0; i < hist.length; i++) {
//     if (city === hist[i]) {
//       return true;
//     }
//   }
// }

// // set city to local storage
// function setHist(city) {
//   if (!isDoubles(city)) {
//     hist.push(city);
//     localStorage.setItem("hist", JSON.stringify(hist));
//   }
// }

// // get history from local storage or create new if none exists
// // function getHist() {
// //   var storedHist = JSON.parse(localStorage.getItem("hist"));
// //   if (storedHist === null) {
// //     var hist = [];
// //     btnClearHistory.classList.add('invisible')
// //     return hist;
// //   } else {
// //     var hist = storedHist;
// //     btnClearHistory.classList.remove('invisible')
// //     return hist;
// //   }
// // }

// // render the history
// function renderHist(hist) {
//   histCont.textContent = "";
//   for (let i = 0; i < hist.length; i++) {
//     var histEl = document.createElement("button");
//     histEl.setAttribute("class", "btn btn-secondary m-1");
//     histEl.setAttribute("data-city", hist[i]);
//     histEl.textContent = hist[i];
//     histCont.appendChild(histEl);
//     histEl.addEventListener("click", function (event) {
//       getCoords(event.target.getAttribute("data-city"));
//     });
//   }
// }

// // function that gets everything in order
// // function init() {
// //   var hist = getHist();
// //   renderHist(hist);
// //   return hist;
// // }

// // // run the start up function
// // var hist = init();

// // render the name of the city
// function renderCity(city, country) {
//     cityName.textContent = city + ", ";
//     countryName.textContent = country;
// }

// // render the weather for that city
// function renderWeather(data) {
//   dateEl.textContent = moment().format("MMM Do, YYYY");
//   weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");

//   var conditionsArr = ["TEMP ", "WIND ", "HUMID ", "UVI "];
//   var conditions2Arr = ["temperature", "wind-speed", "humidity", "uv-index"];
//   var locations = [data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi];
//   var units = ['ºC', 'km/h', '%', '']

//   weatherDetails.textContent = '';

//   for (let i = 0; i < conditionsArr.length; i++) {
//     var divEl = document.createElement('h3')
//     var conditionsEl = document.createElement("span");
//     var spanEl = document.createElement("span");
//     conditionsEl.setAttribute("id", `${conditions2Arr[i]}-element`);
//     conditionsEl.setAttribute("class", "lead me-3 w-100");
//     conditionsEl.textContent = conditionsArr[i];
//     spanEl.setAttribute("id", `${conditions2Arr[i]}-span`);
//     if (conditions2Arr[i] === 'uv-index'){
//         if (locations[i] < 3){
//             spanEl.setAttribute("class", "badge bg-success");
//         } else if (locations[i] > 3 && locations[i] < 7) {
//             spanEl.setAttribute("class", "badge bg-warning text-dark");
//         } else {
//             spanEl.setAttribute("class", "badge bg-danger");
//         }
//     } else {
//         spanEl.setAttribute("class", "fw-light");
//     }
//     spanEl.textContent = locations[i] + units[i];
//     divEl.appendChild(conditionsEl);
//     divEl.appendChild(spanEl);
//     weatherDetails.appendChild(divEl)
//   }

//   if (forecastTile.textContent === ''){
//     forecastHR.classList.toggle('invisible')
//     forecastTile.textContent = '5-Day Forecast'
//   }

//   forecastEl.textContent = '';

//   var forecastConditionsArr = ['Temp: ', 'Wind: ', 'Humidity: '];
  

//   for (let i = 1; i < 6; i++) {
//     var forecastConditionsArr2 = [data.daily[i].temp.day, data.daily[i].wind_speed, data.daily[i].humidity];
//     var divEl = document.createElement('div')
//     divEl.setAttribute('class', 'card mx-1 my-1')
//     var divEl2 = document.createElement("div");
//     divEl2.setAttribute('class', 'card-body')
//     var title = document.createElement("h5");
//     title.setAttribute('class', 'card-title')
//     title.textContent = moment.unix(data.daily[i].dt).format('DD/MM/YYYY');
//     var weatherIcon2 = document.createElement('img');
//     weatherIcon2.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
//     divEl.appendChild(divEl2);
//     divEl2.appendChild(title);
//     divEl2.appendChild(weatherIcon2);
//     for (let j = 0; j < forecastConditionsArr.length; j++) {
//       var pEl = document.createElement('p');
//       pEl.setAttribute('class', 'card-text');
//       pEl.textContent = forecastConditionsArr[j];
//       var spanEl = document.createElement('span');
//       spanEl.textContent = forecastConditionsArr2[j] + units[j];
//       pEl.appendChild(spanEl);
//       divEl2.appendChild(pEl)
//     }
//     forecastEl.appendChild(divEl)
//   }
// }
// // get the weather for the lat and long of city
// function getWeather(lat, long) {
//   fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=metric&appid=' + apiKey)
//     .then((response) => {
//       if (response.status >= 200 && response.status <= 299) {
//         return response.json();
//       }
//     })
//     .then(function (data) {
//       console.log(data);
//       renderWeather(data);
      
//     });
// }

// // get lat and long of city searched for
// function getCoords(city) {
//     fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey)
//     .then(function(response) {
//         if (response.status >= 200 && response.status <= 299) {
//             return response.json();
//         }
//     })
//     .then(function(data) {
//         if (data.length !== 0){
//             getWeather(data[0].lat, data[0].lon)
//             setHist(data[0].name + ', ' + data[0].country);
//             hist = getHist();
//             renderHist(hist);
//             renderCity(data[0].name, data[0].country);
//         } else {
//             showError()
//         }
//     })
// }

// // add event listener to go button to get city weather forecast
// btnGo.addEventListener("click", function () {
//   var city = cityInput.value.trim();
//   if (city !== "") {
//     getCoords(city);
//     cityInput.value = "";
//   } 
// });

// btnGo.addEventListener('keypress', function (event) {
//   if (event.key === 'Enter') {
//     const city = cityInput.value.trim();
//     if (city !== "") {
//       getCoords(city);
//       cityInput.value = "";
//     } 
//   }
// });

// // add event listener to clear history button so that local storage is cleared
// btnClearHistory.addEventListener('click', function() {
//     localStorage.clear()
//     location.reload()
// })

const weatherData = {
  "lat": -31.9527,
  "lon": 115.8605,
  "timezone": "Australia/Perth",
  "timezone_offset": 28800,
  "current": {
      "dt": 1644570724,
      "sunrise": 1644529836,
      "sunset": 1644577868,
      "temp": 28.27,
      "feels_like": 29.98,
      "pressure": 1005,
      "humidity": 61,
      "dew_point": 20.03,
      "uvi": 1.6,
      "clouds": 0,
      "visibility": 10000,
      "wind_speed": 6.69,
      "wind_deg": 250,
      "weather": [
          {
              "id": 800,
              "main": "Clear",
              "description": "clear sky",
              "icon": "01d"
          }
      ]
  },
  "minutely": [
      {
          "dt": 1644570780,
          "precipitation": 0
      },
      {
          "dt": 1644570840,
          "precipitation": 0
      },
      {
          "dt": 1644570900,
          "precipitation": 0
      },
      {
          "dt": 1644570960,
          "precipitation": 0
      },
      {
          "dt": 1644571020,
          "precipitation": 0
      },
      {
          "dt": 1644571080,
          "precipitation": 0
      },
      {
          "dt": 1644571140,
          "precipitation": 0
      },
      {
          "dt": 1644571200,
          "precipitation": 0
      },
      {
          "dt": 1644571260,
          "precipitation": 0
      },
      {
          "dt": 1644571320,
          "precipitation": 0
      },
      {
          "dt": 1644571380,
          "precipitation": 0
      },
      {
          "dt": 1644571440,
          "precipitation": 0
      },
      {
          "dt": 1644571500,
          "precipitation": 0
      },
      {
          "dt": 1644571560,
          "precipitation": 0
      },
      {
          "dt": 1644571620,
          "precipitation": 0
      },
      {
          "dt": 1644571680,
          "precipitation": 0
      },
      {
          "dt": 1644571740,
          "precipitation": 0
      },
      {
          "dt": 1644571800,
          "precipitation": 0
      },
      {
          "dt": 1644571860,
          "precipitation": 0
      },
      {
          "dt": 1644571920,
          "precipitation": 0
      },
      {
          "dt": 1644571980,
          "precipitation": 0
      },
      {
          "dt": 1644572040,
          "precipitation": 0
      },
      {
          "dt": 1644572100,
          "precipitation": 0
      },
      {
          "dt": 1644572160,
          "precipitation": 0
      },
      {
          "dt": 1644572220,
          "precipitation": 0
      },
      {
          "dt": 1644572280,
          "precipitation": 0
      },
      {
          "dt": 1644572340,
          "precipitation": 0
      },
      {
          "dt": 1644572400,
          "precipitation": 0
      },
      {
          "dt": 1644572460,
          "precipitation": 0
      },
      {
          "dt": 1644572520,
          "precipitation": 0
      },
      {
          "dt": 1644572580,
          "precipitation": 0
      },
      {
          "dt": 1644572640,
          "precipitation": 0
      },
      {
          "dt": 1644572700,
          "precipitation": 0
      },
      {
          "dt": 1644572760,
          "precipitation": 0
      },
      {
          "dt": 1644572820,
          "precipitation": 0
      },
      {
          "dt": 1644572880,
          "precipitation": 0
      },
      {
          "dt": 1644572940,
          "precipitation": 0
      },
      {
          "dt": 1644573000,
          "precipitation": 0
      },
      {
          "dt": 1644573060,
          "precipitation": 0
      },
      {
          "dt": 1644573120,
          "precipitation": 0
      },
      {
          "dt": 1644573180,
          "precipitation": 0
      },
      {
          "dt": 1644573240,
          "precipitation": 0
      },
      {
          "dt": 1644573300,
          "precipitation": 0
      },
      {
          "dt": 1644573360,
          "precipitation": 0
      },
      {
          "dt": 1644573420,
          "precipitation": 0
      },
      {
          "dt": 1644573480,
          "precipitation": 0
      },
      {
          "dt": 1644573540,
          "precipitation": 0
      },
      {
          "dt": 1644573600,
          "precipitation": 0
      },
      {
          "dt": 1644573660,
          "precipitation": 0
      },
      {
          "dt": 1644573720,
          "precipitation": 0
      },
      {
          "dt": 1644573780,
          "precipitation": 0
      },
      {
          "dt": 1644573840,
          "precipitation": 0
      },
      {
          "dt": 1644573900,
          "precipitation": 0
      },
      {
          "dt": 1644573960,
          "precipitation": 0
      },
      {
          "dt": 1644574020,
          "precipitation": 0
      },
      {
          "dt": 1644574080,
          "precipitation": 0
      },
      {
          "dt": 1644574140,
          "precipitation": 0
      },
      {
          "dt": 1644574200,
          "precipitation": 0
      },
      {
          "dt": 1644574260,
          "precipitation": 0
      },
      {
          "dt": 1644574320,
          "precipitation": 0
      },
      {
          "dt": 1644574380,
          "precipitation": 0
      }
  ],
  "hourly": [
      {
          "dt": 1644570000,
          "temp": 28.27,
          "feels_like": 29.98,
          "pressure": 1005,
          "humidity": 61,
          "dew_point": 20.03,
          "uvi": 1.6,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 5.97,
          "wind_deg": 219,
          "wind_gust": 7.43,
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10d"
              }
          ],
          "pop": 0.23,
          "rain": {
              "1h": 0.12
          }
      },
      {
          "dt": 1644573600,
          "temp": 27.88,
          "feels_like": 29.17,
          "pressure": 1005,
          "humidity": 59,
          "dew_point": 19.13,
          "uvi": 0.38,
          "clouds": 4,
          "visibility": 10000,
          "wind_speed": 5.33,
          "wind_deg": 216,
          "wind_gust": 7.06,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0.19
      },
      {
          "dt": 1644577200,
          "temp": 26.85,
          "feels_like": 28.03,
          "pressure": 1006,
          "humidity": 62,
          "dew_point": 18.96,
          "uvi": 0,
          "clouds": 6,
          "visibility": 10000,
          "wind_speed": 4.65,
          "wind_deg": 212,
          "wind_gust": 6.59,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0.15
      },
      {
          "dt": 1644580800,
          "temp": 25.58,
          "feels_like": 25.92,
          "pressure": 1007,
          "humidity": 66,
          "dew_point": 18.76,
          "uvi": 0,
          "clouds": 15,
          "visibility": 10000,
          "wind_speed": 4.15,
          "wind_deg": 194,
          "wind_gust": 6.04,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02n"
              }
          ],
          "pop": 0.13
      },
      {
          "dt": 1644584400,
          "temp": 24.14,
          "feels_like": 24.41,
          "pressure": 1009,
          "humidity": 69,
          "dew_point": 18.1,
          "uvi": 0,
          "clouds": 10,
          "visibility": 10000,
          "wind_speed": 4.59,
          "wind_deg": 201,
          "wind_gust": 6.39,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "pop": 0.03
      },
      {
          "dt": 1644588000,
          "temp": 22.45,
          "feels_like": 22.68,
          "pressure": 1011,
          "humidity": 74,
          "dew_point": 17.49,
          "uvi": 0,
          "clouds": 20,
          "visibility": 10000,
          "wind_speed": 4.01,
          "wind_deg": 193,
          "wind_gust": 5.58,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02n"
              }
          ],
          "pop": 0.02
      },
      {
          "dt": 1644591600,
          "temp": 22.06,
          "feels_like": 22.25,
          "pressure": 1011,
          "humidity": 74,
          "dew_point": 17.16,
          "uvi": 0,
          "clouds": 20,
          "visibility": 10000,
          "wind_speed": 3.46,
          "wind_deg": 185,
          "wind_gust": 4.58,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02n"
              }
          ],
          "pop": 0.02
      },
      {
          "dt": 1644595200,
          "temp": 21.6,
          "feels_like": 21.77,
          "pressure": 1011,
          "humidity": 75,
          "dew_point": 16.91,
          "uvi": 0,
          "clouds": 22,
          "visibility": 10000,
          "wind_speed": 3.85,
          "wind_deg": 185,
          "wind_gust": 5.29,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02n"
              }
          ],
          "pop": 0.02
      },
      {
          "dt": 1644598800,
          "temp": 21.11,
          "feels_like": 21.26,
          "pressure": 1011,
          "humidity": 76,
          "dew_point": 16.59,
          "uvi": 0,
          "clouds": 20,
          "visibility": 10000,
          "wind_speed": 4.04,
          "wind_deg": 185,
          "wind_gust": 5.64,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02n"
              }
          ],
          "pop": 0.02
      },
      {
          "dt": 1644602400,
          "temp": 20.66,
          "feels_like": 20.79,
          "pressure": 1011,
          "humidity": 77,
          "dew_point": 16.33,
          "uvi": 0,
          "clouds": 20,
          "visibility": 10000,
          "wind_speed": 4.15,
          "wind_deg": 186,
          "wind_gust": 5.94,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644606000,
          "temp": 20.19,
          "feels_like": 20.3,
          "pressure": 1011,
          "humidity": 78,
          "dew_point": 16.13,
          "uvi": 0,
          "clouds": 27,
          "visibility": 10000,
          "wind_speed": 3.67,
          "wind_deg": 182,
          "wind_gust": 5.15,
          "weather": [
              {
                  "id": 802,
                  "main": "Clouds",
                  "description": "scattered clouds",
                  "icon": "03n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644609600,
          "temp": 20.14,
          "feels_like": 20.19,
          "pressure": 1011,
          "humidity": 76,
          "dew_point": 15.74,
          "uvi": 0,
          "clouds": 56,
          "visibility": 10000,
          "wind_speed": 3.77,
          "wind_deg": 187,
          "wind_gust": 5.27,
          "weather": [
              {
                  "id": 803,
                  "main": "Clouds",
                  "description": "broken clouds",
                  "icon": "04n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644613200,
          "temp": 19.86,
          "feels_like": 19.89,
          "pressure": 1011,
          "humidity": 76,
          "dew_point": 15.28,
          "uvi": 0,
          "clouds": 54,
          "visibility": 10000,
          "wind_speed": 4.35,
          "wind_deg": 186,
          "wind_gust": 6.13,
          "weather": [
              {
                  "id": 803,
                  "main": "Clouds",
                  "description": "broken clouds",
                  "icon": "04n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644616800,
          "temp": 19.25,
          "feels_like": 19.21,
          "pressure": 1012,
          "humidity": 76,
          "dew_point": 14.83,
          "uvi": 0,
          "clouds": 49,
          "visibility": 10000,
          "wind_speed": 3.88,
          "wind_deg": 175,
          "wind_gust": 5.72,
          "weather": [
              {
                  "id": 802,
                  "main": "Clouds",
                  "description": "scattered clouds",
                  "icon": "03d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644620400,
          "temp": 19.61,
          "feels_like": 19.51,
          "pressure": 1013,
          "humidity": 72,
          "dew_point": 14.3,
          "uvi": 0.68,
          "clouds": 57,
          "visibility": 10000,
          "wind_speed": 3.83,
          "wind_deg": 181,
          "wind_gust": 5.57,
          "weather": [
              {
                  "id": 803,
                  "main": "Clouds",
                  "description": "broken clouds",
                  "icon": "04d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644624000,
          "temp": 20.81,
          "feels_like": 20.67,
          "pressure": 1013,
          "humidity": 66,
          "dew_point": 13.94,
          "uvi": 2.23,
          "clouds": 59,
          "visibility": 10000,
          "wind_speed": 4.5,
          "wind_deg": 187,
          "wind_gust": 6.34,
          "weather": [
              {
                  "id": 803,
                  "main": "Clouds",
                  "description": "broken clouds",
                  "icon": "04d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644627600,
          "temp": 22.25,
          "feels_like": 22.1,
          "pressure": 1013,
          "humidity": 60,
          "dew_point": 13.89,
          "uvi": 5.03,
          "clouds": 57,
          "visibility": 10000,
          "wind_speed": 5.16,
          "wind_deg": 192,
          "wind_gust": 6.39,
          "weather": [
              {
                  "id": 803,
                  "main": "Clouds",
                  "description": "broken clouds",
                  "icon": "04d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644631200,
          "temp": 23.83,
          "feels_like": 23.7,
          "pressure": 1013,
          "humidity": 55,
          "dew_point": 13.55,
          "uvi": 8.27,
          "clouds": 30,
          "visibility": 10000,
          "wind_speed": 5.38,
          "wind_deg": 200,
          "wind_gust": 6.14,
          "weather": [
              {
                  "id": 802,
                  "main": "Clouds",
                  "description": "scattered clouds",
                  "icon": "03d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644634800,
          "temp": 25.16,
          "feels_like": 25.04,
          "pressure": 1013,
          "humidity": 50,
          "dew_point": 13.21,
          "uvi": 11.07,
          "clouds": 20,
          "visibility": 10000,
          "wind_speed": 5.4,
          "wind_deg": 212,
          "wind_gust": 5.77,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644638400,
          "temp": 25.95,
          "feels_like": 25.95,
          "pressure": 1012,
          "humidity": 49,
          "dew_point": 13.31,
          "uvi": 13.02,
          "clouds": 15,
          "visibility": 10000,
          "wind_speed": 6.11,
          "wind_deg": 221,
          "wind_gust": 6.02,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644642000,
          "temp": 26.01,
          "feels_like": 26.01,
          "pressure": 1012,
          "humidity": 53,
          "dew_point": 14.64,
          "uvi": 12.66,
          "clouds": 12,
          "visibility": 10000,
          "wind_speed": 7.53,
          "wind_deg": 218,
          "wind_gust": 7.29,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644645600,
          "temp": 26.04,
          "feels_like": 26.04,
          "pressure": 1012,
          "humidity": 54,
          "dew_point": 15.37,
          "uvi": 10.48,
          "clouds": 10,
          "visibility": 10000,
          "wind_speed": 7.37,
          "wind_deg": 214,
          "wind_gust": 7.45,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644649200,
          "temp": 25.9,
          "feels_like": 25.98,
          "pressure": 1012,
          "humidity": 55,
          "dew_point": 15.32,
          "uvi": 6.99,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 7.6,
          "wind_deg": 210,
          "wind_gust": 7.47,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644652800,
          "temp": 25.6,
          "feels_like": 25.65,
          "pressure": 1012,
          "humidity": 55,
          "dew_point": 15.17,
          "uvi": 3.85,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 7.67,
          "wind_deg": 211,
          "wind_gust": 7.72,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644656400,
          "temp": 24.73,
          "feels_like": 24.75,
          "pressure": 1012,
          "humidity": 57,
          "dew_point": 15.24,
          "uvi": 1.53,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 8.07,
          "wind_deg": 206,
          "wind_gust": 8.64,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644660000,
          "temp": 23.83,
          "feels_like": 23.78,
          "pressure": 1012,
          "humidity": 58,
          "dew_point": 14.9,
          "uvi": 0.36,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 8.1,
          "wind_deg": 203,
          "wind_gust": 9.53,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644663600,
          "temp": 22.62,
          "feels_like": 22.56,
          "pressure": 1013,
          "humidity": 62,
          "dew_point": 14.77,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 7.45,
          "wind_deg": 202,
          "wind_gust": 10.09,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644667200,
          "temp": 22.31,
          "feels_like": 22.24,
          "pressure": 1013,
          "humidity": 63,
          "dew_point": 14.7,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 6.6,
          "wind_deg": 199,
          "wind_gust": 10.72,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644670800,
          "temp": 22.64,
          "feels_like": 22.53,
          "pressure": 1014,
          "humidity": 60,
          "dew_point": 14.39,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 5.32,
          "wind_deg": 184,
          "wind_gust": 8.96,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644674400,
          "temp": 22.13,
          "feels_like": 21.91,
          "pressure": 1014,
          "humidity": 58,
          "dew_point": 13.44,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 4.97,
          "wind_deg": 139,
          "wind_gust": 8.51,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644678000,
          "temp": 21.49,
          "feels_like": 21.18,
          "pressure": 1014,
          "humidity": 57,
          "dew_point": 12.54,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 5.13,
          "wind_deg": 124,
          "wind_gust": 9.74,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644681600,
          "temp": 21.07,
          "feels_like": 20.72,
          "pressure": 1014,
          "humidity": 57,
          "dew_point": 12.07,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 4.98,
          "wind_deg": 120,
          "wind_gust": 10.18,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644685200,
          "temp": 20.71,
          "feels_like": 20.32,
          "pressure": 1014,
          "humidity": 57,
          "dew_point": 11.84,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 4.84,
          "wind_deg": 120,
          "wind_gust": 9.74,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644688800,
          "temp": 20.3,
          "feels_like": 19.9,
          "pressure": 1014,
          "humidity": 58,
          "dew_point": 11.68,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 5.04,
          "wind_deg": 119,
          "wind_gust": 9.37,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644692400,
          "temp": 19.59,
          "feels_like": 19.17,
          "pressure": 1015,
          "humidity": 60,
          "dew_point": 11.48,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 5.38,
          "wind_deg": 111,
          "wind_gust": 9.84,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644696000,
          "temp": 18.91,
          "feels_like": 18.45,
          "pressure": 1015,
          "humidity": 61,
          "dew_point": 11.25,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 5.6,
          "wind_deg": 108,
          "wind_gust": 10.19,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644699600,
          "temp": 18.58,
          "feels_like": 18.11,
          "pressure": 1015,
          "humidity": 62,
          "dew_point": 11.15,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 5.42,
          "wind_deg": 107,
          "wind_gust": 10.3,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01n"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644703200,
          "temp": 18.39,
          "feels_like": 17.93,
          "pressure": 1015,
          "humidity": 63,
          "dew_point": 11.18,
          "uvi": 0,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 5.21,
          "wind_deg": 103,
          "wind_gust": 10.57,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644706800,
          "temp": 18.98,
          "feels_like": 18.55,
          "pressure": 1016,
          "humidity": 62,
          "dew_point": 11.48,
          "uvi": 0.71,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 5.37,
          "wind_deg": 99,
          "wind_gust": 9.42,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644710400,
          "temp": 20.87,
          "feels_like": 20.5,
          "pressure": 1016,
          "humidity": 57,
          "dew_point": 12.09,
          "uvi": 2.35,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 4.92,
          "wind_deg": 91,
          "wind_gust": 7.24,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644714000,
          "temp": 23.51,
          "feels_like": 23.27,
          "pressure": 1016,
          "humidity": 52,
          "dew_point": 12.87,
          "uvi": 5.13,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 4.3,
          "wind_deg": 83,
          "wind_gust": 6.12,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644717600,
          "temp": 26.08,
          "feels_like": 26.08,
          "pressure": 1015,
          "humidity": 47,
          "dew_point": 13.76,
          "uvi": 8.45,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 3.03,
          "wind_deg": 79,
          "wind_gust": 4.78,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644721200,
          "temp": 28.22,
          "feels_like": 28.09,
          "pressure": 1014,
          "humidity": 43,
          "dew_point": 14.01,
          "uvi": 11.33,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 1.54,
          "wind_deg": 86,
          "wind_gust": 3.53,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644724800,
          "temp": 29.78,
          "feels_like": 29.33,
          "pressure": 1014,
          "humidity": 39,
          "dew_point": 13.75,
          "uvi": 12.87,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 1.23,
          "wind_deg": 194,
          "wind_gust": 3.42,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644728400,
          "temp": 30.24,
          "feels_like": 29.85,
          "pressure": 1013,
          "humidity": 39,
          "dew_point": 13.5,
          "uvi": 12.5,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 3.37,
          "wind_deg": 212,
          "wind_gust": 4.03,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644732000,
          "temp": 30.32,
          "feels_like": 29.94,
          "pressure": 1012,
          "humidity": 39,
          "dew_point": 13.24,
          "uvi": 10.35,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 5.03,
          "wind_deg": 216,
          "wind_gust": 4.24,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644735600,
          "temp": 29.98,
          "feels_like": 29.78,
          "pressure": 1012,
          "humidity": 41,
          "dew_point": 13.31,
          "uvi": 7.08,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 6.3,
          "wind_deg": 211,
          "wind_gust": 5.36,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      },
      {
          "dt": 1644739200,
          "temp": 29.3,
          "feels_like": 29.33,
          "pressure": 1011,
          "humidity": 44,
          "dew_point": 13.99,
          "uvi": 3.89,
          "clouds": 0,
          "visibility": 10000,
          "wind_speed": 7.05,
          "wind_deg": 209,
          "wind_gust": 6.38,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "pop": 0
      }
  ],
  "daily": [
      {
          "dt": 1644552000,
          "sunrise": 1644529836,
          "sunset": 1644577868,
          "moonrise": 1644564360,
          "moonset": 1644511320,
          "moon_phase": 0.33,
          "temp": {
              "day": 29.09,
              "min": 22.06,
              "max": 29.09,
              "night": 22.06,
              "eve": 27.88,
              "morn": 23.09
          },
          "feels_like": {
              "day": 29.54,
              "night": 22.25,
              "eve": 29.17,
              "morn": 22.92
          },
          "pressure": 1008,
          "humidity": 48,
          "dew_point": 15.51,
          "wind_speed": 5.97,
          "wind_deg": 219,
          "wind_gust": 7.43,
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10d"
              }
          ],
          "clouds": 32,
          "pop": 0.23,
          "rain": 0.12,
          "uvi": 13.08
      },
      {
          "dt": 1644638400,
          "sunrise": 1644616291,
          "sunset": 1644664215,
          "moonrise": 1644653940,
          "moonset": 1644600300,
          "moon_phase": 0.36,
          "temp": {
              "day": 25.95,
              "min": 19.25,
              "max": 26.04,
              "night": 21.49,
              "eve": 23.83,
              "morn": 19.25
          },
          "feels_like": {
              "day": 25.95,
              "night": 21.18,
              "eve": 23.78,
              "morn": 19.21
          },
          "pressure": 1012,
          "humidity": 49,
          "dew_point": 13.31,
          "wind_speed": 8.1,
          "wind_deg": 203,
          "wind_gust": 10.72,
          "weather": [
              {
                  "id": 801,
                  "main": "Clouds",
                  "description": "few clouds",
                  "icon": "02d"
              }
          ],
          "clouds": 15,
          "pop": 0.02,
          "uvi": 13.02
      },
      {
          "dt": 1644724800,
          "sunrise": 1644702744,
          "sunset": 1644750561,
          "moonrise": 1644743400,
          "moonset": 1644689640,
          "moon_phase": 0.39,
          "temp": {
              "day": 29.78,
              "min": 18.39,
              "max": 30.32,
              "night": 23.77,
              "eve": 26.76,
              "morn": 18.39
          },
          "feels_like": {
              "day": 29.33,
              "night": 23.72,
              "eve": 27.25,
              "morn": 17.93
          },
          "pressure": 1014,
          "humidity": 39,
          "dew_point": 13.75,
          "wind_speed": 7.29,
          "wind_deg": 208,
          "wind_gust": 10.57,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": 0,
          "pop": 0,
          "uvi": 12.87
      },
      {
          "dt": 1644811200,
          "sunrise": 1644789198,
          "sunset": 1644836906,
          "moonrise": 1644832560,
          "moonset": 1644779280,
          "moon_phase": 0.42,
          "temp": {
              "day": 30.63,
              "min": 23.52,
              "max": 30.63,
              "night": 26.38,
              "eve": 29.2,
              "morn": 23.94
          },
          "feels_like": {
              "day": 31.66,
              "night": 26.38,
              "eve": 30.32,
              "morn": 23.93
          },
          "pressure": 1015,
          "humidity": 48,
          "dew_point": 17.66,
          "wind_speed": 6.32,
          "wind_deg": 243,
          "wind_gust": 6.94,
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10d"
              }
          ],
          "clouds": 0,
          "pop": 0.42,
          "rain": 0.12,
          "uvi": 12.87
      },
      {
          "dt": 1644897600,
          "sunrise": 1644875651,
          "sunset": 1644923249,
          "moonrise": 1644921420,
          "moonset": 1644869100,
          "moon_phase": 0.45,
          "temp": {
              "day": 33.44,
              "min": 25.74,
              "max": 35.79,
              "night": 28.04,
              "eve": 34.71,
              "morn": 25.76
          },
          "feels_like": {
              "day": 32.4,
              "night": 27.99,
              "eve": 34.07,
              "morn": 26.14
          },
          "pressure": 1018,
          "humidity": 29,
          "dew_point": 12.29,
          "wind_speed": 5.28,
          "wind_deg": 62,
          "wind_gust": 8.96,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": 1,
          "pop": 0,
          "uvi": 12.58
      },
      {
          "dt": 1644984000,
          "sunrise": 1644962103,
          "sunset": 1645009592,
          "moonrise": 1645010040,
          "moonset": 1644959100,
          "moon_phase": 0.48,
          "temp": {
              "day": 33.97,
              "min": 27,
              "max": 34.48,
              "night": 27.48,
              "eve": 32.17,
              "morn": 27
          },
          "feels_like": {
              "day": 32.62,
              "night": 27.89,
              "eve": 31.69,
              "morn": 26.81
          },
          "pressure": 1017,
          "humidity": 26,
          "dew_point": 10.44,
          "wind_speed": 6.29,
          "wind_deg": 192,
          "wind_gust": 11.45,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": 0,
          "pop": 0,
          "uvi": 13
      },
      {
          "dt": 1645070400,
          "sunrise": 1645048556,
          "sunset": 1645095933,
          "moonrise": 1645098420,
          "moonset": 1645049160,
          "moon_phase": 0.5,
          "temp": {
              "day": 33.95,
              "min": 26.76,
              "max": 35.69,
              "night": 28,
              "eve": 33.25,
              "morn": 26.76
          },
          "feels_like": {
              "day": 32.22,
              "night": 27.41,
              "eve": 32.46,
              "morn": 26.6
          },
          "pressure": 1016,
          "humidity": 23,
          "dew_point": 8.69,
          "wind_speed": 5.43,
          "wind_deg": 77,
          "wind_gust": 11.44,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": 0,
          "pop": 0,
          "uvi": 13
      },
      {
          "dt": 1645156800,
          "sunrise": 1645135007,
          "sunset": 1645182273,
          "moonrise": 1645186680,
          "moonset": 1645139220,
          "moon_phase": 0.55,
          "temp": {
              "day": 33.94,
              "min": 25.61,
              "max": 35.76,
              "night": 28.27,
              "eve": 34.34,
              "morn": 25.61
          },
          "feels_like": {
              "day": 32.1,
              "night": 27.2,
              "eve": 32.93,
              "morn": 25.32
          },
          "pressure": 1015,
          "humidity": 22,
          "dew_point": 7.96,
          "wind_speed": 7.13,
          "wind_deg": 166,
          "wind_gust": 12.97,
          "weather": [
              {
                  "id": 800,
                  "main": "Clear",
                  "description": "clear sky",
                  "icon": "01d"
              }
          ],
          "clouds": 0,
          "pop": 0,
          "uvi": 13
      }
  ]
}

const sunDial = document.getElementById('sun-dial');
const sunDialPoint = document.getElementById('sun-dial-point')
const beforeSunDialPoint = document.getElementById('before-sun-dial-point')

function sunDialBeforeMaxWidth() {
    const beforeSunDialMaxWidth = sunDial.clientWidth - sunDialPoint.offsetWidth
    console.log(sunDial.offsetWidth)
    console.log(sunDialPoint.offsetWidth)
    console.log(beforeSunDialMaxWidth)
    // const beforeSunDialWidth = `${beforeSunDialMaxWidth-5}px`
    const beforeSunDialWidth = `${0}px`
    beforeSunDialPoint.setAttribute('style', `width:${beforeSunDialWidth}`)}
sunDialBeforeMaxWidth()

function calcSunPosiPercent(weatherData){
}

console.log(weatherData.current.sunrise - weatherData.current.dt)

function calcSunDialPos(percent){
    const deci = percent/100
    return Math.round(sunDialWidth * deci) + 20
}

function adjustSunDialPos(posi) {
    sunDialPoint.classList.add(`left-[${posi}px]`)
}

function renderSunDial(percent){
    const posi = calcSunDialPos(percent);
    adjustSunDialPos(posi)
}

// renderSunDial(5)