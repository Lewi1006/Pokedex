// local copy of API --> stores array of results (Pokemon Cards)
let currentPkmArray = [];

// empty Array that
let pkmFiltered = [];

// index to click through pokemon cards
let updatedIndex = 0;

const cardRef = document.getElementById(`pkm-card-container`);
const noResultsRef = document.getElementById(`no-results`);
const loaderRef = document.getElementById(`loader`);
const loadingButtonRef = document.getElementById(`loading-button`);
let isLoading = false;

// implement load more and that there is an offset
let offset = 0;
let limit = 20;

function init() {
  getData();
}

// #region fetch API data
// all API data is currenty stored in variable const responseAsJson
// call getPkm() function and pass the value of property results(shows pokemon data)
async function getData() {
  isLoading = true;
  loadingData();

  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );
  const responseAsJson = await response.json();

  // wait till data is loaded
  await getPkm(responseAsJson.results);

  isLoading = false;
  loadingData();
}

// getData passes the results array (pokemon objects) as an argument int0 getPkm(arr)
// push the pokemon objects into new empty local array currentPkmArray[]
// iterate through results array and only fetch url property and access that data (pokemons)
// pokemon data gets pushed into array
// duplicate currentPkmArray to pkmFiltered so we can filter through the copy and do not touch original data
// renderCard() cause we want to update card with the data
// combine objects as nested object https://www.geeksforgeeks.org/javascript/how-to-push-an-object-into-another-object-in-javascript/
async function getPkm(arr) {
  currentPkmArray = [];

  for (let indexData = 0; indexData < arr.length; indexData++) {
    const response = await fetch(arr[indexData].url);
    const pokemonData = await response.json();

    // get pokemon species url object
    const responseSpecies = await fetch(pokemonData.species.url);
    const speciesData = await responseSpecies.json();

    // assign object into property so instead of url we see object
    pokemonData.species = speciesData;

    currentPkmArray.push(pokemonData);
  }
  // duplicate array
  pkmFiltered = currentPkmArray;
  renderCard();
}

// #endregion

// #region render functions
// render pokemon cards into html by iterating through pkmFiltered array (pokemon data)
// a single pokemon is the value of the index of pkmFiltered
// we assign the type to the colorClass variable so it can be passed into template
// we call toUpper function that capitalizes name and store it in variable name that gets passed into template
// --> by passing pokemon value into it we make sure its the right index
// with the for loop we fill individual cards with data by filling inner.html of getCardTemplate
// call renderTypes cause we need that value to render the Card
function renderCard() {
  cardRef.innerHTML = "";

  for (let indexCard = 0; indexCard < pkmFiltered.length; indexCard++) {
    let pokemon = pkmFiltered[indexCard];
    let colorClass = getTypeClass(pokemon);
    let name = capitalize(pokemon.name);

    cardRef.innerHTML += getCardTemplate(pokemon, indexCard, colorClass, name);

    renderTypes(pokemon, indexCard);
  }
}

// seperate rendering of types array within each pokemon(=indexCard)
// access ID in getCardTemplate for types give them index as number to make them unique
// assign the object that is at index of the type array to the variable type
// pass type into getTypesTemplate
// access type.type.name === pokemon.types[indexTypes].type.name in template
function renderTypes(pokemon, indexCard) {
  const typesRef = document.getElementById(`pkm-types-${indexCard}`);
  typesRef.innerHTML = "";

  for (let indexTypes = 0; indexTypes < pokemon.types.length; indexTypes++) {
    let type = pokemon.types[indexTypes];
    typesRef.innerHTML += getTypesTemplate(type);
  }
}

// render the types the same way for the dialog but address different ID in dialogTemplate
function renderDialogTypes(pokemon, indexCard) {
  const dialogTypesRef = document.getElementById(`dialog-types${indexCard}`);
  dialogTypesRef.innerHTML = "";

  for (let indexTypes = 0; indexTypes < pokemon.types.length; indexTypes++) {
    let type = pokemon.types[indexTypes];
    dialogTypesRef.innerHTML += getTypesTemplate(type);
  }
}

function renderDialog(indexCard) {
  let pokemon = pkmFiltered[indexCard];
  let colorClass = getTypeClass(pokemon);
  let name = capitalize(pokemon.name);

  const dialogRef = document.getElementById(`dialog`);
  dialogRef.innerHTML = "";
  dialogRef.innerHTML = getDialogTemplate(pokemon, colorClass, name, indexCard);

  renderDialogTypes(pokemon, indexCard);
  renderAbout(pokemon, indexCard);
  renderBaseStats(pokemon, indexCard);
}

// #region ABOUT
function renderAbout(pokemon, indexCard) {
  const aboutRef = document.getElementById(`about${indexCard}`);
  aboutRef.innerHTML = "";

  let name = capitalize(pokemon.name);
  aboutRef.innerHTML = getAboutTemplate(pokemon, indexCard, name);

  renderAbilities(pokemon, indexCard);
}

function renderAbilities(pokemon, indexCard) {
  const abilitiesRef = document.getElementById(`abilities${indexCard}`);
  abilitiesRef.innerHTML = "";

  let abilities = [];

  for (
    let indexAbilities = 0;
    indexAbilities < pokemon.abilities.length;
    indexAbilities++
  ) {
    let ability = pokemon.abilities[indexAbilities].ability.name;

    abilities.push(ability);
  }

  abilitiesRef.innerHTML = abilities.join(", ");
}

// #endregion

