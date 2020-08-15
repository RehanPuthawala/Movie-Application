const searchInput = document.querySelector(".header__search-input");
const dashboardMovies = document.querySelector(".dashboard__movies");
const favouriteMovies = document.querySelector(".favourite__movies");
const mainHeading = document.querySelector(".heading-1");

// * ---------------------All Tab Add Event Listener ---------------- //

const allTab = document.querySelectorAll(".navigation__item");

const newReleasesTab = document.querySelector(".newReleases");
const trendingTab = document.querySelector(".trending");
const comingSoon = document.querySelector(".comingSoon");
const favouriteTab = document.querySelector(".favourites");
const watchLater = document.querySelector(".watchLater");

allTab.forEach((tab) => {
  tab.addEventListener("click", () => {
    allTab.forEach((tab) => {
      tab.classList.remove("navigation__item--active");
      console.log(tab.classList[1]);
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

    // Dashboard Movie => Favourite Button Add Event Listener
    favouriteMovies.innerHTML = "";
    dashboardMovie.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("dashboard__favourite") ||
        event.target.classList.contains("dashboard__icon--favourite")
      ) {
        console.log(favouriteMovies.children[favouriteMovies.children.length]);
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
      }
    });
  }
};

// * --------------------- Favourite Tab  Event Listener ---------------- //

favouriteTab.addEventListener("click", () => {
  dashboardMovies.classList.add("dashboard__movies--hidden");
  favouriteMovies.classList.remove("favourite__movies--hidden");
  favouriteMovies.classList.add("favourite__movies--visible");
  mainHeading.textContent = "Your Favourite Movies";
});

// * --------------------- New Releases  Event Listener ---------------- //
newReleasesTab.addEventListener("click", () => {
  dashboardMovies.classList.add("dashboard__movies--visible");
  dashboardMovies.classList.remove("dashboard__movies--hidden");
  favouriteMovies.classList.remove("favourite__movies--visible");
  favouriteMovies.classList.add("favourite__movies--hidden");
  mainHeading.textContent = "New Releases";
});

// * --------------------- Search Inut Event Listener ---------------- //

searchInput.addEventListener("input", debounceHelper(showMovie, 1000));
