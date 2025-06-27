const URL = 'https://pokeapi.co/api/v2/pokemon/?limit='

const toggleButton = document.getElementById('toggleCartButton')
const cart = document.getElementById('cart')
const pokemonList = document.getElementById('pokemon-list')

toggleButton.addEventListener('click', () => {
	cart.classList.toggle('show')
})

async function obtenerXCantidadDePokemon(num) {
	try {
		const response = await fetch(URL + num)
		const data = await response.json()
		return data.results
	} catch (err) {
		console.log(err)
	}
}

async function creadoraDeArraysDeURLPokemon(arrayDePokemon) {
	return arrayDePokemon.map((el) => el.url)
}

async function creadoraDeArrayDefinitivoDePokemon(num) {
	try {
		let pokemon = await obtenerXCantidadDePokemon(num)
		let urlPokemon = await creadoraDeArraysDeURLPokemon(pokemon)

		const arrayDePromesas = await Promise.all(
			urlPokemon.map(async (url) => {
				const response = await fetch(url)
				const data = await response.json()
				return data
			})
		)

		return arrayDePromesas
	} catch (err) {
		console.log(err)
	}
}

async function funcionCreadoraDeCards() {
	pokemonList.innerHTML = ''

	let pokemonListArray = await creadoraDeArrayDefinitivoDePokemon(350)

	pokemonListArray.forEach((pkm) => {
		console.log(pkm)
		pokemonList.innerHTML += `
				<div class="pokemon-card">
					<img
						src=${pkm.sprites.front_default}
						alt=${pkm.name}
						class="pokemon-image"
					/>
					<h2 class="pokemon-name">${pkm.name[0].toUpperCase() + pkm.name.slice(1)}</h2>
					<p class="pokemon-type">Tipo: ${pkm.types[0].type.name} ${
			pkm?.types[1]?.type.name ? ' / ' + pkm.types[1].type.name : ''
		}</p>
					<button class="loan-button">Pedir en Seleccion</button>
				</div>
                `
	})
}

funcionCreadoraDeCards()
