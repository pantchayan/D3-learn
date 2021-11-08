let svg = d3.select(".my-circle").append("svg");

let drawCircle = (width) => {
  svg.attr("width", width).attr("height", "100vh");
  let circle = d3.select("svg").selectAll("circle").data([1]);

  circle.exit().remove();

  circle
    .attr("cx", "50vw")
    .attr("cy", "50vh")
    .attr("r", width / 4)
    .attr("stroke-width", 2);
  circle
    .enter()
    .append("circle")
    .attr("cx", "50vw")
    .attr("cy", "50vh")
    .attr("r", width / 4)
    .attr("stroke-width", 2);
};

window.addEventListener("resize", () => {
  let currWidth = parseInt(d3.select(".my-circle").style("width"));

  if (currWidth < 600) {
    drawCircle(currWidth);
  }   
});

drawCircle(window.innerWidth);
