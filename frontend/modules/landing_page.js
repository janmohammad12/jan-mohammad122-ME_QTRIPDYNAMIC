import config from "../conf/index.js";

async function init() {
  console.log("From init()");
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  
  try {
    const response = await fetch(`${config.backendEndpoint}/cities`);
    const cities = await response.json();
    return cities;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  let element = document.createElement("div");
  element.className = "grid-column col-12 col-sm-6 col-lg-3 mb-4";
  element.innerHTML = `
          <a href="pages/adventures/?city=${id}" id="${id}">
            <div class="tile">
            <img class="img-responsive" src="${image}" />
                <div class="tile-text text-center">
                  <h5>${city}</h5>
                  <p>${description}</p>
                </div>
              </div>
          </a>`;

  document.getElementById("data").appendChild(element);
}

export { init, fetchCities, addCityToDOM };
