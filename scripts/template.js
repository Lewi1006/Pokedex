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
    <div class="dialog-wrapper ${colorClass}">
        <header class="dialog-header">
            <img src="./assets/icons/left_arrow.svg" alt="left arrow"/>
            <img src="./assets/icons/right_arrow.svg" alt="right arrow"/>
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
                <button class="tablinks" onclick=""><p>About</p></button>
                <button class="tablinks" onclick=""><p>Base Stats</p></button>
                <button class="tablinks" onclick=""><p>Evolution</p></button>
                <button class="tablinks" onclick=""><p>Moves</p></button>
            </div>

            <div id="about" class="tab-content"></div>
            <div id="base-stats" class="tab-content"></div>
            <div id="evolution" class="tab-content"></div>
            <div id="moves" class="tab-content"></div>

        </div>
</div>
        
    </div>
        
    `;
}


function getAboutTemplate(){
    
}
