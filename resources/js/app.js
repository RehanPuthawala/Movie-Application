const searchInput = document.querySelector(".header__search-input");
const dashboardMovies = document.querySelector(".dashboard__movies");
const favouriteMovies = document.querySelector(".favourite__movies");
const watchLaterMovies = document.querySelector(".watch-later__movies");
const mainHeading = document.querySelector(".heading-1");

let headingContent;
// * ---------------------All Tab Add Event Listener ---------------- //

const allTab = document.querySelectorAll(".navigation__item");

const homeTab = document.querySelector(".home");
const trendingTab = document.querySelector(".trending");
const comingSoonTab = document.querySelector(".comingSoon");
const favouriteTab = document.querySelector(".favourites");
const watchLaterTab = document.querySelector(".watchLater");

allTab.forEach((tab) => {
  tab.addEventListener("click", () => {
    allTab.forEach((tab) => {
      tab.classList.remove("navigation__item--active");
    });
    tab.classList.add("navigation__item--active");
  });
});

// * --------------------- Fetch Data Function ---------------- //

const fetchSearchedMovies = async (searchTerm) => {
  const response = await axios.get("http://www.omdbapi.com", {
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
    movieLayout(dashboardMovies);

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
  }
};

// * --------------------- Favourite Tab  Event Listener ---------------- //

watchLaterTab.addEventListener("click", () => {
  tabSwitch(watchLaterMovies, "Watch Later");
});

// * --------------------- watchLater Tab  Event Listener ---------------- //

favouriteTab.addEventListener("click", () => {
  tabSwitch(favouriteMovies, "Your Favourite Movies");
});

// * --------------------- Home Tab  Event Listener ---------------- //
homeTab.addEventListener("click", () => {
  tabSwitch(dashboardMovies);
});

// * --------------------- Search Inut Event Listener ---------------- //

searchInput.addEventListener("input", debounceHelper(showMovie, 1000));
