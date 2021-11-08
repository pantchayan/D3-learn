const width = 900;
const height = 600;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const projection = d3
  .geoGnomonic()
  .scale(200)
  .translate([width / 2, height / 2]);

const geoPath = d3.geoPath(projection);

const g = svg.append("g");
let jsonData;
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(
  (data) => {
    jsonData = data;
    console.log(jsonData)
window.setInterval(update(jsonData), 1000);
  });

let yaw = 300;
let update = (data) => {

    console.log("Here");
    projection.rotate([yaw, - 45])

  let countries = topojson.feature(data, data.objects.countries);

  g.selectAll("path")
    .data(countries.features)
    .enter()
    .append("path")
    .attr("class", "country")
    .attr("d", geoPath)
    .attr("fill", "#ccc")
    .attr("stroke", "black");
    yaw -= 0.2;



        // update(data);
};

