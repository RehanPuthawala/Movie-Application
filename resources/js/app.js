const searchInput = document.querySelector(".header__search-input");

const dashboardMovies = document.querySelector(".dashboard__movies");
const favouriteMovies = document.querySelector(".favourite__movies");
const watchLaterMovies = document.querySelector(".watch-later__movies");
const eachMovies = document.querySelector(".eachMovie");

const mainHeading = document.querySelector(".heading-1");

let headingContent;

// * --------------------- Fetch Data Function ---------------- //

const fetchSearchedMovies = async (searchTerm) => {
  const response = await axios.get("https://www.omdbapi.com", {
    params: {
      apikey: "5cb133d8",
      s: searchTerm,
    },
  });

  return response.Response === "False" ? [] : response.data.Search;
};

// * --------------------- Show Searched Movie Function ---------------- //

const showMovie = async () => {
  const movies = await fetchSearchedMovies(searchInput.value);
  dashboardMovies.innerHTML = "";

  for (let movie of movies) {
    let imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    let dashboardRating =
      movie.Year.length <= 4
        ? `${movie.Year}`
        : movie.Year.split("-")
            .join("")
            .slice(0, movie.Year.length - 1);

    const dashboardMovie = document.createElement("div");
    addElementToDOM(dashboardMovie, "dashboard__movie");

    dashboardMovie.innerHTML += addContent(
      "dashboard",
      dashboardRating,
      imgSrc,
      movie.Title,
      movie.Type
    );
    dashboardMovies.append(dashboardMovie);
    // movieLayout(dashboardMovies);

    // Dashboard Movie => Favourite Button Add Event Listener
    favouriteMovies.innerHTML = "";
    dashboardMovie.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("dashboard__favourite") ||
        event.target.classList.contains("dashboard__icon--favourite")
      ) {
        const favouriteMovie = document.createElement("div");
        addElementToDOM(favouriteMovie, "favourite__movie");

        favouriteMovie.innerHTML += addContent(
          "favourite",
          movie.Year,
          imgSrc,
          movie.Title,
          movie.Type
        );

        favouriteMovies.append(favouriteMovie);
        movieLayout(favouriteMovies);
      }
    });

    // Dashboard Movie => Watch later Add Event Listener
    watchLaterMovies.innerHTML = "";
    dashboardMovie.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("dashboard__watch-later") ||
        event.target.classList.contains("dashboard__icon--watch-later")
      ) {
        const watchLaterMovie = document.createElement("div");
        addElementToDOM(watchLaterMovie, "watch-later__movie");

        watchLaterMovie.innerHTML += addContent(
          "watch-later",
          movie.Year,
          imgSrc,
          movie.Title,
          movie.Type
        );

        watchLaterMovies.append(watchLaterMovie);
        movieLayout(watchLaterMovies);
      }
    });

    // Dashboard Movie => View More Details Event Listener
    // eachMovies.innerHTML = "";
    dashboardMovie.addEventListener("click", async (event) => {
      if (
        event.target.classList.contains("dashboard__more-details") ||
        event.target.classList.contains("dashboard__more-details--link")
      ) {
        const movieDetails = await fetchEachMovie(movie.imdbID);

        console.log(movieDetails);
        const movieImgSrc =
          movieDetails.Poster === "N/A" ? "" : movieDetails.Poster;

        const eachMovie = document.querySelector(".eachMovie__movie");

        eachMovie.innerHTML = addContentForEachMovie(
          "eachMovie",
          movieImgSrc,
          movieDetails.Title,
          movieDetails.Type,
          movieDetails.Plot,
          movieDetails.imdbRating,
          movieDetails.Runtime
        );

        eachMovies.append(eachMovie);
        dashboardSwitch(eachMovies, movieDetails.Title);
      }
    });
  }
};

// * --------------------- Search Inut Event Listener ---------------- //

searchInput.addEventListener("input", debounceHelper(showMovie, 1000));
