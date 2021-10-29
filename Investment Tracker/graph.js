const dims = { height: 300, width: 400, radius: 150 };
const center = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 150)
  .attr("height", dims.height + 150);

const graph = svg
  .append("g")
  .attr("transform", `translate(${center.x}, ${center.y})`);

const legend = svg
  .append("g")
  .attr("transform", `translate(${center.x + dims.radius + 20}, ${10})`);

const pie = d3
  .pie()
  .sort(null)
  .value((d) => d.cost);

const arcPath = d3
  .arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2);

// ordinal scale
const colorScale = d3.scaleOrdinal(d3["schemeSet3"]);

// update function
let update = (data) => {
  // D3 OPTICS PATTERN

  // Update scales that rely on data
  colorScale.domain(data.map((item) => item.name));

  // Join updated data to the elements
  const paths = graph.selectAll("path").data(pie(data));
  const texts = legend.selectAll("text").data(pie(data));
  const circles = legend.selectAll("circle").data(pie(data));

  paths.exit().transition().duration(700).attrTween("d", arcTweenExit).remove();

  paths
    .attr("class", "arc")
    .attr("d", (d) => arcPath(d))
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("fill", (d) => colorScale(d.data.name));

  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    // .attr("d", (d) => arcPath(d)) // transitioning from 0 to end
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("fill", (d) => colorScale(d.data.name))
    .transition()
    .duration(700)
    .attrTween("d", (d) => arcTweenEnter(d));

  texts.exit().remove();

  texts
    .attr("y", (d, i) => i * 25) //  25 is the distance between labels
    .style("fill", d => colorScale(d.data.name))
    .attr("text-anchor", "left")
    .text(d => d.data.name)
    .style("alignment-baseline", "middle")
    .style("text-style", "bold")

  texts
    .enter()
    .append("text")
    .attr("x", 10)
    .attr("y", (d, i) => i * 25) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", d => colorScale(d.data.name))
    .attr("text-anchor", "left")
    .text(d => d.data.name)
    .style("alignment-baseline", "middle")
    .style("font-weight", "500")

  circles.exit().remove();

  circles
  .enter()
  .append('circle')
      .attr("cy", (d, i) => i*25)
      .style("fill", d => colorScale(d.data.name))
      .attr("r", 4)



};

// getting data from firestore in data array
let data = [];

db.collection("investments").onSnapshot((res) => {
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

const arcTweenEnter = (d) => {
  let i = d3.interpolate(d.endAngle, d.startAngle);

  return function (t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

const arcTweenExit = (d) => {
  let i = d3.interpolate(d.startAngle, d.endAngle);

  return function (t) {
    d.startAngle = i(t);
    return arcPath(d);
  };
};
