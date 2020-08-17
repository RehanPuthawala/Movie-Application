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

// * --------------------- Favourite Tab  Event Listener ---------------- //

watchLaterTab.addEventListener("click", () => {
  dashboardSwitch(watchLaterMovies, "Watch Later");
});

// * --------------------- watchLater Tab  Event Listener ---------------- //

favouriteTab.addEventListener("click", () => {
  dashboardSwitch(favouriteMovies, "Your Favourite Movies");
});

// * --------------------- Home Tab  Event Listener ---------------- //
homeTab.addEventListener("click", () => {
  dashboardSwitch(dashboardMovies);
});
