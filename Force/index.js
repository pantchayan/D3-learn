let svg = d3
  .select("#canvas")
  .append("svg")
  .attr("height", "100%")
  .attr("width", "100%")
  .style("background", "#000");

let dimensions = {
  height: parseInt(svg.style("height")),
  width: parseInt(svg.style("width")),
};

let colors = ["#e44d61", "#ffdc32", "#204cee", "#54d2eb", "	#cfa5e0"];


let numNodes = 30;
let idx = 0;
let nodes = d3.range(numNodes).map(function () {
  return {
    radius: Math.random() * 12 + 7,
    color: colors[idx++ % colors.length],
  };
});

// nodes[0] = { radius: 100, color: "white" };

let checkCollision = (x, y) => {
  let circArr = document.querySelectorAll('circle')
  for(let i=0;i<circArr.length;i++){
    let circ = circArr[i]
    let cx = (circ.cx.baseVal.value)
    let cy = (circ.cy.baseVal.value)
    let a = Math.abs(x-cx);
    let b = Math.abs(y-cy);
    let r2 = (circ.r.baseVal.value)
    let d = Math.sqrt(a * a  +  b * b)
    if(d <= 30 + r2){
      alert("ZOMBIES GOT U");
      return true;
    }
  }

  return false;
}


let ticked = () => {
  
  svg.on("mousemove", function (e) {
    let os = 0.1,
      oe = 0.2,
      or = oe - os;

    let [x, y] = d3.pointer(e);
    simulation.force("x", d3.forceX(x).strength(0.1))
              .force("y", d3.forceY(y).strength(0.1));

    let flag = checkCollision(x, y);
    if(flag){
      console.log("ZOMBIES GOT U");
      return;
    }
    //   d3.select("#cursor-circle").remove();
    //   d3.select("#circle0").transition().attr("cx", x).attr("cy", y);
    // simulation
    //   .force("x", function(d) {
    //     let f = 1 / (1 + Math.abs(x - d.x));
    //     let finalForce = f * or + os;
    //     console.log(x, y, this.style('x'), finalForce)
    //     return d3.forceX(x).strength(finalForce);
    //   })
    //   .force("y", d => d3.forceY(y).strength((1 / (1 + Math.abs(y - d.y))) * or + os));
    //   // .force("y", (d) => {
    //   //   let f = 1 / (1 + Math.abs(my - d.y));
    //   //   let finalForce = f * or + os;

    //   //   return d3.forceY(my).strength(finalForce);
    //   // });
  });
  
  
  d3.select("svg")
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("id", (d, i) => `circle${i}`)
    .attr("r", (d) => d.radius)
    .attr("fill", (d) => 'red')
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    });

  
};

let simulation = d3
  .forceSimulation(nodes)
  .alphaTarget(0.3)
  .velocityDecay(0.7)
  // .force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2))
  .force("charge", d3.forceManyBody(nodes).strength(-30))
  .force(
    "collide",
    d3.forceCollide().radius((d) => d.radius)
  )
  //   .force("x", function(d) {
    //     let f = 1 / (1 + Math.abs(x - d.x));
    //     let finalForce = f * or + os;
    //     console.log(x, y, this.style('x'), finalForce)
    //     return d3.forceX(x).strength(finalForce);
    //   })
  //   .force('y', d3.forceY().strength(0.1))
  .on("tick", ticked);

window.addEventListener("resize", () => {
  d3.select("#canvas").attr("height", "100vh").attr("width", "100vw");
  svg.attr("height", "100%").attr("width", "100%");
  dimensions = {
    height: parseInt(svg.style("height")),
    width: parseInt(svg.style("width")),
  };
});
