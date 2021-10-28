// select the svg container first
const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

// create margins & dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// scales -> based on graph settings
const y = d3.scaleLinear().range([graphHeight, 0]);

const x = d3
  .scaleBand()
  .range([0, graphWidth])
  .paddingInner(0.2)
  .paddingOuter(0.2);

// Creating Axes groups
const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);

const yAxisGroup = graph.append("g");

// Setting properties to axis groups
yAxisGroup.selectAll("text").attr("color", "red");

xAxisGroup
  .selectAll("text")
  .attr("transform", "rotate(20)")
  .attr("text-anchor", "start")
  .attr("color", "orange");

// Creating axes
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(4)
  .tickFormat((d) => d + " orders");

let update = (data) => {
  // Step1:= updating scales, and properties taht rely on our data
  y.domain([0, d3.max(data, (d) => d.orders)]);
  x.domain(data.map((item) => item.name));

  // Step2:= Join updated data to elements
  const rects = graph.selectAll("rect").data(data);

  // Step3:= Remove unwanted rects using exit
  rects.exit().remove();

  // Step4:= Update currently present shapes in DOM

  // add attrs to circs already in the DOM
  rects
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    .attr("y", (d) => y(d.orders));

  // Step 5:= Append to DOM using Enter Selection
  // append the enter selection to the DOM
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    // .attr("height", (d) => graphHeight - y(d.orders))
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    // .attr("y", (d) => y(d.orders))
    .attr("height", d => 0)
    .attr('y', d => graphHeight)
    .transition()
    .duration(1000)
        .attr("height", d => graphHeight - y(d.orders))
        .attr('y', d => y(d.orders));;

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};

var data = [];

db.collection('dishes').onSnapshot(res => {
  
  res.docChanges().forEach(change => {

    const doc = {...change.doc.data(), id: change.doc.id};

    switch (change.type) {
      case 'added':
        data.push(doc);
        break;
      case 'modified':
        const index = data.findIndex(item => item.id == doc.id);
        data[index] = doc;
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }

  });

  update(data);

});
//   .then((res) => {
//     let data = [];
//     // console.log(res);
//     // console.log(res.docs)
//     res.docs.forEach((d) => {
//       data.push(d.data());
//     });

//     update(data);
// });
