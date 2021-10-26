const innerHeight = window.innerHeight;
const innerWidth = window.innerWidth
const canvas = d3.select(".canvas");

const svg = canvas.append("svg").attr("width", "1040").attr("height", "750");


const watchGroup = svg.append("g").attr("width", "innerWidth").attr("height", "innerHeight");

let digits = [
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 0, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
];

const squareData = {
  height: 45,
  width: 45,
  color: "deepskyblue",
  margin: 5,
  x: 0,
  y: 0,
};

// generating cells data -> just 1 digit
let getCellsData = (d) => {
  const cellsData = [];
  let countC = 0;
  let countR = 0;
  // filling default cells data
  for (let i = 0; i < 7; i++) {
    countR = 0;
    for (let j = 0; j < 3; j++) {
      let cellData = {};
      cellData.height = squareData.height;
      cellData.width = squareData.width;

      if (j == 1 && i != 0 && i != 3 && i != 6) cellData.color = "black";
      else cellData.color = squareData.color;

      cellData.margin = squareData.margin;

      let margin = squareData.width / 15;
      cellData.x = j * squareData.width + margin * countR + d;
      cellData.y = i * squareData.height + margin * countC;

      cellsData.push(cellData);
      countR++;
    }
    countC++;
  }

  return cellsData;
};

// generating digits data -> all 6 digits
const digitsData = [];
let gap = 0;
for (let i = 0; i < 6; i++) {
  if (i == 2) {
    gap += (squareData.width);
  } else if (i == 4) {
    gap += (squareData.width);
  }
  let cellsData = getCellsData(i * (squareData.width * 3 + (squareData.width/2)) + gap);
  digitsData.push(cellsData);
}

// creating cells - > (virtually created by d3)
let dCells = [];

// let digits
for (let i = 0; i < 6; i++) {
  let digit = digitsData[i];
  dCells.push(svg.selectAll("rect").data(digit));
}

// console.log(dCells);

// render function
let render = () => {
  for (let i = 0; i < 6; i++) {
    dCells[i]
      .enter()
      .append("rect")
      .data(digitsData[i])
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .attr("fill", (d) => d.color)
      .attr("stroke", "black")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("margin", (d) => d.margin)
    //   .transition()
    //   .attr("transform", "translate(" + x(-1) + ",0)")
    //   .duration(300);
  }
};

let updateCells = (cellsData, d) => {
  for (let i = 0; i < cellsData.length; i++) {
    let r = Math.floor(i / 3);
    let c = i % 3;
    // console.log(r, c);
    if (digits[d][r][c] == 0) {
      cellsData[i].color = "black";
    }
    if (digits[d][r][c] == 1) {
      cellsData[i].color = "deepskyblue";
    }
  }
};// const square = svg.append('rect')

// updating cells according to hour minute and second
let updateDigits = (h, m, s) => {
  updateCells(digitsData[0], Math.floor(h / 10));
  updateCells(digitsData[1], Math.floor(h % 10));
  updateCells(digitsData[2], Math.floor(m / 10));
  updateCells(digitsData[3], Math.floor(m % 10));
  updateCells(digitsData[4], Math.floor(s / 10));
  updateCells(digitsData[5], s % 10);
  render();
};

setInterval(function () {
  var now = new Date();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  updateDigits(h % 12, m, s);
}, 1000);

// console.log(dCells);

render();
