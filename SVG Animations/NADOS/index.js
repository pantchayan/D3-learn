// setting opacities as 0 for all the elements
let setAllOpacityToZero = () => {
  d3.selectAll("#intro").attr("opacity", "0");
  d3.selectAll("#pep").attr("opacity", "0");
  d3.selectAll("#from").attr("opacity", "0");
  d3.selectAll(".font").attr("opacity", "0");
  d3.selectAll(".planet").attr("opacity", "0");
  d3.selectAll(".rocket").attr("opacity", "0");
};
// setAllOpacityToZero();

let animateIntro = () => {
  d3.select("#intro")
    .attr("transform", "translate(0,100)scale(2.5)")
    .transition()
    .duration(1000)
    .attr("opacity", "1")
    .transition()
    .duration(500)
    .attr("transform", "translate(0,0)scale(1)");
};

let animateLogo = () => {
  d3.selectAll(".font")
    .attr("opacity", "0")
    .transition()
    .duration(2000)
    .attr("opacity", "1");

  d3.selectAll(".planet")
    .attr("opacity", 1)
    .attr("transform", `translate(500, 0)rotate(${-45})`)
    .transition()
    .duration(2000)
    .attr("transform", `translate(0, 0)rotate(${0})`);

  d3.selectAll(".rocket")
    .attr("opacity", 1)
    .attr("transform", `translate(0, 200)rotate(${180})`)
    .transition()
    .duration(2500)
    .attr("transform", `translate(0, 0)rotate(${0})`);
};

let animateCredit = () => {
  d3.select("#from")
    .attr("transform", "translate(-200,0)")
    .transition()
    .duration(1000)
    .attr("transform", "translate(0,0)")
    .attr("opacity", "1");

  d3.select("#pep")
    .attr("transform", "translate(200,0)")
    .transition()
    .delay(800)
    .duration(1000)
    .attr("transform", "translate(0,0)")
    .attr("opacity", "1");
};

let setToLarge = () => {
  d3.select("#intro").transition().duration(1000).attr("opacity", 0);
  d3.select("#pep").transition().duration(1000).attr("opacity", 0);
  d3.select("#from").transition().duration(1000).attr("opacity", 0);

  d3.select("#logo")
    .transition()
    .duration(1000)
    .attr("transform", "scale(1.25)");
};
let setToSmall = () => {
  d3.select("#intro").transition().duration(1000).attr("opacity", 1);
  d3.select("#pep").transition().duration(1000).attr("opacity", 1);
  d3.select("#from").transition().duration(1000).attr("opacity", 1);

  d3.select("#logo")
    .transition()
    .duration(1000)
    .attr("transform", "scale(1)");
}

let animateCartoon = () => {
  setToLarge();

  d3.select("#N")
    .transition()
    .delay(1000)
    .duration(1000)
    .attr("transform", "translate(-10, 15)rotate(-25)");

  // return;
  d3.selectAll(".rocket")
    .transition()
    .delay(2000)
    .duration(1000)
    .attr("transform", `translate(50, -40)rotate(40)`)
    .transition()
    .duration(1000)
    .attr("transform", `translate(1000, -1000)rotate(40)`);

  setTimeout(() => {
    d3.selectAll(".rocket")
      .attr("transform", `translate(-100,100)rotate(40)`)
      .transition()
      .duration(800)
      .attr("transform", `translate(-40, 70)rotate(-20)`);
  }, 4200);

  setTimeout(() => {
    d3.selectAll(".rocket")
      .transition()
      .duration(400)
      .attr("transform", `translate(-45, 58)rotate(-30)`)
      // .transition()
      // .duration(1000)
      // .attr("transform", `translate(-40, 70)rotate(-28)`)
      // .transition()
      // .duration(400)
      // .attr("transform", `translate(-43, 53)rotate(-26)`)
      // .transition()
      // .duration(1500)
      // .attr("transform", `translate(-40, 90)rotate(-15)`)
      // .transition()
      // .duration(400)
      // .attr("transform", `translate(-43, 40)rotate(-15)`)
      .transition()
      .duration(1000)
      .attr("transform", `translate(-40, 70)rotate(-15)`)
      .transition()
      .duration(1000)
      .attr("transform", `translate(0, 0)rotate(0)`);

    d3.select("#N")
      // .transition()
      // .delay(400)
      // .duration(100)
      // .attr("transform", "translate(-8, 13)rotate(-20)")
      // .transition()
      // .delay(1300)
      // .duration(100)
      // .attr("transform", "translate(-6, 10)rotate(-18)")
      .transition()
      .delay(400)
      .duration(100)
      .attr("transform", "translate(0, 0)rotate(0)");
  }, 5000);

  setTimeout(() => {
    setToSmall();
  }, 7000)

};

let animate = () => {
  // animateIntro();

  // setTimeout(() => {
  //   animateLogo();
  // }, 1000);

  // setTimeout(() => {
  //   animateCredit();
  // }, 3500);
  setTimeout(() => {
    animateCartoon();
  }, 500); // 5500
};

animate();
