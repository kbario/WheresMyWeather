import * as d3 from "https://cdn.skypack.dev/d3@7";

const forecastEl = document.getElementById("forecast");

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

const weatherData = await goWeather("mount barker");
console.log(weatherData);

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

const sixDayForecast = weatherData.daily.map((item, idx) => {
  return `
<div class="flex items-center w-1/5"><h3>${day(item.dt)}</h3></div>
<div class="flex items-center gap-1 w-1/5 justify-start"><img src="http://openweathermap.org/img/wn/${
    item.weather[0].icon
  }@2x.png" class="w-8 h-8"><h3>${item.weather[0].main}</h3></div>
<div class="flex w-3/5 justify-around items-center">
  <p>${Math.round(item.temp.min)}</p>
  <div id="graph-${idx}" class="w-2/3 h-6"></div>
  <p>${Math.round(item.temp.max)}</p>
</div>`;
});

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

const width = document.getElementById("graph-1").offsetWidth;
const height = document.getElementById("graph-1").offsetHeight;

weatherData.daily.forEach((item, idx) => {
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

  const bar = svg.append("g");

  bar
    .append("rect")
    .attr("fill", "lightgrey")
    .attr("x", x(d3.min(weatherData.daily, (d) => d.temp.min)))
    .attr("ry", height / 2)
    .attr("y", 0)
    .attr("width", x(d3.max(weatherData.daily, (d) => d.temp.max)))
    .attr("height", height);

  bar
    .append("rect")
    .attr("fill", "steelblue")
    .attr("x", x(item.temp.min))
    .attr("ry", height / 2)
    .attr("y", 0)
    .attr("width", x(item.temp.max) - x(item.temp.min))
    .attr("height", height);
});
// const x = d3
//   .scaleLinear()
//   .domain([
//     d3.min(weatherData.daily, (d) => d.temp.min),
//     d3.max(weatherData.daily, (d) => d.temp.max),
//   ])
//   .range([0, width]);

// const svg = d3
//   .select("#graph-0")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height)
//   .attr("font-family", "sans-serif")
//   .attr("font-size", "10")
//   .attr("text-anchor", "end");

// const bar = svg.append("g");

// bar
//   .append("rect")
//   .attr("fill", "grey")
//   .attr("x", x(d3.min(weatherData.daily, (d) => d.temp.min)))
//   .attr("ry", height / 2)
//   .attr("y", 0)
//   .attr("width", x(d3.max(weatherData.daily, (d) => d.temp.max)))
//   .attr("height", height);

// bar
//   .append("rect")
//   .attr("fill", "steelblue")
//   .attr("x", x(weatherData.daily[0].temp.min))
//   .attr("ry", height / 2)
//   .attr("y", 0)
//   .attr(
//     "width",
//     x(weatherData.daily[0].temp.max) - x(weatherData.daily[0].temp.min)
//   )
//   .attr("height", height);
// bar
//   .append("text")
//   .attr("fill", "white")
//   .attr("x", (d) => x(d.value) - 3)
//   .attr("y", height / 2)
//   .attr("dy", "0.35em")
//   .text((d) => d.value);

// document.getElementById("graph-1").append(svg.node());
