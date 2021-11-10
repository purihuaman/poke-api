
const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
const urlImge = 'https://pokeapi.co/api/v2/pokemon-form/';


export const readAll = ( ) => {
	axios({
		method: 'GET',
		url: urlPokemon
	})
		.then(( resp ) => {
			const pokemon = document.getElementById('pokemon')
			const fragment = document.createDocumentFragment()
			resp.data.results.map(( data, key ) => {
				const pokemonCard = document.createElement('div')
				const pokemonText = document.createElement('p')
				const img = document.createElement('img')
				const type = document.createElement('p')

				axios({
					method: 'GET',
					url: `${urlImge}${ key +1 }`
				})
					.then(( resp ) => {
						// console.log( resp.data.types[0].type )
						// console.log( resp.data )
						// console.log( resp.data.name )
						img.classList.add('pokemon__image')
						img.src = resp.data.sprites.back_default

						type.innerHTML = `<b>Tipo: </b>${ resp.data.types[0].type.name }`
						type.classList.add('pokemon__text')
						
						pokemonCard.prepend( img )
						pokemonCard.append( type )
					})

				pokemonText.setAttribute('id', key + 1)
				pokemonText.classList.add('pokemon__name')
				pokemonText.textContent = data.name.toUpperCase()
				pokemonCard.append( pokemonText )
				
				pokemonCard.classList.add('pokemon__card');
				fragment.append( pokemonCard )
			})
			pokemon.append( fragment )
		})
}



