// local copy of array of Pokemon Cards
let currentPkmArray = [];

// empty Array 
let pkmFiltered = [];

function init() {
  getData();
}

// all API data is currenty stored in variable const responseAsJson
async function getData() {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=100&offset=0`,
  );
  const responseAsJson = await response.json();
  // console.log(responseAsJson);

  getPkm(responseAsJson.results);
}

// get data passes the results array (pokemon objects) as an argument
// push the pokemon objects into new empty local array so we seperated them
// we now only fetch url property and access that data (pokemons)
async function getPkm(arr) {
  currentPkmArray = [];

  for (let indexData = 0; indexData < arr.length; indexData++) {
    const response = await fetch(arr[indexData].url);
    const pokemonData = await response.json();

    currentPkmArray.push(pokemonData);
    console.log(pokemonData);
  }

  // duplicate array
  pkmFiltered = currentPkmArray;
  console.log(pkmFiltered);
  renderCard();
}

function renderCard() {
  const cardRef = document.getElementById(`pkm-card-container`);
  cardRef.innerHTML = "";

  for (let indexCard = 0; indexCard < pkmFiltered.length; indexCard++) {
    let pokemon = pkmFiltered[indexCard];
    let colorClass = getTypeClass(pokemon);
    console.log(colorClass);

    cardRef.innerHTML += getCardTemplate(pokemon, indexCard, colorClass);

    renderTypes(pokemon, indexCard);
  }
}

function renderTypes(pokemon, indexCard) {
  const typesRef = document.getElementById(`pkm-types-${indexCard}`);
  typesRef.innerHTML = "";

  for (let indexTypes = 0; indexTypes < pokemon.types.length; indexTypes++) {
    let type = pokemon.types[indexTypes];
    typesRef.innerHTML += getTypesTemplate(type);
  }
}


// change function so that we check if its certain types like water grass fire etc. if not choose alternative
// we want to prioritize certain types 
// new local array where we can compare with types array 
// if name exists 
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



//  filter function is predefined and does for loop and so pokemon hére is 
// not the same value as pokemon in the other functions
// it just extracts is in the same way as in renderCard() by going through currentPkmArray and filtering it
// .filter() is a built-in loop method
// pokemon is just a local parameter name inside that loop
// it is NOT connected to other pokemon variables elsewhere
// also we need to go through the full data as in currentPkmArray and not just the Filtered 
// but filtered willl always e the same as currentPkm till we type in something into input 
// cause thats when we call the filter function where we assign new value to pkmfiltered 
// arr and since we call renderCards() after this will be know the renderedCards thats 
// why renderCards uses pkmFiltered from the start
function filterAndShowNames(filterWord){
  pkmFiltered = currentPkmArray.filter(pokemon => pokemon.name.includes(filterWord));
  renderCard();
}