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
      <h2 class="heading-2">${title}</h2>
      <p class="category">${type}</p>
    </div> 
  `;
};

// * --------------------- Add Content For Each MovieFunction ---------------- //

// const addContentForEachMovie = (mainContainer, rating, imgsrc, title, type) => {
//   return
//   `;
// };

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

// * --------------------- Tab Switch Function ---------------- //

const tabSwitch = (currDashboard, textContent) => {
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
