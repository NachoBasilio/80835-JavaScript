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

const products = [
	{
		id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
		title: 'Juguete de Peluche',
		description: 'Suave peluche con chirriador para horas de diversión.',
		price: 4990,
		image: 'https://placedog.net/400/300?id=1',
		alt: 'Juguete de peluche para perrito',
	},
	{
		id: '9c858901-8a57-4791-81fe-4c455b099bc9',
		title: 'Correa Ajustable',
		description: 'Correa resistente y cómoda, ajustable hasta 2 metros.',
		price: 7990,
		image: 'https://placedog.net/400/300?id=2',
		alt: 'Correa ajustable para perrito',
	},
	{
		id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
		title: 'Cama Ortopédica',
		description: 'Cama ergonómica con espuma de memoria para mayor confort.',
		price: 25990,
		image: 'https://placedog.net/400/300?id=3',
		alt: 'Cama ortopédica para perrito',
	},
	{
		id: 'e4eaaaf2-d142-11e1-b3e4-080027620cdd',
		title: 'Bowl Antideslizante',
		description:
			'Bowl de acero inoxidable con base de silicona antideslizante.',
		price: 3990,
		image: 'https://placedog.net/400/300?id=4',
		alt: 'Bowl antideslizante para perrito',
	},
	{
		id: 'c9bf9e57-1685-4c89-bafb-ff5af830be8a',
		title: 'Pack de Snacks Saludables',
		description: 'Variedad de snacks naturales para premiar a tu mascota.',
		price: 5990,
		image: 'https://placedog.net/400/300?id=5',
		alt: 'Pack de snacks saludables para perrito',
	},
	{
		id: 'adbb3cfa-1234-4f56-9abc-7d9e1234abcd',
		title: 'Arnés Reflectante',
		description:
			'Arnés ergonómico con bandas reflectantes para paseos nocturnos.',
		price: 12990,
		image: 'https://placedog.net/400/300?id=6',
		alt: 'Arnés reflectante para perrito',
	},
	{
		id: 'bb12ef34-5678-4abc-def0-1234567890ab',
		title: 'Cepillo Desenredante',
		description: 'Cepillo suave que elimina nudos y reduce el pelo suelto.',
		price: 2990,
		image: 'https://placedog.net/400/300?id=7',
		alt: 'Cepillo desenredante para perrito',
	},
	{
		id: 'cc23de45-6789-4bcd-0f12-234567890abc',
		title: 'Chaleco Salvavidas',
		description: 'Chaleco con flotador incorporado para actividades acuáticas.',
		price: 18990,
		image: 'https://placedog.net/400/300?id=8',
		alt: 'Chaleco salvavidas para perrito',
	},
	{
		id: 'dd34ef56-7890-4cde-1f23-34567890abcd',
		title: 'Set de Limpieza Dental',
		description:
			'Cepillo y pasta especial para la higiene bucal de tu mascota.',
		price: 3490,
		image: 'https://placedog.net/400/300?id=9',
		alt: 'Set de limpieza dental para perrito',
	},
	{
		id: 'ee45fa67-8901-4def-2g34-4567890abcde',
		title: 'Pañales para Cachorros',
		description:
			'Caja con 20 pañales desechables para tus cachorros en proceso de entrenamiento.',
		price: 6990,
		image: 'https://placedog.net/400/300?id=10',
		alt: 'Pañales desechables para cachorros',
	},
]

cartBtn.addEventListener('click', () => {
	if (!cartPanel.classList.contains('active')) {
		dejoAbiertoElCarrito = true
	} else {
		dejoAbiertoElCarrito = false
	}

	cartPanel.classList.toggle('active')

	localStorage.setItem('carrito_open', JSON.stringify(dejoAbiertoElCarrito))
})

function run() {
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
