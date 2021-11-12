let totalCollisions = 0;
let container = d3.select("#container");

let containerHeight = parseInt(container.style("height"));
let containerWidth = parseInt(container.style("width"));

let playground = d3.select("#container").append("svg").attr("id", "playground");

let gameOver = false;
let currScore = 0;
// makes 3 squares @ every 2.5 seconds
// transitions from top to bottom
let makeObjects = () => {
  let makingObject = setInterval(() => {
    if (gameOver) clearInterval(makingObject);
    let num = Math.random() * containerWidth;
    playground.select("rect").remove();

    playground
      .append("rect")
      .attr("x", num)
      .attr("y", -100)
      .attr("class", "object")
      .attr("width", 100)
      .attr("height", 100)
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
      .transition()
      .delay(1500)
      .ease(d3.easeLinear)
      .duration(2500)
      .attr("y", parseInt(container.style("height")));
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
      objR.left > footballR.right-10 ||
      objR.right < footballR.left+10 ||
      objR.top > footballR.bottom-10 ||
      objR.bottom < footballR.top+10
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
      newGame();
      clearInterval(gameLoop);
    }
    currScore += 3;
    document.getElementById(
      "curr-score"
    ).innerHTML = `Curr score : <span> ${currScore} </span>`;
  }, 300);
};

window.addEventListener("resize", () => {
  // let containerHeight = parseInt(container.style("height"));
  containerWidth = parseInt(container.style("width"));
});

let updateMaxScore = () => {
  
  let maxS = document.getElementById("max-score");
  maxS.innerHTML = `Max score : <span> ${currScore} </span>`;
};

let newGame = () => {
  updateMaxScore();
  playground.selectAll("rect").remove();

  makeObjects();
  runGame();
};

// newGame();
