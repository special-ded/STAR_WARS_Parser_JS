let header = document.querySelector(".planets__table--head")
let table = document.querySelector(".planets__table");
let swAllPlanetsObj
let allPlanetsArr
let residents = []
let residentsURLs = []
let swAllResidentsReq
let residentObj
let resObj = {}

// // GET PLANET DATA FROM API
fetch("https://swapi.dev/api/planets")
  .then(response => response.json())
  .then(data => swAllPlanetsObj = data)
  .then(swAllPlanetsObj => allPlanetsArr = swAllPlanetsObj.results)
  .then(() => console.log(allPlanetsArr))
  .then(() => createContentOfTable())

function createContentOfTable() {
  for (let i = 0; i < allPlanetsArr.length; i++) {
    // CREATE TABLE CONTENT
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell5.classList.add(`residentLine${i}`);
    cell1.innerHTML = allPlanetsArr[i].name;
    cell2.innerHTML = allPlanetsArr[i].rotation_period;
    cell3.innerHTML = allPlanetsArr[i].diameter;
    cell4.innerHTML = allPlanetsArr[i].population;
    cell5.innerHTML = "LOADING..."

    residentsURLs.push(allPlanetsArr[i].residents)
  }
  createHeaderOfTable()
  checkForResidentsOnPlanet()
}

// CREATE TABLE HEAD ====
function createHeaderOfTable() {
  let tHRow = header.insertRow(-1);
  // Insert a new cell (<td>) at the first position of the "new" <tr> element:
  let hcell = tHRow.insertCell(0);
  let hcell1 = tHRow.insertCell(1);
  let hcell2 = tHRow.insertCell(2);
  let hcell3 = tHRow.insertCell(3);
  let hcell4 = tHRow.insertCell(4);

  /// KEY OF OBJECT FOR HEADER NAME
  let keyOfObject = Object.keys(allPlanetsArr[0])
  // Add some text in the new cell:
  hcell.innerHTML = keyOfObject[0].toUpperCase();
  hcell1.innerHTML = keyOfObject[1].toUpperCase();
  hcell2.innerHTML = keyOfObject[3].toUpperCase();
  hcell3.innerHTML = keyOfObject[8].toUpperCase();
  hcell4.innerHTML = keyOfObject[9].toUpperCase();
}

function checkForResidentsOnPlanet() {
  for (let i = 0; i < residentsURLs.length; i++) {
    if (residentsURLs[i].length > 0) {
      residentsURLs[i].forEach(url =>
        getDataFromAPI(url)
      )
    }
  }
}


function getDataFromAPI(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => swAllResidentsReq = data)
    .then(() => resObj = swAllResidentsReq)
    .then(resObj => residents.push(resObj))
    .then(() => console.log(residents))
    .then(() => appendResidentsInTable())
}

function appendResidentsInTable() {
  for (let j = 0; j < allPlanetsArr.length; j++) {
    let arr = []
    for (let i = 0; i < residents.length; i++) {
      if (residents[i].homeworld === `https://swapi.dev/api/planets/${j + 1}/`) {
        let cell5 = document.querySelector(`.residentLine${j}`)
        arr.push(`
          <a onclick="getResidentData('${residents[i].url}')"
          href='#'>   
          ${residents[i].name}
          </a>`)
        cell5.innerHTML = arr
      }
    }
  }
}

// GET RESIDENT DATA FROM API FOR CHOSEN RESIDENT TABLE

function getResidentData(residentURL) {
  fetch(residentURL)
    .then(response => response.json())
    .then(response => residentObj = response)
    .then(() => createContentOfResidentTable(residentObj))
}

let residentTable = document.querySelector(".residents__table");

// CREATE CHOSEN RESIDENT TABLE CONTENT

function createContentOfResidentTable(residentObj) {
  let row = residentTable.insertRow(-1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);
  let cell7 = row.insertCell(6);

  cell1.innerHTML = residentObj.name;
  cell2.innerHTML = residentObj.gender.toUpperCase();
  cell3.innerHTML = residentObj.hair_color.toUpperCase();
  cell4.innerHTML = residentObj.mass;
  cell5.innerHTML = residentObj.height;
  cell6.innerHTML = residentObj.eye_color
  cell7.innerHTML = residentObj.skin_color
}
