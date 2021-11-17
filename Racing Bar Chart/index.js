const svg = d3.select(".canvas").append("svg");

let data;
d3.json("data.json").then((d) => {
  data = d;
});

let render = (data, max) => {
  data.sort((b, a) => {
    return a.value - b.value;
  });
  
  let yScale = d3.scaleLinear().domain([0, max]).range([0, 600]);
  let xScale = d3
    .scaleBand()
    .domain(
      data.map((runner, index) => {
        return index;
      })
    )
    .paddingInner(0.1)
    .range([0, 600]);

  let rects = svg
    .selectAll("rect")
    .data(data, (entry, index) => entry.name)
    .join((enter) =>
      enter.append("rect").attr("y", (entry, index) => xScale(index))
    )
    .attr("height", xScale.bandwidth())
    .attr("fill", (d) => d.color)
    .transition()
    .ease(d3.easeLinear)
    .duration(200)
    .attr("width", (d) => yScale(d.value))
    .attr("y", (d, i) => xScale(i));

  //   rects
  //     .attr("height", xScale.bandwidth())
  //     .attr("fill", (d) => d.color)
  //     .transition()
  //     .ease(d3.easeLinear)
  //     .duration(200)
  //     .attr("y", (d, i) => xScale(i))
  //     .attr("width", (d) => yScale(d.value));
  //   rects
  //     .enter()
  //     .append("rect")
  //     .attr("height", xScale.bandwidth())
  //     .attr("fill", (d) => d.color)
  //     .attr("y", (d, i) => xScale(i))
  //     .transition()
  //     .ease(d3.easeLinear)
  //     .duration(200)
  //     .attr("width", (d) => yScale(d.value));

  let texts = svg
    .selectAll("text")
    .data(data, (entry, index) => entry.name)
    .join((enter) =>
      enter.append("text").attr("y", (d, i) => {
        return xScale(i) + xScale.bandwidth() / 2;
      })
    )
    .text((d) => `${d.name} 🏃 @ distance ${Math.floor(d.value)}`)
    .style('font-family', 'Arial')
    .style('font-weight', 600)
    .transition()
    .ease(d3.easeLinear)
    .duration(200)
    .attr("y", (d, i) => {
      return xScale(i) + xScale.bandwidth() / 2;
    });
};

setInterval(() => {
  if (!data) return;
  let idx = Math.floor(Math.random() * data.length);
  let max = -1;
  data.map((runner) => {
    max = runner.value > max ? runner.value : max;
  });
  data[idx].value += max * 0.1;
  //   console.log(data[idx])
  render(data, max);
}, 300);
