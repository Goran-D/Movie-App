apiKey = "b6e69aa02c5c138d0e4e531fbfa20821";
minPage = 1;
maxPage = 500; // There are total of 500 pages in the Movie API

const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const moviesEl = document.getElementById('movies');
const resultHeading = document.getElementById('result-heading');
const singleMovieEl = document.getElementById('single-movie');

// Event listeners
document.addEventListener('DOMContentLoaded', showRandomMovies);
random.addEventListener('click', showRandomMovies);

// Get random page for the API
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fetch random movies from the Movie API
function showRandomMovies() {
  let page = getRandomInt(minPage, maxPage);
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
    .then(result => result.json())
    .then(data => {
      console.log(data);
    });
}