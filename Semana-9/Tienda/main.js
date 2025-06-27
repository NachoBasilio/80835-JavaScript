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
	let id = Carrito.findIndex((el) => el.id === producto.id)

	if (id == -1) {
		Carrito.push(producto)
		Carrito[Carrito.length - 1].cantidad = 1
	} else {
		Carrito[id].cantidad += 1
	}
}

function calculadoraTotal() {
	return Carrito.reduce((acc, el) => {
		return (acc += Number(el.price) * el.cantidad)
	}, 0)
}

function buscadoraAPartirDeId(id) {
	let producto = products.find((el) => el.id == id.slice(0, -1))

	return producto
}

function dadoraDeEventosAgregar() {
	const botones = document.querySelectorAll('.add-to-cart')
	const botonesArray = Array.from(botones)

	botonesArray.forEach((el) => {
		el.addEventListener('click', (e) => {
			let id = e.target.parentNode.id
			let producto = buscadoraAPartirDeId(id)

			Swal.fire({
				titleText: 'Agregaste ' + producto.title,
				imageUrl: producto.image,
				timer: 1000,
				timerProgressBar: true,
				showConfirmButton: false,
				toast: true,
				position: 'bottom-start',
			})

			agregadoraACarrito(producto)
			mostradoraDeCarrito()
		})
	})
}

function dadoraDeEventosMas() {
	const botones = document.querySelectorAll('.cantidad-btn-mas')
	const botonesArray = Array.from(botones)

	botonesArray.forEach((boton) => {
		boton.addEventListener('click', (e) => {
			let id = Carrito.findIndex(
				(ele) => ele.id == e.target.parentNode.parentNode.id.slice(0, -1)
			)
			Carrito[id].cantidad += 1
			mostradoraDeCarrito()
		})
	})
}

function dadoraDeEventosMenos() {
	const botones = document.querySelectorAll('.cantidad-btn-menos')
	const botonesArray = Array.from(botones)

	botonesArray.forEach((boton) => {
		boton.addEventListener('click', (e) => {
			let id = Carrito.findIndex(
				(ele) => ele.id == e.target.parentNode.parentNode.id.slice(0, -1)
			)
			if (Carrito[id].cantidad == 1) {
				Carrito.splice(id, 1)
			} else {
				Carrito[id].cantidad -= 1
			}
			mostradoraDeCarrito()
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
				<div class="cantidad-box">
					<button class="cantidad-btn cantidad-btn-menos">−</button>
					<span class="cantidad-num">${el.cantidad}</span>
					<button class="cantidad-btn cantidad-btn-mas">+</button>
				</div>
				<span class="price">$${el.price * el.cantidad}</span>
			</div>`
		cartItems.innerHTML += producto
	})

	total.innerHTML = ''
	dadoraDeEventosMas()
	dadoraDeEventosMenos()
	localStorage.setItem('carrito', JSON.stringify(Carrito))
	total.innerHTML = calculadoraTotal()
}

btnTerminarCompra.addEventListener('click', () => {
	console.log(Carrito.length)
	if (Carrito.length == 0) {
		Swal.fire({
			titleText: 'No tenes nada en el carrito ¿Que queres?',
			showConfirmButton: false,
			timer: 5000,
		})
		return
	}

	Swal.fire({
		titleText: '¿Esta seguro de que quiere terminar su compra?',
		showCancelButton: true,
	}).then((res) => {
		if (res.isConfirmed) {
			Carrito = []
			localStorage.removeItem('carrito')
			mostradoraDeCarrito()
			Swal.fire('Los productos van a llegar a su casa')
		} else {
			Swal.fire('Siga comprando tranquilo')
		}
	})
})

run()

// Ejemplo para Hector:
// btnTerminarCompra.style.right = "56px"

// Swal.fire({
// 	titleText: 'Agregaste ' + producto.title,
// 	html: `
// 		<input id="swal-input1" class="swal2-input" placeholder="Nombre">
// 		<input id="swal-input2" class="swal2-input" placeholder="Email">
// 	`,
// 	preConfirm: () => {
// 		const nombre = document.getElementById('swal-input1').value
// 		const email = document.getElementById('swal-input2').value

// 		if (!nombre || !email) {
// 			Swal.showValidationMessage('Completá ambos campos')
// 			return false
// 		}

// 		return { nombre, email }
// 	},
// }).then((result) => {
// 	console.log(result)
// })
