import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    console.log(`url : ${config.backendEndpoint}/reservations/`);
    const response = await fetch(
      `${config.backendEndpoint}/reservations/`
    );
    //console.log("response : "+response);
    const reservations = await response.json();
    //console.log("reservations : " + reservations);
    return reservations;
  } catch (error) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
// function addReservationToTable(reservations) {
//   // TODO: MODULE_RESERVATIONS
//   // 1. Add the Reservations to the HTML DOM so that they show up in the table
//     //console.log("reservations : " +JSON.stringify(reservations));
//     //reservations = [];
//     //console.log("reservations : " +reservations);

//     if (Object.keys(reservations).length === 0) {
//       document.getElementById("reservation-table-parent").style.display = "none";
//       document.getElementById("no-reservation-banner").style.display = "block";
//     } else {
//       document.getElementById("reservation-table-parent").style.display = "block";
//       document.getElementById("no-reservation-banner").style.display = "none";
//     }

//     let tableRow = document.getElementById("reservation-table");
//     //let tableData = JSON.stringify(reservations);
//     //console.log("tableData : " + tableData);

//     reservations.forEach(element => {
//       let row = document.createElement("tr");
//       let transactionId = document.createElement("td");
//       let BookingName =  document.createElement("td");
//       let adventureId = document.createElement("td");
//       let person =  document.createElement("td");
//       let date = document.createElement("td");
//       let price =  document.createElement("td");
//       let bookingTime = document.createElement("td");
//       let action =  document.createElement("td");

//       console.log(element)

//       let tableRowData = Object.values(element);
//       console.log(tableRowData);
//       //console.log("element.id : " +element.id);

//       transactionId.append(tableRowData[6]);
//       BookingName.append(tableRowData[4]);
//       adventureId.append(tableRowData[3]);
//       person.append(tableRowData[2]);
//       date.append(new Date(tableRowData[1]).toLocaleDateString("en-IN"));
//       price.append(tableRowData[5]);
//       bookingTime.append(new Date(tableRowData[7]).toLocaleDateString("en-IN", {
//         year : "numeric",
//         day : "numeric",
//         month : "long",
//       }) + ", " + new Date(tableRowData[7]).toLocaleTimeString("en-IN"));
//       let url = "/detail/?adventure=" + element.adventure;
//       console.log("url : " +url);
//       //console.log("window.location.pathname : " +window.location.pathname);
//       action.innerHTML =  `<a href=${url}>
//                               <button class="reservation-visit-button">Visit Advendure</button>
//                            </a> `
//       //action.innerHTML = `<button class="reservation-visit-button" onclick =${url} >Visit Advendure</a>`;

//       row.appendChild(transactionId);
//       row.appendChild(BookingName);
//       row.appendChild(adventureId);
//       row.appendChild(person);
//       row.appendChild(date);
//       row.appendChild(price);
//       row.appendChild(bookingTime);
//       row.appendChild(action);
    
//       tableRow.appendChild(row);


//     });

//   //Conditionally render the no-reservation-banner and reservation-table-parent

//   /*
//     Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
//     The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

//     Note:
//     1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
//     2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
//   */

// }

function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  if (reservations.length != 0) {
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";

    reservations.forEach((element) => {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };

      const date = new Date(element.date);
      const formattedDate = date.toLocaleDateString("en-IN");

      const time = new Date(element.time);
      const formattedTime = time.toLocaleDateString("en-IN", options).replace(' at ', ', ');;

      const table = document.getElementById("reservation-table");
      const row = document.createElement("tr");

      row.innerHTML = `
    <th>${element.id}</th>
    <th>${element.name}</th>
    <th>${element.adventureName}</th>
    <th>${element.person}</th>
    <th>${formattedDate}</th>
    <th>${element.price}</th>
    <th>${formattedTime}</th>
    <th><div class="reservation-visit-button" id=${element.id}><a href="../detail/?adventure=${element.adventure}"  >Visit Adventure</a></div></th>`;

      table.append(row);
    });
  }

  // if (reservations.length == 0) {
  //   document.getElementById("no-reservation-banner").style.display = "block";
  //   document.getElementById("reservation-table-parent").style.display = "none";
  // }
//Conditionally render the no-reservation-banner and reservation-table-parent
    if (Object.keys(reservations).length === 0) {
      document.getElementById("reservation-table-parent").style.display = "none";
      document.getElementById("no-reservation-banner").style.display = "block";
    } else {
      document.getElementById("reservation-table-parent").style.display = "block";
      document.getElementById("no-reservation-banner").style.display = "none";
    }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}


export { fetchReservations, addReservationToTable };
