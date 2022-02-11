// global vars
var btnGo = document.getElementById("go");
var cityInput = document.getElementById("city-input");
var histCont = document.getElementById("hist-cont");
var dateEl = document.getElementById("date-el");
var cityName = document.getElementById("city-name");
var weatherIcon = document.getElementById("weather-icon");
var countryName = document.getElementById("country-name");
var weatherDetails = document.getElementById("weather-details");
var btnClearHistory = document.getElementById("clear-btn"); 
var forecastEl = document.getElementById('forecast')
var forecastTile = document.getElementById('forecast-title')
var forecastHR = document.getElementById('hr-fore')

// variables
var apiKey = "30c3e6ac5e44b312b04c4ccf20184f89";
var today = moment().format("MMM Do, YYYY");

// show the error that that place does not exist when searching for place that does not exist in api
function showError() {
    var alertEl = document.createElement("div");
    alertEl.setAttribute("class", "");
    alertEl.setAttribute("role", "alert");
    alertEl.textContent = "That's not a real place...";
    histCont.appendChild(alertEl);
    setTimeout(function () {
        histCont.removeChild(alertEl);
    }, 2000);
}

// check that the variable being saved to local is not already in local
function isDoubles(city) {
  for (let i = 0; i < hist.length; i++) {
    if (city === hist[i]) {
      return true;
    }
  }
}

// set city to local storage
function setHist(city) {
  if (!isDoubles(city)) {
    hist.push(city);
    localStorage.setItem("hist", JSON.stringify(hist));
  }
}

// get history from local storage or create new if none exists
// function getHist() {
//   var storedHist = JSON.parse(localStorage.getItem("hist"));
//   if (storedHist === null) {
//     var hist = [];
//     btnClearHistory.classList.add('invisible')
//     return hist;
//   } else {
//     var hist = storedHist;
//     btnClearHistory.classList.remove('invisible')
//     return hist;
//   }
// }

// render the history
function renderHist(hist) {
  histCont.textContent = "";
  for (let i = 0; i < hist.length; i++) {
    var histEl = document.createElement("button");
    histEl.setAttribute("class", "btn btn-secondary m-1");
    histEl.setAttribute("data-city", hist[i]);
    histEl.textContent = hist[i];
    histCont.appendChild(histEl);
    histEl.addEventListener("click", function (event) {
      getCoords(event.target.getAttribute("data-city"));
    });
  }
}

// function that gets everything in order
// function init() {
//   var hist = getHist();
//   renderHist(hist);
//   return hist;
// }

// // run the start up function
// var hist = init();

// render the name of the city
function renderCity(city, country) {
    cityName.textContent = city + ", ";
    countryName.textContent = country;
}

// render the weather for that city
function renderWeather(data) {
  dateEl.textContent = moment().format("MMM Do, YYYY");
  weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png");

  var conditionsArr = ["TEMP ", "WIND ", "HUMID ", "UVI "];
  var conditions2Arr = ["temperature", "wind-speed", "humidity", "uv-index"];
  var locations = [data.current.temp, data.current.wind_speed, data.current.humidity, data.current.uvi];
  var units = ['ºC', 'km/h', '%', '']

  weatherDetails.textContent = '';

  for (let i = 0; i < conditionsArr.length; i++) {
    var divEl = document.createElement('h3')
    var conditionsEl = document.createElement("span");
    var spanEl = document.createElement("span");
    conditionsEl.setAttribute("id", `${conditions2Arr[i]}-element`);
    conditionsEl.setAttribute("class", "lead me-3 w-100");
    conditionsEl.textContent = conditionsArr[i];
    spanEl.setAttribute("id", `${conditions2Arr[i]}-span`);
    if (conditions2Arr[i] === 'uv-index'){
        if (locations[i] < 3){
            spanEl.setAttribute("class", "badge bg-success");
        } else if (locations[i] > 3 && locations[i] < 7) {
            spanEl.setAttribute("class", "badge bg-warning text-dark");
        } else {
            spanEl.setAttribute("class", "badge bg-danger");
        }
    } else {
        spanEl.setAttribute("class", "fw-light");
    }
    spanEl.textContent = locations[i] + units[i];
    divEl.appendChild(conditionsEl);
    divEl.appendChild(spanEl);
    weatherDetails.appendChild(divEl)
  }

  if (forecastTile.textContent === ''){
    forecastHR.classList.toggle('invisible')
    forecastTile.textContent = '5-Day Forecast'
  }

  forecastEl.textContent = '';

  var forecastConditionsArr = ['Temp: ', 'Wind: ', 'Humidity: '];
  

  for (let i = 1; i < 6; i++) {
    var forecastConditionsArr2 = [data.daily[i].temp.day, data.daily[i].wind_speed, data.daily[i].humidity];
    var divEl = document.createElement('div')
    divEl.setAttribute('class', 'card mx-1 my-1')
    var divEl2 = document.createElement("div");
    divEl2.setAttribute('class', 'card-body')
    var title = document.createElement("h5");
    title.setAttribute('class', 'card-title')
    title.textContent = moment.unix(data.daily[i].dt).format('DD/MM/YYYY');
    var weatherIcon2 = document.createElement('img');
    weatherIcon2.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png");
    divEl.appendChild(divEl2);
    divEl2.appendChild(title);
    divEl2.appendChild(weatherIcon2);
    for (let j = 0; j < forecastConditionsArr.length; j++) {
      var pEl = document.createElement('p');
      pEl.setAttribute('class', 'card-text');
      pEl.textContent = forecastConditionsArr[j];
      var spanEl = document.createElement('span');
      spanEl.textContent = forecastConditionsArr2[j] + units[j];
      pEl.appendChild(spanEl);
      divEl2.appendChild(pEl)
    }
    forecastEl.appendChild(divEl)
  }
}
// get the weather for the lat and long of city
function getWeather(lat, long) {
  fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=metric&appid=' + apiKey)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      }
    })
    .then(function (data) {
      console.log(data);
      renderWeather(data);
      
    });
}

// get lat and long of city searched for
function getCoords(city) {
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey)
    .then(function(response) {
        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        }
    })
    .then(function(data) {
        if (data.length !== 0){
            getWeather(data[0].lat, data[0].lon)
            setHist(data[0].name + ', ' + data[0].country);
            hist = getHist();
            renderHist(hist);
            renderCity(data[0].name, data[0].country);
        } else {
            showError()
        }
    })
}

// add event listener to go button to get city weather forecast
btnGo.addEventListener("click", function () {
  var city = cityInput.value.trim();
  if (city !== "") {
    getCoords(city);
    cityInput.value = "";
  } 
});

btnGo.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city !== "") {
      getCoords(city);
      cityInput.value = "";
    } 
  }
});

// add event listener to clear history button so that local storage is cleared
btnClearHistory.addEventListener('click', function() {
    localStorage.clear()
    location.reload()
})
