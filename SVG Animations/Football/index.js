let container = d3.select("#container");

let containerHeight = parseInt(container.style("height"));
let containerWidth = parseInt(container.style("width"));

let playground = d3.select("#container").append("svg").attr("id", "playground");

let makeSquares = () => {
  setInterval(() => {
    let num = Math.random() * containerWidth;
    playground.select("rect").remove();

    playground
      .append("rect")
      .attr("x", num)
      .attr("y", -100)
      .attr("width", 100)
      .attr("height", 100)
      .transition()
      .ease(d3.easeLinear)
      .duration(1000)
      .attr("y", containerHeight);

    // playground.select("rect").remove();

    num = Math.random() * containerWidth;
    playground
      .append("rect")
      .attr("x", num)
      .attr("y", -100)
      .attr("width", 100)
      .attr("height", 100)
      .transition()
      .delay(500)
      .ease(d3.easeLinear)
      .duration(1000)
      .attr("y", containerHeight);
  }, 2000);
};

console.log(containerHeight, containerWidth);

makeSquares();
