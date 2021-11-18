let svg = d3.select(".canvas").append("svg");

let render = (movies) => {
  // LODASH CHAIN FUNCTION

  let maxVotes = -1;
  let maxRating = -1;
  movies = _.chain(movies)
    .map(function (movie) {
      movie.year = parseInt(movie.Year);
      movie.genres = movie.Genre.split(", ");
      movie.rating = parseFloat(movie.imdbRating);
      movie.votes = parseInt(movie.imdbVotes.replace(/\,/g, ""));

      maxVotes = maxVotes < movie.votes ? movie.votes : maxVotes;
      maxRating = maxRating < movie.rating ? movie.rating : maxRating;
      return movie;
    })
    .sortBy(function (movie) {
      return -movie.year;
    })
    .value();

  console.log(movies);

  console.log(maxRating, maxVotes);

  movies.map((movie) => {
    let g = svg.append('g')
    
  });
};

d3.json("data.json").then(async (data) => {
  render(data);
});
