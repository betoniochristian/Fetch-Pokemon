const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');

const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const imgContainer = document.getElementById('img-container');
const types = document.getElementById('types');

const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const pokemonURL = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const inputValue = searchInput.value.trim().toLowerCase();
  const pokemonUrls = `${pokemonURL}/${inputValue}`;

  fetch(pokemonUrls).then(res => {
    if(!res.ok){
      alert("Pokémon not found");
    }
    return res.json();
  }).then(pokemon => {

    pokemonName.textContent = `${pokemon.name} `;
    pokemonId.textContent = `#${pokemon.id}`;
    weight.textContent = `Weight: ${pokemon.weight} `;
    height.textContent = `Height: ${pokemon.height}`;
    imgContainer.innerHTML = `<img id="sprite" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">`

      types.innerHTML = '';

      pokemon.types.forEach(typeInfo => {
        const typeP = document.createElement('p');
        const typeName = typeInfo.type.name.toLowerCase(); 
        typeP.textContent = typeName;
        typeP.classList.add(typeName);
        types.appendChild(typeP);
      });
    

    hp.textContent = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
    attack.textContent = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
    defense.textContent = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;
    specialAttack.textContent = pokemon.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
    specialDefense.textContent = pokemon.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
    speed.textContent = pokemon.stats.find(stat => stat.stat.name === 'speed').base_stat;

  }).catch(err => {
    alert("Pokémon not found");
    console.log(err.message);
  })

});
