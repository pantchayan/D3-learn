let svg = d3.select(".my-circle").append("svg").attr("height", "100vh");

let drawCircle = () => {
  let width = parseInt(d3.select(".my-circle").style("width"), 10);
  svg.attr("width", '100vw');
  let circle = d3.select("svg").selectAll("circle").data([1]);

  circle.exit().remove();

  circle
    .attr("cx", "50vw")
    .attr("cy", "50vh")
    .attr("r", width / 5)
    .attr("stroke-width", 2);
  circle
    .enter()
    .append("circle")
    .attr("cx", "50vw")
    .attr("cy", "50vh")
    .attr("r", width / 5)
    .attr("stroke-width", 2);
};

window.addEventListener("resize", () => {
  let width = parseInt(d3.select(".my-circle").style("width"), 10);

  console.log(width);
  drawCircle();
});

drawCircle();
