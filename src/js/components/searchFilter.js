const searchPoke = document.getElementById('searchPoke');

const pokemonCards = document.getElementById('pokemon').children;

const searchFilter = () => {
	if (!searchPoke) return;

	searchPoke.focus();
	searchPoke.addEventListener('keyup', (e) => {
		const pokemons = Array.from(pokemonCards);
		let content = e.target.value.toLowerCase();

		pokemons.filter((poke) => {
			poke.textContent.toLowerCase().includes(content)
				? poke.classList.remove('filter')
				: poke.classList.add('filter');
		});
	});
	searchPoke.value = '';
};

export default searchFilter;
