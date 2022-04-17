import * as d3 from "https://cdn.skypack.dev/d3@7";

const forecastEl = document.getElementById("forecast");
const currentEl = document.getElementById("current");

const apiKey = "30c3e6ac5e44b312b04c4ccf20184f89";

async function getWeather(coords) {
  const lat = coords[0].lat;
  const long = coords[0].lon;
  const res = await fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      long +
      "&units=metric&appid=" +
      apiKey
  );
  const data = res.json();
  return data;
}
// get lat and long of city searched for
async function getCoords(city) {
  const res = await fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=" +
      apiKey
  );
  const data = res.json();
  return data;
}

Object.defineProperty(String.prototype, "capitalise", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  writable: true, // so that one can overwrite it later
  configurable: true, // so that it can be deleted later
});

// function saveToLocal(city, role, data) {
//   if(data===''){
//     return
//   } else {
//     localStorage.setItem(`${city}${role.capitalise()}`, JSON.stringify(data));
//   }
// }

async function goWeather(city) {
  city = city.capitalise();
  const localWeather = JSON.parse(localStorage.getItem(`${city}Weather`)) || "";
  if (
    localWeather === "" ||
    new Date(localWeather.current.dt * 1000 + 1800000) < new Date()
  ) {
    let cityCoords = JSON.parse(localStorage.getItem(`${city}Coords`)) || "";
    if (cityCoords === "") {
      cityCoords = await getCoords(city);
      localStorage.setItem(`${city}Coords`, JSON.stringify(cityCoords));
    }
    console.log("Fetching Now. Weather for city is not saved or out of date.");
    const weatherData = await getWeather(cityCoords);
    localStorage.setItem(`${city}Weather`, JSON.stringify(weatherData));
    return weatherData;
  } else {
    console.log("Weather is cached and up-to-date. Using cached");
    return localWeather;
  }
}

// const weatherData = await goWeather("Perth");

// a function that takes the time stamp from open weather api
// checks whether the day of the dt is the same as today, or tomorrow
// returns tod or tom if yes, else returns the day
function day(dt) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  const then = new Date(dt * 1000);
  if (now.getDate() === then.getDate()) {
    return "Tod";
  } else if (now.getDate() + 1 === then.getDate()) {
    return "Tom";
  } else {
    return days[new Date(dt * 1000).getDay()];
  }
}

// maps the weatherData to return an html element containing weather info.
function createHTMLEls(weatherData) {
  const sixDayForecast = weatherData.daily.map((item, idx) => {
    return `
  <div class="flex items-center w-16"><h3>${day(item.dt)}</h3></div>
  <div class="flex items-center gap-1 w-28"><img src="http://openweathermap.org/img/wn/${
    item.weather[0].icon
  }@2x.png" class="w-8 h-8"><h3>${item.weather[0].main}</h3></div>
  <div class="flex grow justify-around items-center">
    <p>${Math.round(item.temp.min)}</p>
    <div id="graph-${idx}" class="forecast-graph w-2/3 h-4"></div>
    <p>${Math.round(item.temp.max)}</p>
  </div>`;
  });
  return sixDayForecast;
}

// a loop over the html elements, appending them to the dom
function appendForecastInfo(sixDayForecast) {
  forecastEl.innerHTML = "";
  sixDayForecast.forEach((i, idx, array) => {
    const outerDiv = document.createElement("div");
    outerDiv.setAttribute("class", "flex items-center w-full py-1 px-3");
    outerDiv.innerHTML = i;
    forecastEl.appendChild(outerDiv);

    if (idx !== array.length - 1) {
      const hr = document.createElement("hr");
      forecastEl.appendChild(hr);
    }
  });
}

function makeForecastGraphs(weatherData) {
  const rectInsets = 2;

  const width = document.getElementById("graph-1").offsetWidth;
  const height = document.getElementById("graph-1").offsetHeight;

  weatherData.daily.forEach((item, idx) => {
    document.getElementById(`graph-${idx}`).innerHTML = "";

    const x = d3
      .scaleLinear()
      .domain([
        d3.min(weatherData.daily, (d) => d.temp.min),
        d3.max(weatherData.daily, (d) => d.temp.max),
      ])
      .range([0, width]);

    const svg = d3
      .select(`#graph-${idx}`)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("font-family", "sans-serif")
      .attr("font-size", "10")
      .attr("text-anchor", "end");

    const grad = svg
      .append("defs")
      .append("LinearGradient")
      .attr("id", "grad1")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%")
      .attr("gradientUnits", "objectBoundingBox");
    grad
      .append("stop")
      .attr("offset", "0")
      .attr("stop-color", "red")
      .attr("stop-opacity", "1");
    grad
      .append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "white")
      .attr("stop-opacity", "1");
    grad
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "blue")
      .attr("stop-opacity", "1");

    // const bar = svg.append("g");

    svg
      .append("rect")
      .attr("fill", "lightgrey")
      .attr("x", x(d3.min(weatherData.daily, (d) => d.temp.min)))
      // .attr("ry", height / 2)
      .attr("y", rectInsets)
      .attr("width", x(d3.max(weatherData.daily, (d) => d.temp.max)))
      .attr("height", height - rectInsets * 2);

    svg
      .append("rect")
      .attr("fill", "steelblue")
      .attr("x", x(item.temp.min))
      // .attr("ry", height / 2)
      .attr("y", rectInsets)
      .attr("width", x(item.temp.max) - x(item.temp.min))
      .attr("height", height - rectInsets * 2);

    if (idx === 0) {
      // svg
      //   .append("circle")
      //   .attr("fill", "white")
      //   .attr("stroke", "lightgrey")
      //   .attr("stroke-width", "2")
      //   .attr("cx", x(weatherData.current.temp))
      //   .attr("cy", height / 2)
      //   .attr("r", height / 2)
      //   .attr("y", 0);

      svg
        .append("line")
        // .attr("fill", "white")
        .attr("stroke", "steelblue")
        .attr("stroke-width", "2")
        .attr("x1", x(weatherData.current.temp))
        .attr("y1", 0)
        .attr("x2", x(weatherData.current.temp))
        .attr("y2", height);

      svg
        .append("line")
        // .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", "2")
        .attr("x1", x(weatherData.current.feels_like))
        .attr("y1", 0)
        .attr("x2", x(weatherData.current.feels_like))
        .attr("y2", height);
    }
  });
}

const coords = JSON.parse(localStorage.getItem("PerthCoords"));
const weater = JSON.parse(localStorage.getItem("PerthWeather"));
const tempDiv = document.createElement("div");
tempDiv.setAttribute("id", "temp");
tempDiv.setAttribute("class", "text-2xl");
tempDiv.innerHTML = Math.round(weater.current.temp) + "º";
currentEl.appendChild(tempDiv);
const cityDiv = document.createElement("div");
cityDiv.setAttribute("id", "city");
cityDiv.innerHTML = coords[0].name;
currentEl.appendChild(cityDiv);

async function init() {
  const weatherData = await goWeather("Perth");
  const sixDayForecast = createHTMLEls(weatherData);
  appendForecastInfo(sixDayForecast);
  makeForecastGraphs(weatherData);
}

await init();

window.addEventListener("resize", init);
