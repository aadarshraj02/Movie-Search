const searchForm = document.querySelector("form");
const movieContainer = document.querySelector(".movie-container");
const inputBox = document.querySelector(".input-box");
const searchBtn = document.querySelector(".search-btn");

const getMovieInfo = async (movieName) => {
  try {
    const myApiKey = "689a4d85";
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movieName}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Unable to fetch movie data.");
    }
    const data = await response.json();

    showMovieData(data);
  } catch (error) {
    showError("No Movie Found!!");
  }
};

function showMovieData(data) {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("no-bg");
  const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } =
    data;

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");
  movieElement.innerHTML = `<h2>${Title}</h2>
        <p><strong>IMDB Rating: </strong>${imdbRating}</p>
    `;
  const movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add("movie-genre");
  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerHTML = element;
    movieGenreElement.appendChild(p);
  });

  movieElement.appendChild(movieGenreElement);

  movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
  <p><strong>Duration: </strong>${Runtime}</p>
  <p><strong>Cast: </strong>${Actors}</p>
  <p><strong>Plot: </strong>${Plot}</p>
  `;

  const moviePoster = document.createElement("div");
  moviePoster.classList.add("movie-poster");
  moviePoster.innerHTML = `<img src=${Poster} >`;

  movieContainer.appendChild(moviePoster);
  movieContainer.appendChild(movieElement);
}
const showError = (message) => {
  movieContainer.innerHTML = `<h2>${message}</h2>`;
};

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(inputBox.value);
  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    showError("Fetching Movie Info...");
    getMovieInfo(movieName);
  } else {
    showError("Enter Movie Name to get Details");
  }
});
