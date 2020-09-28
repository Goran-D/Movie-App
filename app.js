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
document.addEventListener('DOMContentLoaded', getRandomPage);
random.addEventListener('click', getRandomPage);
submit.addEventListener('submit', searchMovie);

moviesEl.addEventListener('click', e => {
  const movieInfo = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('movie-info');
    } else {
      return false;
    }
  });

  if (movieInfo) {
    const movieID = movieInfo.getAttribute('data-movieID');
    getMovieById(movieID);
  }
})

// Get random page for the API
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fetch random movies from the Movie API
function getRandomPage() {
  // Clear single movie element
  singleMovieEl.innerHTML = '';

  let page = getRandomInt(minPage, maxPage);
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`)
    .then(result => result.json())
    .then(data => {
      showMovies(data);
    });
    // document.querySelector('.random-btn').blur();
}

// function showRandomMovies(data) {
//   console.log(data);
//   for (let i = 1; i <= 8; i++) {
//     const year = (new Date(data.results[i].release_date)).getFullYear();
//     const movieEl = document.getElementById(`movie-${i}`);
//     movieEl.innerHTML = `
//         <img src="https://image.tmdb.org/t/p/w300${data.results[i].poster_path}"/>
//         <div class="movie-info" data-movieID="${data.results[i].id}">
//           <h3>${data.results[i].title}</h3>
//           <h4>Release year: ${year}<h4>
//           <p>Rating: ${data.results[i].vote_average}<p>
//           <p>Voters: ${data.results[i].vote_count}<p>
//         </div>
//       `;
//   }
// }

function showMovies(data) {
  moviesEl.innerHTML = data.results
            .map(
              movie => `
            <div class="movie" id="${movie.id}">
              <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" onerror="this.src='img/image_not_found.png';" />
              <div class="movie-info" data-movieID="${movie.id}">
                <h3>${movie.title}</h3>
                <h4>Release year: ${new Date(movie.release_date).getFullYear()}<h4>
                <p>Rating: ${movie.vote_average}<p>
                <p>Voters: ${movie.vote_count}<p>
              </div>
            </div>
          `
            )
            .join('');
}

// Search for specific movie 
function searchMovie(e) {
  e.preventDefault();

  // Clear single movie element
  singleMovieEl.innerHTML = '';

  // Get the movie title
  const title = search.value;

  // Check that searched value is not empty
  if (title.trim()) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${title}&page=1&include_adult=false`)
      .then(result => result.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${title}':</h2>`

        showMovies(data);
        // moviesEl.innerHTML = data.results
        //     .map(
        //       movie => `
        //     <div class="movie" id="${movie.id}">
        //       <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}"/>
        //       <div class="movie-info" data-movieID="${movie.id}">
        //         <h3>${movie.title}</h3>
        //         <h4>Release year: ${new Date(movie.release_date).getFullYear()}<h4>
        //         <p>Rating: ${movie.vote_average}<p>
        //         <p>Voters: ${movie.vote_count}<p>
        //       </div>
        //     </div>
        //   `
        //     )
        //     .join('');
      });
      // Clear search text
      search.value = '';
  } else {
    alert('Please enter a search term!')
  }
}

// Fetch movie by ID
function getMovieById(movieID) {
  fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      addMovieToDOM(data);
    });
}

// Add meal to DOM
function addMovieToDOM(data) {

  singleMovieEl.innerHTML = `
    <div class="single-movie">
      <h1>${data.title}</h1>
      <img src="https://image.tmdb.org/t/p/w300${data.poster_path}" onerror="this.src='img/image_not_found.png';" />
      <p>Runtime: ${data.runtime} min</p>
      <p>Release date: ${data.release_date}</p>
      <p>Genres: ${data.genres.map(genre => genre.name).join(', ')}</p>
      <h2>Synopsis:</h2>
      <p>${data.overview}</p>
      <p>Average vote: ${data.vote_average}</p>
      <p>Number of votes: ${data.vote_count}</p>
    </div>
  `;
  document.getElementById('single-movie').scrollIntoView({ behavior: 'smooth', block: 'start'});
}