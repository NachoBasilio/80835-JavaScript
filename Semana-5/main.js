// function Persona(nombre, edad) {
// 	this.nombre = nombre
// 	this.edad = edad

// 	console.log('Hola soy una funcion constructora')

// 	this.saludar = function () {
// 		console.log('Holaaaaaa')
// 	}
// }

// const persona1 = new Persona('Agustina', 33)

// persona1.saludar()

// const persona2 = Persona('Agustina', 33)

// console.log(persona1)
// console.log(persona2)

const videojuegos = [
	{ nombre: 'The Legend of Zelda: Breath of the Wild', precio: 6500, id: 1 },
	{ nombre: 'God of War: Ragnarok', precio: 7200, id: 2 },
	{ nombre: 'Red Dead Redemption 2', precio: 5800, id: 3 },
	{ nombre: 'Elden Ring', precio: 6900, id: 4 },
	{ nombre: 'Minecraft', precio: 3000, id: 5 },
	{ nombre: 'POKEMON', precio: 6000, id: 6 },
	{ nombre: 'Call of Duty: Modern Warfare II', precio: 7500, id: 7 },
	{ nombre: 'Grand Theft Auto V', precio: 4000, id: 8 },
	{ nombre: 'Super Mario Odyssey', precio: 5500, id: 9 },
	{ nombre: 'Hogwarts Legacy', precio: 7000, id: 10 },
]

class Producto {
	constructor(nombre, precio, id) {
		this.nombre = nombre
		this.precio = precio
		this.id = id
		this.cantidad = 0
	}
}

const fabricaDeProductos = () => {
	const auxArray = []

	for (let i = 0; i < videojuegos.length; i++) {
		let objetoAux = new Producto(
			videojuegos[i].nombre,
			videojuegos[i].precio,
			videojuegos[i].id
		)

		auxArray.push(objetoAux)
	}

	return auxArray
}

const arrayProductosVideoJuegos = fabricaDeProductos()

const CarritoInstance = new Carrito()

/**
 * Muestra una lista de productos de videojuegos en un cuadro de alerta.
 *
 * Recorre el array global `arrayProductosVideoJuegos`, construye un mensaje
 * con los detalles de cada producto (ID, nombre y precio), y lo muestra en una alerta.
 *
 * Nota: Se espera que `arrayProductosVideoJuegos` sea un arreglo de objetos
 * con las propiedades: `id`, `nombre` y `precio`.
 */
const mostradoraDeProductos = () => {
	let mensaje = 'Los prodcutos que tenemos son estos:\n '

	for (let i = 0; i < arrayProductosVideoJuegos.length; i++) {
		mensaje += `\n ID: ${arrayProductosVideoJuegos[i].id} - Nombre: ${arrayProductosVideoJuegos[i].nombre} - $ ${arrayProductosVideoJuegos[i].precio}`
	}

	alert(mensaje)
}

function core() {
	let bandera = true
	while (bandera) {
		let opciones = Number(
			prompt(
				'Bienvenidos a Perrito con Chaucha Store:\n 1-Ver productos\n 2-Comprar a partir de id \n 3-Ver carrito \n 4-Quitar producto a partir de un id \n 5-Comprar'
			)
		)

		switch (opciones) {
			case 0:
				bandera = false
				break
			case 1:
				mostradoraDeProductos()
				break
			case 2:
				let id = Number(prompt('Que ID de producto quiere comprar?'))
				CarritoInstance.agregarProducto(id)
				break
			case 3:
				CarritoInstance.mostradorDeCarrito()
				break
			case 4:
				let idBorrar = Number(prompt('Que ID de producto quiere comprar?'))
				CarritoInstance.quitarProductoDelCarrito(idBorrar)
				break
			case 5:
				CarritoInstance.terminarCompra()
				break
			default:
				break
		}
	}
}

core()
