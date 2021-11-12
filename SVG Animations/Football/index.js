let totalCollisions = 0;
let container = d3.select("#container");

let containerHeight = parseInt(container.style("height"));
let containerWidth = parseInt(container.style("width"));

let playground = d3.select("#container").append("svg").attr("id", "playground");

let gameOver = false;
let currScore = 0;

let addGraphics = () => {
  playground
    .style("background", "#68d854")
    .attr("height", `${container.style("height")}`)
    .attr("width", `${container.style("width")}`);

  playground.selectAll(".rect").remove();

  playground
    .append("rect")
    .attr("id", "startPoint")
    .attr("class", "grass")
    .attr("stroke-width", "0.5em")
    .attr("stroke", "white")
    .attr("y", 0)
    .attr("height", `${parseInt(container.style("height"))}`)
    .attr("width", `${container.style("width")}`)
    .attr("fill", "#50a946");

};

let runGraphics = () => {
  
  d3.select("#startPoint")
    .transition()
    .duration(4000)
    .attr("y", `${parseInt(container.style("height")) + 10}`);
    
  let g = playground.append("g");
  let runningGraphics = setInterval(() => {
    if (gameOver) clearInterval(runningGraphics);

    g.select("#grass").remove();
    g.append("rect")
      .attr("id", "grass")
      .attr("class", "grass")
      .style("z-index", -100)
      .attr("y", `${(-1 * parseInt(container.style("height"))) / 3}`)
      .attr("height", `${parseInt(container.style("height")) / 3}`)
      .attr("width", `${container.style("width")}`)
      .attr("fill", "#50a946")
      .transition()
      .ease(d3.easeLinear)
      .duration(2500)
      .attr("y", `${parseInt(container.style("height"))}`);
    if (gameOver) setFresh();
  }, 2700);
};

// makes 3 squares @ every 2.5 seconds
// transitions from top to bottom
let makeObjects = () => {
  let colors = ['#e44d61', '#ffdc32', '#204cee', '#54d2eb', '	#cfa5e0'];
  let idx = 0;
  let makingObject = setInterval(() => {
    for (let i = 0; i < document.querySelectorAll(".object").length - 6; i++) {
      playground.select(".object").remove();
    }
    if (gameOver) clearInterval(makingObject);
    let num = Math.random() * (containerWidth - 100);
    // playground.select(".object").remove();

    playground
      .append("rect")
      .attr("x", num)
      .attr("y", -100)
      .attr("class", "object")
      .attr("width", 100)
      .attr("height", 100)
      .attr('fill', colors[(idx++)%colors.length])
      .transition()
      .ease(d3.easeLinear)
      .duration(2500)
      .attr("y", parseInt(container.style("height")));

    // playground.select("rect").remove();

    num = Math.random() * containerWidth;
    playground
      .append("rect")
      .attr("x", num)
      .attr("y", -100)
      .attr("class", "object")
      .attr("width", 100)
      .attr("height", 100)
      .attr('fill', colors[(idx++)%colors.length])
      .transition()
      .delay(700)
      .ease(d3.easeLinear)
      .duration(2500)
      .attr("y", parseInt(container.style("height")));

    num = Math.random() * containerWidth;
    playground
      .append("rect")
      .attr("x", num)
      .attr("y", -100)
      .attr("class", "object")
      .attr("width", 100)
      .attr("height", 100)
      .attr('fill', colors[(idx++)%colors.length])
      .transition()
      .delay(1500)
      .ease(d3.easeLinear)
      .duration(2500)
      .attr("y", parseInt(container.style("height")));

    if (gameOver) setFresh();
  }, 2500);
};

// checks collision between ball and objects on playground
// returns true if collision occurs
let checkCollision = () => {
  let footballSVG = document.querySelector("#football>svg");
  let objectsSVG = document.querySelectorAll(".object");

  let footballR = footballSVG.getBoundingClientRect();
  let flag = false;
  for (let i = 0; i < objectsSVG.length; i++) {
    let objR = objectsSVG[i].getBoundingClientRect();
    flag = !(
      objR.left > footballR.right - 10 ||
      objR.right < footballR.left + 10 ||
      objR.top > footballR.bottom - 10 ||
      objR.bottom < footballR.top + 10
    );

    if (flag) {
      break;
    }
  }

  return flag;
};

// checks if a collision occurs at every 0.01 second.
let runGame = () => {
  let gameLoop = setInterval(() => {
    // flag == true if collision occurs
    gameOver = checkCollision();
    if (gameOver) {
      console.log(`Collision detected`);
      alert("GAME OVER");
      clearInterval(gameLoop);
      // newGame();
    }
    currScore += 3;
    document.getElementById(
      "curr-score"
    ).innerHTML = `Curr score : <span> ${currScore} </span>`;
    if (gameOver) setFresh();
  }, 500);
};

let updateMaxScore = () => {
  let myStorage = window.localStorage;
  let maxScore = { score: 0 };
  if (myStorage.getItem("ballGame") != null) {
    maxScore = JSON.parse(myStorage.getItem("ballGame"));
    if (currScore > maxScore.score) {
      maxScore.score = currScore;
    }
  }
  myStorage.setItem("ballGame", JSON.stringify(maxScore));

  let maxS = document.getElementById("max-score");
  maxS.innerHTML = `Max score : <span> ${maxScore.score} </span>`;
};

let newGame = () => {
  currScore = 0;
  updateMaxScore();
  playground.selectAll("rect").remove();
  makeObjects();
  runGame();
  runGraphics();
};

window.addEventListener("resize", () => {
  containerHeight = parseInt(container.style("height"));
  containerWidth = parseInt(container.style("width"));
  addGraphics();
});

document.getElementById("click-here").addEventListener("click", (e) => {
  document.getElementById("click-here").setAttribute("style", "display:none;");
  newGame();
});

let refresh = () => {
  container
    .append("g")
    .append("rect")
    .attr("id", "refresh-rect")
    .attr("class", "refresh")
    .attr("stroke-width", "0.5em")
    .attr("stroke", "white")
    .attr("y", 0)
    .attr("height", `${parseInt(container.style("height"))}`)
    .attr("width", `${container.style("width")}`)
    .attr("fill", "#000")
    .transition()
    .duration(2500)
    .attr("y", `${parseInt(container.style("height"))}`);
};

let setFresh = () => {
  updateMaxScore();
  // refresh();
  document.getElementById(
    "curr-score"
  ).innerHTML = `Curr score : <span> ${0} </span>`;

  document
    .getElementById("click-here")
    .setAttribute("style", "display:absolute;");
  addGraphics();
};

setFresh();
