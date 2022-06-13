const urlPokemon = 'https://pokeapi.co/api/v2/pokemon';

const pokemonContent = document.getElementById('pokemon');
const navegation = document.getElementById('navegation');
const navegationChild = document.getElementById('navegation').children;

const getPokemons = async (url) => {
	try {
		pokemonContent.innerHTML = `
			<div class='loader loadText'>
				Cargando...
			</div>
		`;

		const data = await fetch(url);
		const {next, previous, results: pokemons} = await data.json();

		let templateHtml = '';
		let prevLink;
		let nextLink;
		if (!data.ok) throw {status: data.status, statusText: data.statusText};

		for (let i = 0; i < pokemons.length; i++) {
			try {
				const data = await fetch(pokemons[i].url);
				const pokes = await data.json();

				if (!data.ok) throw {status: data.status, statusText: data.statusText};

				templateHtml += `
					<a href=${pokemons[i].url} data-name=${pokemons[i].name}>
						<article class='pokemon__card' data-id=${pokes?.id} data-name=${pokemons[i].name}>
							<div class='pokemon__container'>
								<img src=${pokes?.sprites?.other?.dream_world?.front_default}
									alt=${pokemons[i]?.name} 
									class='pokemon__image'
									loading='lazy'
								/>
							</div>
							<p class='pokemon__name'>${pokemons[i]?.name}</p>
							<span class='pokemon__text'>${pokes?.types[0]?.type?.name}</span>
						</article>
					</a>
				`;
			} catch (error) {
				let message = error.statusText || 'Ocurrio un error';
				templateHtml.innerHTML += `
				<figure>
					<figcaption>${error.status}: ${message}</figcaption>
				</figure>
			`;
			}
		}
		pokemonContent.innerHTML = templateHtml;

		nextLink = previous && navegationChild[0].setAttribute('href', previous);
		prevLink = next && navegationChild[1].setAttribute('href', next);
	} catch (error) {
		let message = error.statusText || 'Ocurrio un error';
		pokemonContent.innerHTML = `<p>Error ${error.status}: ${message}</p>`;
	}
};

const navegationPokes = () => {
	if (!navegation) return;

	navegation.addEventListener('click', (e) => {
		if (e.target.matches('#navegation a')) {
			e.preventDefault();
			getPokemons(e.target.getAttribute('href'));
		}
	});
};

navegationPokes();

const readPokemons = () => getPokemons(urlPokemon);

export default readPokemons;
