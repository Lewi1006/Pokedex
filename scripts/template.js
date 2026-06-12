function getCardTemplate(pokemon, indexCard, colorClass, name) {
  return /*html*/ `
     <div class="pkm-card ${colorClass}" onclick="openDialog(${indexCard})">
           <div class="card-header">
                <h2 class="pkm-name">${name}</h2>
                <p class="pkm-id"># ${pokemon.id}</p>
              </div>
  
              <div class="card-body ">
                <div id="pkm-types-${indexCard}" >
                    
                </div>
                <img id="pkm-img-${indexCard}" src="${pokemon.sprites.other[`official-artwork`].front_default}" alt="${pokemon.name}" />
                
              </div>

          </div>
    `;
}

function getTypesTemplate(type) {
  return /*html*/ `
        <div>
            <p>${type.type.name}</p>
        </div>
    `;
}

function getDialogTemplate(pokemon, colorClass, name, indexCard) {
  return /*html*/ `
    <div class="dialog-wrapper ${colorClass}" onclick="event.stopPropagation()">
        <header class="dialog-header">

            <button onclick="previousPokemon()">
                <img src="./assets/icons/left_arrow.svg" alt="left arrow"/>
            </button>
            <button onclick="nextPokemon()">
                <img src="./assets/icons/right_arrow.svg" alt="right arrow"/>
            </button>        
        </header>

        <div class="body">
         <div class="top">   
         <div>
             <h1>${name}</h1>
            <p># ${pokemon.id}</p>
            
        </div>

        <div class="dialog-types" id="dialog-types${indexCard}">
        </div>

        <div class="dialog-img">
            <img src="${pokemon.sprites.other[`official-artwork`].front_default}" alt="${pokemon.name}" />

        </div>
        
        </div>


         <div class="bottom">
            <div class="tab">
                <button class="tablinks" onclick="switchTab('about', ${indexCard})"><p>About</p></button>
                <button class="tablinks" onclick="switchTab('base-stats', ${indexCard})"><p>Base Stats</p></button>
                <button class="tablinks" onclick="switchTab('evolution', ${indexCard})"><p>Evolution</p></button>
                <button class="tablinks" onclick="switchTab('moves', ${indexCard})"><p>Moves</p></button>
            </div>

            <div id="about${indexCard}" class="tab-content active about"></div>
            <div id="base-stats${indexCard}" class="tab-content base-stats"></div>
            <div id="evolution${indexCard}" class="tab-content"></div>
            <div id="moves${indexCard}" class="tab-content"></div>

        </div>
</div>
        
    </div>
        
    `;
}

function getAboutTemplate(pokemon, indexCard, name) {
  return /*html*/ `

<table>
    <tr>
        <td>Name:</td>
        <td>${name}</td>
    </tr>
    <tr>
        <td>Height:</td>
        <td>${pokemon.height}</td>
    </tr>

     <tr>
        <td>Weight:</td>
        <td>${pokemon.weight}</td>
    </tr>

     <tr>
        <td>Abilities:</td>
        <td id="abilities${indexCard}"></td>
    </tr>

    <tr>
        <td>Habitat:</td>
        <td>${pokemon.species.habitat.name}</td>
    </tr>
    <tr>
        <td>Shape:</td>
        <td>${pokemon.species.shape.name}</td>
    </tr>

     <tr>
        <td>Growth rate:</td>
        <td>${pokemon.species.growth_rate.name}</td>
    </tr>
</table>

`;
}

function getBaseStatsTemplate(pokemon, indexCard, name) {
  return /*html*/ `
    <div class="base-stats-wrapper">

        <table id="stats-table-${indexCard}">
        </table>
    </div>

    <div class="stats-headline">
    <h2>Type defenses</h2>
    <p>The effectniveness of each type on ${name}</p>
    </div>
    `;
}

function getStatsTableTemplate(
  pokemon,
  indexCard,
  indexStats,
  statName,
  statValue,
) {
  return /*html*/ `
            <tr>
                <td>${statName}</td>
                <td>${statValue}</td>
                <td>
                    <div class="bar-wrapper">
                        <div id="full-bar" class="full-bar">
                            <div id="percentage-${indexCard}-${indexStats}" class="percentage">
                            </div>
                        </div>
                    </div>
            </td>
            </tr>
    `;
}

// function getEvolutionTemplate() {}

// function getMovesTemplate() {}
