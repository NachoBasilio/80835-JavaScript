// const Nombres = ['Lucas', 'David', 'German']

// const NumerosReLocos = [1, 4, 7, 11, 33, 2, 5, 76, 19]

// console.log(Nombres.indexOf('David'))

// console.log(typeof Nombres)

// const Auto = {
// 	color: 'Rojo',
// 	ruedas: 4,
// 	arrancar: function () {
// 		console.log(this)

// 		console.log('BRRRRRR')
// 	},
// }

// console.log(Auto.color)

// Auto.arrancar()

// console.log(Nombres)

// Nombres.splice(1, 0, 'Nacho')

// console.log(Nombres)

// let valorEliminado = Nombres.pop()

// console.log(valorEliminado)

// console.log(NumerosReLocos)

// NumerosReLocos.sort()

// console.log(NumerosReLocos)

// NumerosReLocos.splice(0, 0, 'hola', 'soy', 'cosas nuevas')

const Productos = []
let Carrito = []
let bandera = true
let total = 0

function funcionCreadoraDeProductos(nombreProducto, precioProducto) {
	const objAux = {
		nombre: nombreProducto,
		precio: precioProducto,
	}

	Productos.push(objAux)
}

function mostrarLosProductos() {
	if (Productos.length == 0) {
		alert('No hay productos')
		return
	}

	let mensaje = 'Los productos son:\n '

	for (let i = 0; i < Productos.length; i++) {
		mensaje += `\n ${Productos[i].nombre} - $ ${Productos[i].precio}`
		//mensaje + "\n" + Productos[i].nombre + " - $ " + Productos[i].precio
	}

	alert(mensaje)
}

const funcionSeparadoraPorNombre = (array) => {
	const nombresProductos = []

	for (let i = 0; i < array.length; i++) {
		nombresProductos.push(array[i].nombre)
	}

	return nombresProductos
}

const funcionBuscadora = function (nombreABuscar) {
	const Nombres = funcionSeparadoraPorNombre(Productos)

	let index = Nombres.indexOf(nombreABuscar)

	if (index == -1) {
		alert('Ese producto no lo tenemos')
	} else {
		const NombresCarrito = funcionSeparadoraPorNombre(Carrito)

		let index2 = NombresCarrito.indexOf(nombreABuscar)

		console.log(NombresCarrito)

		if (index2 == -1) {
			let objetoDelCarrito = {
				nombre: Productos[index].nombre,
				precio: Productos[index].precio,
				cantidad: 1,
			}
			Carrito.push(objetoDelCarrito)
		} else {
			Carrito[index2].cantidad += 1
		}
	}
}

const verCarrito = () => {
	let mensaje = 'Estos son los productos en tu carrito:\n'
	total = 0

	for (let i = 0; i < Carrito.length; i++) {
		total += Number(Carrito[i].precio) * Carrito[i].cantidad
	}

	for (let i = 0; i < Carrito.length; i++) {
		mensaje += `\n * ${Carrito[i].nombre} - $ ${Carrito[i].precio} - ctn: ${Carrito[i].cantidad}`
	}

	mensaje += `\n El total es de $ ${total}`

	alert(mensaje)
}

function terminarCompra() {
	alert('Muchas gracias por su compra, no se olvide el ticket ' + total)
	Carrito = []
}

const menu =
	'Bienvenidos a perritoConCauchaStore\n 1- Ver productos\n 2- Agregar productos al listado\n 3- Agregar producto al carrito\n 4- Ver carrito\n 5- Terminar compra\n 0- Salir'

while (bandera) {
	let opciones = Number(prompt(menu))

	switch (opciones) {
		case null:
		case 0:
			bandera = false
			break
		case 1:
			mostrarLosProductos()
			break
		case 2:
			let auxNombre = prompt('Como se llama el producto')
			let auxPrecio = prompt('Cuanto vale el producto')
			funcionCreadoraDeProductos(auxNombre, auxPrecio)
			break
		case 3:
			let auxProductoABuscar = prompt('¿Que producto quiere comprar?')
			funcionBuscadora(auxProductoABuscar)
			break
		case 4:
			verCarrito()
			break
		case 5:
			terminarCompra()
			break
		default:
			alert('No tenemos esta opcion')
			break
	}
}
