const dims = { height: 300, width: 300, radius: 150 };
const cent = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 150)
  .attr("height", dims.height + 150);

const graph = svg
  .append("g")
  .attr("transform", `translate(${cent.x}, ${cent.y})`);

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

  console.log(paths);
  paths
    .exit()
    .transition()
    .duration(700)
    .attrTween("d", arcTweenExit)
    .remove();

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
    // .attr("d", (d) => arcPath(d))
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("fill", (d) => colorScale(d.data.name))
    .transition()
    .duration(700)
    .attrTween("d", (d) => arcTweenEnter(d));
  
  graph.selectAll('text').data(pie(data)).enter().append("text")
        .attr("x", 200)
        .attr("y", function(d,i){ return i*25}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return colorScale(d.data.name)})
        .attr("text-anchor", "left")
        .text(function(d){ return d.data.name})
        .style("alignment-baseline", "middle")

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
