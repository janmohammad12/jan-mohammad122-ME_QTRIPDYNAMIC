import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  //adventure.id
  console.log("search : " + search);
  return new URLSearchParams(search).get("adventure");

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const response = await fetch(
      `${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`
    );
    const adventures = await response.json();
    console.log(adventures);
    return adventures;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").append(adventure.name);
  document.getElementById("adventure-subtitle").append(adventure.subtitle);

  adventure.images.forEach((image) => {
    document.getElementById("photo-gallery").innerHTML += `
      <div>
        <img class="activity-card-image" src="${image}" />
      </div>`;
  });

  document.getElementById("adventure-content").append(adventure.content);
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let carousel = `
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel" style="width:70vw;height:50vh">
  <div class="carousel-inner h-100" id="carousel-item-parent">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`;

  document.getElementById("photo-gallery").innerHTML = carousel;

  images.forEach((imageLink, index) => {
    const active = index === 0 ? " active h-100" : " h-100";
    let carouselItem = `
  <div class="carousel-item${active}">
    <img class="activity-card-image" src="${imageLink}" />
  </div>`;

    document.getElementById("carousel-item-parent").innerHTML += carouselItem;
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(Object.values(adventure.reserved));
  if (adventure.available === true) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = String(adventure.costPerHead);
  } else {
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log("adventure : " + adventure + " persons : " + persons);
  // const reservationCost =
  //   document.getElementById("reservation-person-cost").innerText * persons;
  // console.log("reservationCost : " + reservationCost);

  // document.getElementById("reservation-cost").innerText = reservationCost;
  let reservationCost = document.getElementById("reservation-cost");
  let cost = adventure.costPerHead*parseInt(persons);
  reservationCost.innerHTML=String(cost);
}

//Implementation of reservation form submission
async function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation

  let adventureForm = document.getElementById("myForm");
  adventureForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    /*  
      //Alternate way to get form data
      let name = event.target.elements.name.value;
      let date = event.target.elements.date.value;
      let person = document.getElementById("reservation-person-cost").innerText;
      let total = document.getElementById("reservation-cost").innerText;
      console.log(name + "  " +date+ "  " +person+ "  " +total);
      //alert(this.elements.searchTerm.value)
      const Obj = {
        name: name,
        date: date,
        person: person,
        adventureId : adventure.id
        };
*/
    let formElements = adventureForm.elements;
    let requestObj = {
      name: formElements["name"].value,
      date: formElements["date"].value,
      person: formElements["person"].value,
      adventure: adventure.id,
    };

    let request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestObj),
    };

    const url = `${config.backendEndpoint}/reservations/new`;
    console.log("url : " + url);
    try {
      let response = await fetch(url, request);
      // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
      if (response.ok) {
        alert("Success!");
        adventure.reserved = true;
        window.location.reload();
      } else {
        let data = await response.json();
        adventure.reserved = false;
        alert(`Failed - ${data.message}`);
      }
    } catch (error) {
      //console.log('Request failed', error);
      return null;
    }
  });
}
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved === true)
    document.getElementById("reserved-banner").style.display = "block";
  else document.getElementById("reserved-banner").style.display = "none";
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
