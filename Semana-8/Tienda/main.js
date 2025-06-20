const cartBtn = document.getElementById('cart-btn')
const cartPanel = document.getElementById('cart-panel')
const contenedorProducto = document.getElementById('contenedor-productos')
const cartItems = document.getElementById('cart-items')
const btnTerminarCompra = document.getElementById('terminar-compra')
const total = document.getElementById('total')

let Carrito = JSON.parse(localStorage.getItem('carrito')) || []

let dejoAbiertoElCarrito =
	JSON.parse(localStorage.getItem('carrito_open')) || false

if (dejoAbiertoElCarrito) {
	cartPanel.classList.add('active')
} else {
	cartPanel.classList.remove('active')
}

const products = []

async function traedoraDeProductos() {
	try {
		const res = await fetch('./data.json')
		const data = await res.json()

		data.forEach((el) => {
			products.push(el)
		})
	} catch (error) {
		console.error(error)
	}
}

cartBtn.addEventListener('click', () => {
	if (!cartPanel.classList.contains('active')) {
		dejoAbiertoElCarrito = true
	} else {
		dejoAbiertoElCarrito = false
	}

	cartPanel.classList.toggle('active')

	localStorage.setItem('carrito_open', JSON.stringify(dejoAbiertoElCarrito))
})

async function run() {
	await traedoraDeProductos()
	mostradoraDeCarrito()
	renderizarCards()
	dadoraDeEventosAgregar()
}

function agregadoraACarrito(producto) {
	Carrito.push(producto)
	localStorage.setItem('carrito', JSON.stringify(Carrito))
}

function calculadoraTotal() {
	return Carrito.reduce((acc, el) => {
		return (acc += Number(el.price))
	}, 0)
}

function buscadoraAPartirDeId(id) {
	let producto = products.find((el) => el.id == id.slice(0, -1))

	return producto
}

function dadoraDeEventosAgregar() {
	//const botones = document.getElementsByClassName('add-to-cart')
	const botones = document.querySelectorAll('.add-to-cart')
	const botonesArray = Array.from(botones)

	botonesArray.forEach((el) => {
		el.addEventListener('click', (e) => {
			let id = e.target.parentNode.id
			let producto = buscadoraAPartirDeId(id)
			agregadoraACarrito(producto)
			mostradoraDeCarrito()
			console.log(Carrito)
		})
	})
}

function renderizarCards() {
	products.forEach((el) => {
		let producto = `
			<div class="product-card" id=${el.id + 'V'}>
				<img
					src=${el.image}
					alt=${el.alt}
				/>
				<h3>${el.title}</h3>
				<p>${el.description}</p>
				<span class="price">$${el.price}</span>
				<button class="add-to-cart">
					Agregar al carrito
				</button>
			</div>`

		contenedorProducto.innerHTML += producto
	})
}

function mostradoraDeCarrito() {
	cartItems.innerHTML = ''

	Carrito.forEach((el) => {
		let producto = `
			<div class="product-card" id=${el.id + 'V'}>
				<img
					src=${el.image}
					alt=${el.alt}
				/>
				<h3>${el.title}</h3>
				<span class="price">$${el.price}</span>
			</div>`
		cartItems.innerHTML += producto
	})

	total.innerHTML = ''
	total.innerHTML = calculadoraTotal()
}

btnTerminarCompra.addEventListener('click', () => {
	Carrito = []
	localStorage.removeItem('carrito')
	mostradoraDeCarrito()
})

run()
