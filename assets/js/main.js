const pokemonList = document.getElementById('pokemons-list');
const loadMoreButton = document.getElementById('loadMoreButton');
const searchInput = document.getElementById('search');
const limit = 8;
let offset = 0;
let allPokemons = []; 

function loadPokemonItems(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        allPokemons.push(...pokemons); // Adiciona os novos Pokémon ao array global
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('');

        // Adiciona os novos Pokémon à lista existente
        pokemonList.innerHTML += newHtml; 
    });
}

// Função para exibir Pokémon filtrados pela busca
function displayPokemons(pokemons) {
    const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `).join('');

    // Substitui o conteúdo da lista
    pokemonList.innerHTML = newHtml; 
}

// Carrega os Pokémon inicialmente
loadPokemonItems(offset, limit);
offset += limit;

// Carrega mais Pokémon ao clicar no botão
loadMoreButton.addEventListener('click', () => {
    loadPokemonItems(offset, limit);
    offset += limit;
});

// Adiciona a funcionalidade de busca
searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    const filteredPokemons = allPokemons.filter(pokemon => 
        pokemon.name.toLowerCase().startsWith(searchValue) // Filtra os Pokémon pelo nome
    );
    // Exibe os Pokémon filtrados
    displayPokemons(filteredPokemons); 
});
