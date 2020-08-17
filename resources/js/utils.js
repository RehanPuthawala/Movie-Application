// * --------------------- Add Element To DOM Function ---------------- //

const addElementToDOM = (
  variableName,
  className,
  attributeName,
  attributeValue,
  innerHTML
) => {
  if (className) {
    variableName.classList.add(className);
  }

  if (attributeName) {
    variableName.attributeName = attributeValue;
  }

  if (innerHTML) {
    variableName.innerHTML = innerHTML;
  }
};

// * --------------------- Add Content Function ---------------- //

const addContent = (mainContainer, year, imgsrc, title, type) => {
  return `<p class="${mainContainer}__year">${year}</p>
    <div class="${mainContainer}__img-box">
        <img
          src="${imgsrc}"
          alt="First Movie Image"
          class="${mainContainer}__img"
        />
        <div class="${mainContainer}__overlay">
          <div class="${mainContainer}__preference-box">
            <div class="${mainContainer}__favourite">
              <i class="fa fa-heart ${mainContainer}__icon ${mainContainer}__icon--favourite" aria-hidden="true"></i>
            </div>
            <div class="${mainContainer}__watch-later">
              <i class="fa fa-clock-o ${mainContainer}__icon ${mainContainer}__icon--watch-later" aria-hidden="true"></i>
            </div>
          </div>
          <div class="${mainContainer}__more-details">
            <a class="${mainContainer}__more-details--link">View More Details &rarr;</a>
          </div>
        </div>
      </div>
      <div class="${mainContainer}__information-box">
      <h2 class="heading-3">${title}</h2>
      <p class="category">${type}</p>
    </div> 
  `;
};

// * --------------------- Add Content For Each MovieFunction ---------------- //

const addContentForEachMovie = (
  mainContainer,
  imgsrc,
  title,
  type,
  description,
  rating,
  length
) => {
  return `
  
    <div class="${mainContainer}__img-box">
      <img src="${imgsrc}" alt="Movie Image" class="${mainContainer}__img">
    </div>
    <div class="${mainContainer}__content-box">
      <h2 class="heading-2 u-margin-bt-very-small">${title}</h2>
      <div class="${mainContainer}__minor-details-box u-margin-bt-small">
        <span class="${mainContainer}__time">${length}</span>
        <span class="${mainContainer}__category">${type}</span>
      </div>
      <div class="${mainContainer}__rating-box">
        <p class="${mainContainer}__rating">${rating} / 10</p>
      </div>
      <div class="${mainContainer}__description-box">
        <p class="${mainContainer}__description">
          ${description}
        </p>
      </div>
    </div>
  `;
};

// * --------------------- Debounce Helper Function ---------------- //

let timeOutId;
const debounceHelper = (func, delay) => {
  return () => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      func();
    }, delay);
  };
};

// * --------------------- Dashboard Switch Function ---------------- //

const dashboardSwitch = (currDashboard, textContent) => {
  let allDashboard = document.querySelectorAll(".dashboard > .visible");
  allDashboard.forEach((dashboard) => {
    dashboard.classList.remove("visible");
    dashboard.classList.add("hidden");
  });
  currDashboard.classList.remove("hidden");
  currDashboard.classList.add("visible");
  mainHeading.textContent = `${textContent}`;
};

// * --------------------- Layout function ---------------- //

const movieLayout = (currDashboard) => {
  if (currDashboard.children.length <= 2) {
    currDashboard.style.gridTemplateColumns = "25rem 25rem";
  } else {
    currDashboard.style.gridTemplateColumns =
      " repeat(auto-fit, minmax(25rem, 1fr))";
  }
};

// * --------------------- Fetch Each Movie ---------------- //

const fetchEachMovie = async (movieID) => {
  const response = await axios.get("https://www.omdbapi.com", {
    params: {
      apikey: "5cb133d8",
      i: movieID,
    },
  });

  return response.Response === "true" ? [] : response.data;
};
