const margin = { top: 40, right: 20, bottom: 50, left: 100 };
const graphWidth = 560 - margin.right - margin.left;
const graphHeight = 400 - margin.top - margin.bottom;

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", graphWidth + margin.left + margin.right)
  .attr("height", graphHeight + margin.top + margin.bottom);

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// scales
const x = d3.scaleTime().range([0, graphWidth]);
const y = d3.scaleLinear().range([graphHeight, 0]);

// axes groups
const xAxisGroup = graph
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0," + graphHeight + ")");

const yAxisGroup = graph.append("g").attr("class", "y-axis");

const line = d3
  .line()
  //   .curve(d3.curveCardinal)
  .x(function (d) {
    return x(new Date(d.date));
  })
  .y(function (d) {
    return y(d.distance);
  });

const path = graph.append("path");
// update function
const update = (data) => {
  // filter objects with current activity
  data = data.filter((item) => item.activity == input.id);

  // sort the data based on date objects
  data.sort((a, b) => new Date(a.date) - new Date(b.date));
  // set scale domains
  x.domain(d3.extent(data, (d) => new Date(d.date)));
  y.domain([0, d3.max(data, (d) => d.distance)]);

  // create circles
  const circles = graph.selectAll("circle").data(data);

  circles.exit().remove();

  circles
    .attr("r", 5)
    .attr("cx", (d) => x(new Date(d.date)))
    .attr("cy", (d) => y(d.distance))
    .attr("fill", "#34A853");

  // add new points
  circles
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("cx", (d) => x(new Date(d.date)))
    .attr("cy", (d) => y(d.distance))
    .attr("fill", "#34A853");

  // creating lines that connect these points

  // create axes
  const xAxis = d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat("%b %d"));

  const yAxis = d3
    .axisLeft(y)
    .ticks(4)
    .tickFormat((d) => d + "m");

  // call axes
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  // rotate axis text
  xAxisGroup
    .selectAll("text")
    .attr("transform", "translate(0, 0)")
    .attr("transform", "rotate(-30)")
    .attr("text-anchor", "end");

  path
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "#4285F4")
    .attr("stroke-width", "4")
    .attr("d", line)
    .attr("stroke-linecap", "round")
    .transition()
    .duration(delay * data.length)
    .attrTween("stroke-dasharray", tweenDash);

};

// getting data from firestore in data array
let data = [];

db.collection("activities").onSnapshot((res) => {
  res.docChanges().forEach((change) => {
    const doc = { ...change.doc.data(), id: change.doc.id };

    switch (change.type) {
      case "added":
        data.push(doc);
        break;
      case "modified":
        let idx = data.findIndex((item) => item.id == doc.id);
        data[idx] = doc;
        break;
      case "removed":
        data = data.filter((item) => item.id !== doc.id);
        break;
      default:
        break;
    }
  });

  update(data);
});

var tweenDash = function () {
  const l = this.getTotalLength(),
    i = d3.interpolateString("0," + l, l + "," + l);
  return function (t) {
    return i(t);
  };
};
