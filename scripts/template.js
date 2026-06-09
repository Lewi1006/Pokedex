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

function getDialogTemplate(pokemon) {
  return /*html*/ `
    <div class="dialog-wrapper">
        <header class="dialog-header">
            <img src="./assets/icons/left_arrow.svg" alt="left arrow"/>
            <img src="./assets/icons/right_arrow.svg" alt="right arrow"/>
        </header>

        <div class="body">
         <div class="top">   
         <div>
             <h1>${pokemon.name}</h1>
            <p># ${pokemon.id}</p>
            
        </div>

        <div>
            <p>types</p>
        </div>

        <img src="${pokemon.sprites.other[`official-artwork`].front_default}" alt="${pokemon.name}" />
        
        </div>


         <div class="bottom">
            </div>
</div>
        
    </div>
        
    `;
}
