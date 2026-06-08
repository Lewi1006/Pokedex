// local copy of array
let currentPkmArray = [];

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

  renderCard();
}

function renderCard() {
  const cardRef = document.getElementById(`pkm-card-container`);
  cardRef.innerHTML = "";

  for (let indexCard = 0; indexCard < currentPkmArray.length; indexCard++) {
    let pokemon = currentPkmArray[indexCard];
    cardRef.innerHTML += getCardTemplate(pokemon, indexCard);

    renderTypes(pokemon, indexCard);
  }
}

function renderTypes(pokemon, indexCard) {
    const typesRef = document.getElementById(`pkm-types-${indexCard}`)
    typesRef.innerHTML = "";

    for(let indexTypes = 0; indexTypes < pokemon.types.length; indexTypes++){
        let type = pokemon.types[indexTypes]
        typesRef.innerHTML += getTypesTemplate(type);
    }
}
