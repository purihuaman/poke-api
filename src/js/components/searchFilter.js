const searchPoke = document.getElementById('searchPoke');
// const pokemonCards = Array.from(document.querySelectorAll('.pokemon__card'));
// document.querySelectorAll('[data-card="card"]')
// const pokemonCards = document.querySelectorAll('[data-card="poke"]');
// const pokemonCards = Array.from(
// 	document.querySelectorAll('[data-card="poke"]')
// );

const pokemon = document.getElementById('pokemon');

const pokemonCards = pokemon.querySelectorAll('[data-card="poke"]');
// const pokemonCards = pokemon.querySelectorAll('.pokemon__card');

const searchFilter = async () => {
	const pokemons = await pokemonCards;
	console.log(pokemons);
	// if (!searchPoke || !pokemonCards) return;

	searchPoke.focus();

	searchPoke.addEventListener('keyup', (e) => {
		const content = e.target.value.toLowerCase();

		// pokemonCards.filter((poke) => {
		// 	poke.textContent.toLowerCase().includes(content)
		// 		? poke.classList.remove('filter')
		// 		: poke.classList.add('filter');
		// });
	});
};

export default searchFilter;
