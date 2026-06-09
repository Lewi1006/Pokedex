function getCardTemplate(pokemon, indexCard, colorClass, name) {
  return /*html*/ `
     <div class="pkm-card ${colorClass}">
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
