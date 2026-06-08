function getCardTemplate(pokemon, indexCard) {
  return /*html*/ `
     <div class="pkm-card">
           <div class="card-header">
                <h2 class="pkm-name">${pokemon.name}</h2>
                <p class="pkm-id"># ${pokemon.id}</p>
              </div>
  
              <div class="card-body">
                <div id="pkm-types-${indexCard}">
                    <div>
                        <p></p>
                    </div>
                </div>
                <img id="pkm-img-${indexCard}" src="${pokemon.sprites.other[`official-artwork`].front_default}" alt="${pokemon.name}" />
                
              </div>

          </div>
    `;
}
