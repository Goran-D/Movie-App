apiKey = "b6e69aa02c5c138d0e4e531fbfa20821";
minPage = 1;
maxPage = 500; // There are total of 500 pages in the Movie API

// Movie Class: Represents a Book Grid Item
class Movie {
  constructor(title, director, year) {
    this.title = title;
    this.director = director;
    this.year = year;
  }
}

const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const moviesEl = document.getElementById('movies');
const resultHeading = document.getElementById('result-heading');
const singleMovieEl = document.getElementById('single-movie');

// Event listeners
document.addEventListener('DOMContentLoaded', getRandomPage);
random.addEventListener('click', getRandomPage);

// Get random page for the API
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fetch random movies from the Movie API
function getRandomPage() {
  let page = getRandomInt(minPage, maxPage);
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
    .then(result => result.json())
    .then(data => {
      showMovies(data);
    });
    document.querySelector('.random-btn').blur();
}

function showMovies(data) {
  console.log(data);
  for (let i = 1; i <= 8; i++) {
    const year = (new Date(data.results[i].release_date)).getFullYear();
    const movieEl = document.getElementById(`movie-${i}`);
    movieEl.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w300${data.results[i].poster_path}"/>
        <div class="movie-info" data-movieID="${data.results[i].id}">
          <h3>${data.results[i].title}</h3>
          <h4>Release year: ${year}<h4>
          <p>Rating: ${data.results[i].vote_average}<p>
          <p>Voters: ${data.results[i].vote_count}<p>
        </div>
      `;
  }
}