// #region BASE STATS
function renderBaseStats(pokemon, indexCard) {
  const statsRef = document.getElementById(`base-stats${indexCard}`);
  let name = capitalize(pokemon.name);
  statsRef.innerHTML = getBaseStatsTemplate(pokemon, indexCard, name);

  renderStatsTable(pokemon, indexCard);
}

function renderStatsTable(pokemon, indexCard) {
  const statsTableRef = document.getElementById(`stats-table-${indexCard}`);
  statsTableRef.innerHTML = "";

  for (let indexStats = 0; indexStats < pokemon.stats.length; indexStats++) {
    let statName = pokemon.stats[indexStats].stat.name;
    statName = capitalize(statName.replace("special-", ""));

    let statValue = pokemon.stats[indexStats].base_stat;

    statsTableRef.innerHTML += getStatsTableTemplate(
      pokemon,
      indexCard,
      indexStats,
      statName,
      statValue,
    );

    renderPercentageStats(statValue, indexCard, indexStats);
  }
}

function renderPercentageStats(statValue, indexCard, indexStats) {
  const percentageRef = document.getElementById(
    `percentage-${indexCard}-${indexStats}`,
  );

  const statPercent = (statValue / 255) * 100;
  percentageRef.style.width = `${statPercent}%`;
}

// #endregion

// function renderEvolution() {}

// function renderMoves() {}

// #endregion

// #region loading data
function loadingData() {
  if (isLoading === true) {
    loaderRef.classList.remove(`hidden`);
    document.getElementById(`loading-button`).disabled = true;
    // cardRef.style.display = "none";
  } else {
    loaderRef.classList.add(`hidden`);
    document.getElementById(`loading-button`).disabled = false;
    cardRef.style.display = "flex";
  }
}

function loadMore() {
  if (loadingButtonRef.textContent === "Return") {
    noResultsRef.style.display = "none";
    // loadingButtonRef.textContent = "Catch more";
  }

  limit = limit + 20;
  getData();
}
//#endregion

// #region searching 
function searchPkm() {
  const inputRef = document.getElementById(`pokemon-name`);

  filterAndShowNames(inputRef.value);
}

// filter function is predefined and does for loop and so pokemon here is
// not the same value as pokemon in the other functions
// it just extracts is in the same way as in renderCard() by going through currentPkmArray and filtering it
// .filter() is a built-in loop method
// pokemon is just a local parameter name inside that loop
// it is NOT connected to other pokemon variables elsewhere
// also we need to go through the full data as in currentPkmArray and not just the Filtered
// but filtered will always be the same as currentPkm till we type in something into input
// cause thats when we call the filter function where we assign new value to pkmfiltered arr
// and since we call renderCards() after this will be know the renderedCards thats
// why renderCards uses pkmFiltered from the start
// only filter when more than 3 characters else just keep unfiltered array
// filter only works if word is typed in lower case > turn all input to lower case

function filterAndShowNames(filterWord) {
  let searchInput = filterWord.toLowerCase();

  if (filterWord.length < 3 && filterWord.length > 0) {
    alert("Type at least 3 characters!");
    return;
  }

  if (filterWord.length >= 3) {
    pkmFiltered = currentPkmArray.filter((pokemon) =>
      pokemon.name.includes(searchInput),
    );
  } else {
    pkmFiltered = currentPkmArray;
  }

  noMatchFound(pkmFiltered);
  renderCard();
}

function noMatchFound(filteredArray) {
  if (filteredArray.length === 0) {
    noResultsRef.style.display = "flex";
    loadingButtonRef.textContent = "Return";
  } else {
    noResultsRef.style.display = "none";
    loadingButtonRef.textContent = "Catch more";
  }
}

// #endregion

// #region helper functions
// we want to prioritize certain types
// new local array of preferred types
// where we can compare with types array if name exists
// loop through pref and through types array
// if name property of types array equals any string in pref array --> return this certain value
// if not return the first name
function getTypeClass(pokemon) {
  const preferred = ["grass", "fire", "water", "electric", "psychic", "ground"];

  for (let indexPref = 0; indexPref < preferred.length; indexPref++) {
    for (let indexTypes = 0; indexTypes < pokemon.types.length; indexTypes++) {
      if (pokemon.types[indexTypes].type.name === preferred[indexPref]) {
        return preferred[indexPref];
      }
    }
  }

  return pokemon.types[0].type.name;
}

// // https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
// // slice 1 --> shows everything starting from index 1 --> meaning first letter gets sliced

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function switchTab(tabName, indexCard) {
  document.getElementById(`about${indexCard}`).classList.remove(`active`);
  document.getElementById(`base-stats${indexCard}`).classList.remove(`active`);

  document.getElementById(`${tabName}${indexCard}`).classList.add(`active`);
}

function previousPokemon() {
  updatedIndex--;

  if (updatedIndex < 0) {
    updatedIndex = pkmFiltered.length - 1;
  }

  renderDialog(updatedIndex);
}

function nextPokemon() {
  updatedIndex++;

  if (updatedIndex >= pkmFiltered.length) {
    updatedIndex = 0;
  }

  renderDialog(updatedIndex);
}


// #endregion

// #region dialog
function openDialog(indexCard) {
  let dialogRef = document.getElementById(`dialog`);
  dialogRef.showModal();
  document.body.classList.add("no-scroll");

  updatedIndex = indexCard;

  renderDialog(indexCard);
}

function closeDialog() {
  let dialogRef = document.getElementById(`dialog`);
  dialogRef.close();
  document.body.classList.remove("no-scroll");
}

// #endregion


