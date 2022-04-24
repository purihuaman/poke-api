const urlPokemon = 'https://pokeapi.co/api/v2/pokemon?limit=100';

const pokemon = document.getElementById('pokemon');
const navegation = document.getElementById('navegation');

let arrPokemos = [];

async function readAll(url) {
	try {
		const data = await fetch(url);
		console.log(url);
		const results = await data.json();
		const pokemons = await results.results;

		getAvatar(pokemons);

		const navButtons = {
			next: results.next,
			previous: results.previous,
		};
		navegationButtons(navButtons);
	} catch (err) {
		console.log(err);
	}
}

/* const getAvatar = async (objPokemons) => {
	try {
		for (const poke of objPokemons) {
			const data = await fetch(poke.url);
			const response = await data.json();
			console.log(response);

			showPokemons(
				response.id,
				response.name,
				response?.sprites?.other?.dream_world?.front_default ||
					response?.sprites?.front_default,
				response.types[0].type.name
			);
		}
	} catch (err) {
		console.log(err);
	}
}; */

const getAvatar = async (objPokemons) => {
	try {
		for (const poke of objPokemons) {
			const data = await fetch(poke.url);
			const response = await data.json();

			const pokemon = {
				id: response.id,
				name: response.name,
				avatar:
					response?.sprites?.other?.dream_world?.front_default ||
					response?.sprites?.front_default,
				type: response.types[0].type.name,
			};

			let pokes = [...new Set(arrPokemos['id']), {...pokemon}];
			arrPokemos = pokes;

			showPokemons(arrPokemos);
		}
	} catch (err) {
		console.log(err);
	}
};

const showPokemons = (pokemons) => {
	if (pokemons.length === 0) {
		const message = document.createElement('p');
		message.textContent = 'Cargando...';
		pokemon.after(message);
	}

	const template = document.getElementById('template').content;
	const fragment = document.createDocumentFragment();

	for (const {id, name, avatar, type} of pokemons) {
		template.querySelector('.pokemon__card').id = id;
		template.querySelector('.pokemon__image').src = avatar;
		template.querySelector('.pokemon__image').alt = name;
		template.querySelector('.pokemon__name').textContent = name;
		template.querySelector(
			'.pokemon__text'
		).innerHTML = `<b>Tipo: ${id} </b>${type}`;

		const templateClone = document.importNode(template, true);
		fragment.append(templateClone);
	}

	pokemon.append(fragment);
};

const navegationButtons = async (navButtons) => {
	let {next, previous} = await navButtons;

	const buttonNext = document.createElement('button');
	const buttonPrevious = document.createElement('button');
	buttonNext.dataset.next = 'next';
	buttonPrevious.dataset.previous = 'previous';
	buttonNext.classList.add('button', 'button--primary');
	buttonPrevious.classList.add('button', 'button--ghost');
	buttonNext.textContent = 'Siguiente';
	buttonPrevious.textContent = 'Anterior';

	buttonNext.dataset.url = next;
	buttonPrevious.dataset.url = previous;

	if (!navegation) return;

	previous
		? document.querySelector('[data-previous="previous"]')
			? buttonPrevious.remove()
			: navegation.prepend(buttonPrevious)
		: '';

	next
		? document.querySelector('[data-next="next"]')
			? buttonNext.remove()
			: navegation.append(buttonNext)
		: '';
};
navegation.addEventListener('click', (e) => {
	if (e.target.classList.contains('button')) {
		let newUrl = e.target.dataset.url;
		readAll(newUrl);
		if (pokemon.hasChildNodes()) pokemon.innerHTML = '';
	}
});

const readPokemons = () => readAll(urlPokemon);

export default readPokemons;
