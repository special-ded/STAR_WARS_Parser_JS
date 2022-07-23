let header = document.querySelector(".planets__table--head")
let table = document.querySelector(".planets__table");
let swAllPlanetsReq
let allPlanetsArr
let residents = []
let residentsURLs = []
let swAllResidentsReq

// GET ALL DATA FROM API
let xhr = new XMLHttpRequest();
xhr.open('GET', "https://swapi.dev/api/planets")
xhr.send()
xhr.onload = function () {
  try {
    swAllPlanetsReq = JSON.parse(xhr.response)
  } catch (error) {
    console.log(error)
  }
  allPlanetsArr = swAllPlanetsReq.results
  createContentOfTable()
}

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
  foo()
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

function foo() {
  for (let i = 0; i < residentsURLs.length; i++) {
    if (residentsURLs[i].length > 0) {
      residentsURLs[i].forEach(url =>
        getDataFromAPI(url)
      )
    }
  }
}

let a = {}
function getDataFromAPI(url) {
  let residentXHR = new XMLHttpRequest();
  residentXHR.open('GET', url)
  residentXHR.send()

  residentXHR.onload = function () {
    try {
      swAllResidentsReq = JSON.parse(residentXHR.response)
    } catch (error) {
      console.log(error)
    }

    a = swAllResidentsReq;
    residents.push(a)
    if (residents.length == 32) {
      appendResidentsInTable()
    }
  }
}

function appendResidentsInTable() {
  console.log(residents)
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


let residentObj
function getResidentData(residentURL) {
  console.log(residentURL)

  // GET RESIDENT DATA FROM API FOR TABLE
  let ResidentTablexhr = new XMLHttpRequest();
  ResidentTablexhr.open('GET', residentURL)
  ResidentTablexhr.send()
  ResidentTablexhr.onload = function () {
    try {
      residentObj = JSON.parse(ResidentTablexhr.response)
    } catch (error) {
      console.log(error)
    }
    console.log(residentObj)

    createContentOfResidentTable(residentObj)
  }
}
let residentTable = document.querySelector(".residents__table");


function createContentOfResidentTable(residentObj) {

  // CREATE TABLE CONTENT
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
