// Fake data
const data = [
  {
    year: 2000,
    aData: 50,
    bData: 50,
  },
  {
    year: 2001,
    aData: 150,
    bData: 50,
  },
  {
    year: 2002,
    aData: 200,
    bData: 50,
  },
  {
    year: 2003,
    aData: 130,
    bData: 50,
  },
  {
    year: 2004,
    aData: 240,
    bData: 50,
  },
  {
    year: 2005,
    aData: 380,
    bData: 50,
  },
  {
    year: 2006,
    aData: 420,
    bData: 50,
  },
];
const color = ["lightgreen", "lightblue"];
// Create SVG and padding for the chart
const svg = d3.select("#chart").append("svg").attr("viewBox", "0 0 300 600");
// .attr("height", 300)
// .attr("width", 600);

const strokeWidth = 1.5;
const margin = { top: 0, bottom: 20, left: 30, right: 20 };
const chart = svg.append("g").attr("transform", `translate(${margin.left},0)`);

const width = 600 - margin.left - margin.right - strokeWidth * 2;
const height = 300 - margin.top - margin.bottom;
const grp = chart
  .append("g")
  .attr("transform", `translate(-${margin.left - strokeWidth},-${margin.top})`);

// Create stack
const stack = d3.stack().keys(["aData", "bData"]);
const stackedValues = stack(data);
console.log(stackedValues);
const stackedData = [];
// Copy the stack offsets back into the data.
stackedValues.forEach((layer, index) => {
  const currentStack = [];
  layer.forEach((d, i) => {
    currentStack.push({
      values: d,
      year: data[i].year,
    });
  });
  stackedData.push(currentStack);
});

// Create scales
const yScale = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(data, dataPoint => dataPoint.popularity)]);
const xScale = d3
  .scaleLinear()
  .range([0, width])
  .domain(d3.extent(data, (dataPoint) => dataPoint.year));

const area = d3
  .area()
  .x((dataPoint) => xScale(dataPoint.year))
  .y0((dataPoint) => yScale(dataPoint.values[0]))
  .y1((dataPoint) => yScale(dataPoint.values[1]));

const series = grp
  .selectAll(".series")
  .data(stackedData)
  .enter()
  .append("g")
  .attr("class", "series");

series
  .append("path")
  .attr("transform", `translate(${margin.left},0)`)
  .style("fill", (d, i) => color[i])
  .attr("stroke", "steelblue")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("stroke-width", strokeWidth)
  .attr("d", (d) => area(d));

// Add the X Axis
chart
  .append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScale).ticks(data.length));

// Add the Y Axis
chart
  .append("g")
  .attr("transform", `translate(0, 0)`)
  .call(d3.axisLeft(yScale));
