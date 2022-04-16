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

// const weeklyMin = d3.min(
//   weatherData.daily.map((el) => {
//     return el.temp.min;
//   })
// );

// const weeklyMax = d3.max(
//   weatherData.daily.map((el) => {
//     return el.temp.max;
//   })
// );
// const startTime = d3.min(
//   weatherData.daily.map((el) => {
//     return el.dt * 1000;
//   })
// );
// const finishTime = d3.max(
//   weatherData.daily.map((el) => {
//     return el.dt * 1000;
//   })
// );

// console.log("weekly minimum:", weeklyMin, "\nweekly maximum:", weeklyMax);

// const margin = { top: 20, right: 30, bottom: 30, left: 50 };

// const dayFormatter = d3.timeFormat("%a %d");

// const width = innerWidth;
// const height = 300;

// const x = d3
//   .scaleLinear()
//   .domain([weeklyMin, weeklyMax])
//   .range([margin.left, width - margin.right]);
// const y = d3
//   .scaleBand()
//   .domain(
//     weatherData.daily.map(function (d) {
//       return dayFormatter(d.dt * 1000);
//     })
//   )
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

// const bar = graph.selectAll("g").data(weatherData.daily).enter().append("g");

// bar
//   .append("rect")
//   .attr("fill", "lightGrey")
//   .attr("x", function (d) {
//     return x(weeklyMin);
//   })
//   .attr("ry", y.bandwidth() / 2)
//   .attr("y", function (d) {
//     return y(dayFormatter(d.dt * 1000));
//   })
//   .attr("width", () => {
//     return x(weeklyMax) - x(weeklyMin);
//   })
//   .attr("height", y.bandwidth() - 2);

// bar
//   .append("rect")
//   .attr("fill", "blue")
//   .attr("x", function (d) {
//     return x(d.temp.min);
//   })
//   .attr("y", function (d) {
//     return y(dayFormatter(d.dt * 1000));
//   })
//   .attr("ry", y.bandwidth() / 2)
//   .attr("width", (d) => {
//     return x(d.temp.max) - x(d.temp.min);
//   })
//   .attr("height", y.bandwidth() - 2);

// graph.append("g").call(xAxis);
// graph.append("g").call(yAxis);

// // const graphDiv3 = d3.select("#graph-div");
// const graphDiv3 = document.getElementById("graph-div");
// graphDiv3.appendChild(graph.node());

// function dothing() {
//   d3.selectAll("svg").remove();
//   const width = innerWidth;

//   const x = d3
//     .scaleLinear()
//     .domain([weeklyMin, weeklyMax])
//     .range([margin.left, width - margin.right]);
//   const y = d3
//     .scaleBand()
//     .domain(
//       weatherData.daily.map(function (d) {
//         return dayFormatter(d.dt * 1000);
//       })
//     )
//     .range([margin.top, height - margin.bottom]);

//   const xAxis = (g) =>
//     g
//       .attr("transform", `translate(0,${height - margin.bottom})`)
//       .call(d3.axisBottom(x));

//   const yAxis = (g) =>
//     g.attr("transform", `translate(${margin.left},0)`).call(d3.axisLeft(y));

//   const graph = d3
//     .create("svg")
//     .attr("viewBox", [0, 0, width, height])
//     .attr("class", "bg-zinc-50");

//   const bar = graph.selectAll("g").data(weatherData.daily).enter().append("g");

//   bar
//     .append("rect")
//     .attr("fill", "lightGrey")
//     .attr("x", function (d) {
//       return x(weeklyMin);
//     })
//     .attr("ry", y.bandwidth() / 2)
//     .attr("y", function (d) {
//       return y(dayFormatter(d.dt * 1000));
//     })
//     .attr("width", () => {
//       return x(weeklyMax) - x(weeklyMin);
//     })
//     .attr("height", y.bandwidth() - 2);

//   bar
//     .append("rect")
//     .attr("fill", "blue")
//     .attr("x", function (d) {
//       return x(d.temp.min);
//     })
//     .attr("y", function (d) {
//       return y(dayFormatter(d.dt * 1000));
//     })
//     .attr("ry", y.bandwidth() / 2)
//     .attr("width", (d) => {
//       return x(d.temp.max) - x(d.temp.min);
//     })
//     .attr("height", y.bandwidth() - 2);

//   graph.append("g").call(xAxis);
//   graph.append("g").call(yAxis);

//   // const graphDiv3 = d3.select("#graph-div");
//   const graphDiv3 = document.getElementById("graph-div");
//   graphDiv3.appendChild(graph.node());
// }

// window.addEventListener("resize", dothing);

// // <defs>
// //   <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
// //     <stop offset="0%" style="stop-color:#14d90f" />
// //     <stop offset="15%" style="stop-color:#14d90f" />
// //     <stop offset="23%" style="stop-color:#fffe00" />
// //     <stop offset="38%" style="stop-color:#fffe00" />
// //     <stop offset="46%" style="stop-color:#fc9303" />
// //     <stop offset="53%" style="stop-color:#fc9303" />
// //     <stop offset="61%" style="stop-color:#ff0000" />
// //     <stop offset="76%" style="stop-color:#ff0000" />
// //     <stop offset="84%" style="stop-color:#ad00ff" />
// //     <stop offset="100%" style="stop-color:#ad00ff" />
// //   </linearGradient>
// // </defs>;

// debugger;

// const colours = [
//   "rgb(34 197 94)",
//   "rgb(34 197 94)",
//   "rgb(253, 224, 71)",
//   "rgb(253, 224, 71)",
//   "rgb(253, 224, 71)",
//   "rgb(245, 158, 11)",
//   "rgb(245, 158, 11)",
//   "rgb(220, 38, 38)",
//   "rgb(220, 38, 38)",
//   "rgb(220, 38, 38)",
//   "rgb(147 51 234)",
//   "rgb(147 51 234)",
//   "rgb(147 51 234)",
// ];

// const height = 500,
//   width = 500,
//   radius = 175;

// const svg = d3
//   .select("body")
//   .append("svg")
//   .attr("width", width)
//   .attr("height", height)
//   .append("g")
//   .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");

// const arc = d3
//   .arc()
//   .innerRadius(radius - 20)
//   .outerRadius(radius);

// const colors = [];
// // 360 degrees
// d3.range(13).forEach(function (d, i) {
//   // convert to radians
//   const start = -0.8 * Math.PI + (i * (1.6 * Math.PI)) / 13;
//   const end = -0.8 * Math.PI + ((i + 1) * (1.6 * Math.PI)) / 13;
//   colors.push({
//     startAngle: start,
//     endAngle: end,
//     fill: colours[i],
//     text: i + 1,
//     uvi: weatherData.current.uvi,
//   });
// });

// svg
//   .selectAll(".arc")
//   .data(colors)
//   .enter()
//   .append("path")
//   .attr("class", "arc")
//   .attr("d", arc)
//   .attr("r", "20")
//   .style("fill", function (d) {
//     return d.fill;
//   })
//   .style("stroke", "white");
