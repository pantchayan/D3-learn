const svg = d3.select(".canvas").append("svg");

let data;
d3.json("data.json").then((d) => {
  data = d;
});

let render = (data) => {
  data.sort((b, a) => {
    return a.value - b.value;
  });
  let max = -1;
  data.map((runner) => {
    max = runner.value > max ? runner.value : max;
  });
  let yScale = d3.scaleLinear().domain([0, max]).range([0, 600]);
  let xScale = d3
    .scaleBand()
    .domain(data.map((player, index) =>{
        return index
    }))
    .paddingInner(0.1)
    .range([0, 600]);

  let rects = svg.selectAll("rect").data(data);

  rects
    .attr("height", xScale.bandwidth())
    .attr("fill", (d) => d.color)
    .transition()
    .ease(d3.easeLinear)
    .duration(200)
    .attr("y", (d, i) => xScale(i))
    .attr("width", (d) => yScale(d.value));
  rects
    .enter()
    .append("rect")
    .attr("height", xScale.bandwidth())
    .attr("fill", (d) => d.color)
    .attr('y', (d, i) => xScale(i))
    .transition()
    .ease(d3.easeLinear)
    .duration(200)
    .attr("width", (d) => yScale(d.value));
};

setInterval(() => {
  if (!data) return;
  let idx = Math.floor(Math.random() * data.length);
  data[idx].value += data[idx].value * 0.1;
  //   console.log(data[idx])
  render(data);
}, 300);
