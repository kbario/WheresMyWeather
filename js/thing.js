// import * as d3 from "https://cdn.skypack.dev/d3@7";

// const apiKey = "30c3e6ac5e44b312b04c4ccf20184f89";

// async function getWeather(coords) {
//   const lat = coords[0].lat;
//   const long = coords[0].lon;
//   const res = await fetch(
//     "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//       lat +
//       "&lon=" +
//       long +
//       "&units=metric&appid=" +
//       apiKey
//   );
//   const data = res.json();
//   return data;
// }
// // get lat and long of city searched for
// async function getCoords(city) {
//   const res = await fetch(
//     "https://api.openweathermap.org/geo/1.0/direct?q=" +
//       city +
//       "&appid=" +
//       apiKey
//   );
//   const data = res.json();
//   return data;
// }

// async function goWeather(city) {
//   const localWeather = JSON.parse(localStorage.getItem(`${city}Weather`)) || "";
//   if (
//     localWeather === "" ||
//     new Date(localWeather.current.dt * 1000 + 1800000) < new Date()
//   ) {
//     let cityCoords = JSON.parse(localStorage.getItem(`${city}Coords`)) || "";
//     if (cityCoords === "") {
//       cityCoords = await getCoords(city);
//       localStorage.setItem(`${city}Coords`, JSON.stringify(cityCoords));
//     }
//     console.log("Fetching Now. Weather for city is not saved or out of date.");
//     const weatherData = await getWeather(cityCoords);
//     localStorage.setItem(`${city}Weather`, JSON.stringify(weatherData));
//     return weatherData;
//   } else {
//     console.log("Weather is cached and up-to-date. Using cached");
//     return localWeather;
//   }
// }

// const weatherData = await goWeather("perth");
// console.log(weatherData);

// const margin = { top: 20, right: 30, bottom: 30, left: 50 };

// const width = innerWidth;
// const height = 300;

// const x = d3
//   .scaleLinear()
//   .domain([0, 13])
//   .range([margin.left, width - margin.right]);
// const y = d3
//   .scaleBand()
//   .domain([1])
//   .range([margin.top, height - margin.bottom]);

// const xAxis = (g) =>
//   g
//     .attr("transform", `translate(0,${height - margin.bottom})`)
//     .call(d3.axisBottom(x));

// const yAxis = (g) =>
//   g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

// const graph = d3
//   .create("svg")
//   .attr("viewBox", [0, 0, width, height])
//   .attr("class", "bg-zinc-50");

// const bar = graph.selectAll("g").append("rect").attr("fill", "blue")
//   .attr("x", x(0))
//   .attr("y", y(0))
//   .attr("width", x(13))
//   .attr("height", 10);
// ;

// bar
//   .append("rect")

// // bar
// //   .append("circle")
// //   .attr("fill", "blue")
// //   .attr("x", function (d) {
// //     return x(d.current.uvi);
// //   })
// //   .attr("y", y(0))
// //   .attr("width", x(1))
// //   .attr("height", y.bandwidth() - 2);

// graph.append("g").call(xAxis);
// graph.append("g").call(yAxis);

// // // const graphDiv3 = d3.select("#graph-div");
// const graphDiv3 = document.getElementById("graph-div");
// graphDiv3.appendChild(graph.node());
