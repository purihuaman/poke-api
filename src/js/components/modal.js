const modal = document.getElementById('modal');
const pokemon = document.getElementById('pokemon');
const template = document.getElementById('template').content;

export const openModal = () => {
	if (!modal || !pokemon) return;

	pokemon.addEventListener('click', (e) => {
		e.preventDefault();
		modal.classList.remove('hidden');
		const linkPoke = e.target.parentNode;

		if (linkPoke.matches('a')) {
			let url = linkPoke.href;
			const dataPokes = getPoke(url);

			dataPokes.then((poke) => showModal(poke));
		}
	});

	modal.addEventListener('click', (e) => {
		const linkPoke = e.target.parentNode;
		if (e.target === modal) {
			linkPoke.url = '';
			modal.classList.add('hidden');
		}
	});
};

const getPoke = async (url) => {
	const data = await fetch(url);
	const pokes = await data.json();

	return await pokes;
};

const showModal = (pokes) => {
	const fragment = document.createDocumentFragment();

	if (modal.children[0].hasChildNodes()) modal.children[0].innerHTML = '';

	if (!template || !fragment) return;

	console.log(pokes);
	const {id, name, sprites, types, weight, height, stats} = pokes;

	template.querySelector('[data-img]').src =
		sprites?.other?.dream_world?.front_default;
	template.querySelector('[data-img]').alt = name;
	template.querySelector('[data-name]').textContent = name;
	template.querySelector('[data-type]').textContent = types[0]?.type?.name;
	template.querySelector('[data-weight]').textContent = weight;
	template.querySelector('[data-height]').textContent = height;
	template.querySelector('[data-hp]').textContent = stats[0]?.base_stat;
	template.querySelector('[data-atk]').textContent = stats[1]?.base_stat;
	template.querySelector('[data-def]').textContent = stats[2]?.base_stat;
	template.querySelector('[data-satk]').textContent = stats[3]?.base_stat;
	template.querySelector('[data-sdef]').textContent = stats[4]?.base_stat;
	template.querySelector('[data-spd]').textContent = stats[5]?.base_stat;

	// LLenando barras
	template.querySelector('[data-progHP]').value = stats[0]?.base_stat;
	template.querySelector('[data-progATK]').value = stats[1]?.base_stat;
	template.querySelector('[data-progDEF]').value = stats[2]?.base_stat;
	template.querySelector('[data-progSATK]').value = stats[3]?.base_stat;
	template.querySelector('[data-progSDEF]').value = stats[4]?.base_stat;
	template.querySelector('[data-progSPD]').value = stats[5]?.base_stat;

	let cloneTemplate = document.importNode(template, true);

	fragment.append(cloneTemplate);

	modal.children[0].append(fragment);
};
