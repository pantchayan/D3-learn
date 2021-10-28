let count = 1 + 15,
  durationTime = 2000 / count,
  array = d3.shuffle(d3.range(1, count)),
  unsortedArray = [...array],
  sortedArray = [],
  stop = false,
  steps = 0,
  bogoShuffles = 0;

let margin = { top: 40, right: 40, bottom: 180, left: 40 },
  width = 960 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;

let barWidth = width / count;


let txtInput = document.querySelector("#countInput");

let newArr = () => {
  if (Number(txtInput.value) != 0) {
    count = Number(txtInput.value) + 1;
    array = d3.shuffle(d3.range(1, count));
    durationTime = 2000/count;
    unsortedArray = [...array];
    barWidth = width / count;
    // console.log("here");
    update();
  }
};


let x = d3.scaleLinear().domain([0, count]).range([0, width]);

let svg = d3
  .select("body")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let rects = svg
  .append("g")
  .attr("transform", "translate(" + barWidth + ",2)")
  .selectAll("rect")
  .data(unsortedArray)
  .enter()
  .append("rect");

let labels = svg.selectAll("text").data(unsortedArray).enter().append("text");

let y = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(array, (d) => d)]);

labels
  .attr("id", function (d) {
    return "text" + d;
  })
  .attr("transform", function (d, i) {
    return (
      "translate(" + (x(i) + (barWidth / 2 - 10)) + "," + (height + 20) + ")"
    );
  })
  .html(function (d) {
    return d;
  });

rects
  .attr("id", function (d) {
    return "rect" + d;
  })
  .attr("transform", function (d, i) {
    return "translate(" + (x(i) - barWidth) + ",0)";
  })
  .attr("width", barWidth * 0.9)
  .attr("height", (d) => 0)
  .attr("y", (d) => height)
  .transition()
  .duration(1000)
  .attr("height", (d) => height - y(d))
  .attr("y", (d) => y(d));

// function to re arrange the values in array
function reset() {
  unsortedArray = [...array];
  sortedArray = [];
  stop = false;

  d3.select("#counter").html((steps = 0));

  labels
    .attr("class", "")
    .transition()
    .duration(2000)
    .attr("transform", function (d, i) {
      return (
        "translate(" + (x(i) + (barWidth / 2 - 10)) + "," + (height + 20) + ")"
      );
    });

  rects
    .attr("class", "")
    .transition()
    .duration(2000)
    .attr("transform", function (d, i) {
      return "translate(" + x(i - 1) + ", 0)";
    });
}

// function to update the rects
function update() {
  // Step 1 := Updating scales that rely on the data
  x = d3.scaleLinear().domain([0, count]).range([0, width]);
  y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([0, d3.max(array, (d) => d)]);

  // Joining updated data to elements
  // updating rects
  rects.exit().remove();
  rects = svg
    .append("g")
    .attr("transform", "translate(" + barWidth + ",2)")
    .selectAll("rect")
    .data(unsortedArray)
    .enter()
    .append("rect");

  rects
    .attr("id", function (d) {
      return "rect" + d;
    })
    .attr("transform", function (d, i) {
      return "translate(" + (x(i) - barWidth) + ",0)";
    })
    .attr("width", barWidth * 0.9)
    .attr("height", (d) => 0)
    .attr("y", (d) => height)
    .transition()
    .duration(1000)
    .attr("height", (d) => height - y(d))
    .attr("y", (d) => y(d));

  // updating labels
  labels.exit().remove();
  labels = svg.selectAll("text").data(unsortedArray).enter().append("text");
  labels
  .attr("id", function (d) {
    return "text" + d;
  })
  .attr("transform", function (d, i) {
    return (
      "translate(" + (x(i) + (barWidth / 2 - 10)) + "," + (height + 20) + ")"
    );
  })
  .html(function (d) {
    return d;
  });

  console.log(array);
  reset();
}

// recursive bubble sort algorithm
function bubbleSort() {
  let sortedCount = 0;

  function sortPass(i) {
    if (!unsortedArray.length || stop) return (stop = false);

    if (i <= unsortedArray.length) {
      if (unsortedArray[i] < unsortedArray[i - 1]) {
        d3.select("#rect" + unsortedArray[i]).attr("class", "testing");
        d3.select("#rect" + unsortedArray[i - 1]).attr("class", "testing");

        d3.timeout(function () {
          d3.select("#rect" + unsortedArray[i]).attr("class", "");
          d3.select("#rect" + unsortedArray[i - 1]).attr("class", "");
        }, durationTime);

        let temp = unsortedArray[i - 1];
        unsortedArray[i - 1] = unsortedArray[i];
        unsortedArray[i] = temp;

        slide(unsortedArray[i], i + sortedArray);
        slide(unsortedArray[i - 1], i - 1 + sortedArray);

        d3.select("#counter").html(++steps);

        d3.timeout(function () {
          return sortPass(++i);
        }, durationTime);
      } else if (i == unsortedArray.length) {
        for (n = i; n == unsortedArray[n - 1]; n--) {
          d3.select("#text" + n).attr("class", "sorted");
          unsortedArray.pop();
        }

        sortPass(++i);
      } else {
        sortPass(++i);
      }
    } else {
      bubbleSort();
    }
  }
  sortPass(1);
}

// For swapping rects to relative ith position
function slide(d, i) {
  d3.select("#text" + d)
    .transition()
    .duration(durationTime)
    .attr("transform", function (d) {
      return (
        "translate(" + (x(i) + (barWidth / 2 - 10)) + "," + (height + 20) + ")"
      );
    });

  d3.select("#rect" + d)
    .transition()
    .duration(durationTime)
    .attr("transform", function (d) {
      return "translate(" + x(i - 1) + ", 0)";
    });
}
