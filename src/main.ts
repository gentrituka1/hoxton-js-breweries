// Write your code here
type Brewery = {
  address_2: null;
  address_3: null;
  brewery_type: string;
  city: string;
  country: string;
  county_province: null;
  created_at: string;
  id: number;
  latitude: string;
  longitude: string;
  name: string;
  obdb_id: string;
  phone: string;
  postal_code: string;
  state: string;
  street: string;
  updated_at: string;
  website_url: string;
};

const breweries: Brewery[] = [
  {
    address_2: null,
    address_3: null,
    brewery_type: "large",
    city: "San Diego",
    country: "United States",
    county_province: null,
    created_at: "2018-07-24T00:00:00.000Z",
    id: 8041,
    latitude: "32.714813",
    longitude: "-117.129593",
    name: "10 Barrel Brewing Co",
    obdb_id: "10-barrel-brewing-co-san-diego",
    phone: "6195782311",
    postal_code: "92101-6618",
    state: "California",
    street: "1501 E St",
    updated_at: "2018-08-23T00:00:00.000Z",
    website_url: "http://10barrel.com",
  },
];

type BreweryType = {
  byMicro: string;
  byReginal: string;
  byBrewPub: string;
};

type State = {
  byBreweryType: {};
  USState: string;
  byName: string;
  breweries: Brewery[];
};

let state: State = {
  byBreweryType: {
    byMicro: "",
    byRegional: "",
    byBrewPub: "",
  },
  byName: "",
  USState: "",
  breweries: [],
};

let mainEl = document.querySelector("main");

function renderSearchBar() {
  let h1El = document.createElement("h1");
  h1El.textContent = "List of Breweries";

  let searchBarHeader = document.createElement("header");
  searchBarHeader.classList.add("search-bar");

  let searchForm = document.createElement("form");
  searchForm.id = "search-breweries-form";
  searchForm.autocomplete = "off";
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    state.byName = searchForm["search-breweries"].value;
    render();
  });

  let searchLabel = document.createElement("label");
  searchLabel.htmlFor = "search-breweries";
  searchLabel.textContent = "Search breweries:";

  let searchInput = document.createElement("input");
  searchInput.id = "search-breweries";
  searchInput.name = "search-breweries";
  searchInput.type = "text";

  searchForm.append(searchLabel, searchInput);
  searchBarHeader.append(searchForm);
  mainEl?.append(h1El, searchBarHeader);
}

function getBreweriesForName() {
  // find breweries with this name
  // put them in state
  // rerender
  let filteredBreweries = state.breweries.filter((brewery) => {
    return brewery.name.toLowerCase().includes(state.byName.toLowerCase());
  });
  return filteredBreweries;
}

function renderListOfBrewery() {
  let articleEl = document.createElement("article");

  let ulEl = document.createElement("ul");
  ulEl.classList.add("breweries-list");

  for (let brewery of getBreweriesForName()) {
    let liEl = document.createElement("li");

    let h2El = document.createElement("h2");
    h2El.textContent = brewery.name;

    let typeEl = document.createElement("div");
    typeEl.className = "type";
    typeEl.textContent = brewery.brewery_type;

    let addressEl = document.createElement("section");
    addressEl.className = "address";

    let h3El = document.createElement("h3");
    h3El.textContent = "Address:";

    let pEl = document.createElement("p");
    pEl.textContent = brewery.street;

    let p2El = document.createElement("p");
    p2El.textContent = `${brewery.city}, ${brewery.state} ${brewery.postal_code}`;

    let phoneEl = document.createElement("section");
    phoneEl.classList.add("phone");

    let h3El2 = document.createElement("h3");
    h3El2.textContent = "Phone:";

    let pEl2 = document.createElement("p");
    pEl2.textContent = brewery.phone;

    let linkEl = document.createElement("section");
    linkEl.classList.add("link");

    let aEl = document.createElement("a");
    aEl.href = brewery.website_url;
    aEl.textContent = "Visit Website";

    addressEl.append(h3El, pEl, p2El);
    phoneEl.append(h3El2, pEl2);
    linkEl.append(aEl);
    liEl.append(h2El, typeEl, addressEl, phoneEl, linkEl);
    ulEl.append(liEl);
  }
  articleEl.append(ulEl);
  mainEl?.append(articleEl);
}

function getBreweriesForState() {
  // find breweries in this state
  // put them in state
  // rerender
  fetch(`https://api.openbrewerydb.org/breweries?by_state=${state.USState}`)
    .then((response) => response.json())
    .then((data) => {
      state.breweries = data;
      render();
    });
}

function listenToSelectStateForm() {
  let formEl = document.querySelector<HTMLFormElement>("#select-state-form");
  formEl?.addEventListener("submit", function (event) {
    event.preventDefault();
    let USState = formEl["select-state"].value;
    state.USState = USState;
    getBreweriesForState();
  });
}

function getBreweries() {
  fetch("https://api.openbrewerydb.org/breweries")
    .then((response) => response.json())
    .then((data) => {
      state.breweries = data;
      render();
    });
}

function getBreweriesForByMicro() {
  // find breweries with this name
  // put them in state
  // rerender
  let filteredBreweries = state.breweries.filter((brewery) => {
    return brewery.brewery_type.toLowerCase() === "micro";
  });
  return filteredBreweries;
}
function renderBreweriesByMicro() {
  // <aside class="filters-section">
  // <h2>Filter By:</h2>
  // <!-- Type of brewery - Challenge #1 -->
  // <form id="filter-by-type-form" autocompete="off">
  //   <label for="filter-by-type">
  //     <h3>Type of Brewery</h3>
  //   </label>
  //   <select name="filter-by-type" id="filter-by-type">
  //     <option value="">Select a type...</option>
  //     <option value="micro">Micro</option>
  //     <option value="regional">Regional</option>
  //     <option value="brewpub">Brewpub</option>
  //   </select>
  // </form>

  let asideEl = document.createElement("aside");
  asideEl.className = "filters-section";

  let h2El = document.createElement("h2");
  h2El.textContent = "Filter By:";

  let formEl = document.createElement("form");
  formEl.id = "filter-by-type-form";
  formEl.autocomplete = "off";
  formEl.addEventListener("submit", function (event) {
    event.preventDefault();
    state.byBreweryType = formEl["filter-by-type"].value;
    render();
  });

  let labelEl = document.createElement("label");
  labelEl.htmlFor = "filter-by-type";

  let h3El = document.createElement("h3");
  h3El.textContent = "Type of Brewery";

  let selectEl = document.createElement("select");
  selectEl.name = "filter-by-type";
  selectEl.id = "filter-by-type";

  let optionEl = document.createElement("option");
  optionEl.value = "";
  optionEl.textContent = "Select a type...";

  let option2El = document.createElement("option");
  option2El.value = "micro";
  option2El.textContent = "Micro";

  let option3El = document.createElement("option");
  option3El.value = "regional";
  option3El.textContent = "Regional";

  let option4El = document.createElement("option");
  option4El.value = "brewpub";
  option4El.textContent = "Brewpub";

  selectEl.append(optionEl, option2El, option3El, option4El);
  labelEl.append(h3El, selectEl);
  formEl.append(labelEl);
  asideEl.append(h2El, formEl);
  mainEl?.append(asideEl);
}

function render() {
  if (mainEl) mainEl.innerHTML = "";
  console.log(state);
  renderSearchBar();
  renderListOfBrewery();
  renderBreweriesByMicro();
}


getBreweries();
listenToSelectStateForm();
render();
