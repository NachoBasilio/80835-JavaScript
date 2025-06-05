class Carrito {
	constructor() {
		this.productos = []
		this.productosCarritoId = []
		this.total = 0
	}

	agregarProducto(id, cantidad = 1) {
		this.llenadoraDeArrayDeIDCarrito()

		let indexCarrito = this.productosCarritoId.indexOf(id)

		if (indexCarrito == -1) {
			this.productos.push(arrayProductosVideoJuegos[id - 1])
			this.productos[this.productos.length - 1].cantidad = cantidad
		} else {
			this.productos[indexCarrito].cantidad += cantidad
		}

		this.sumadorDeTotal()
	}

	mostradorDeCarrito() {
		if (this.productos.length == 0) {
			alert('No tiene nada en el carrito')
		} else {
			let mensaje = 'Los prodcutos en el carrito que tenes son estos:\n '

			for (let i = 0; i < this.productos.length; i++) {
				mensaje += `\n Nombre: ${this.productos[i].nombre} - $ ${this.productos[i].precio} - ${this.productos[i].cantidad}`
			}

			mensaje += `\n\n Su total es de: ${this.total}`

			alert(mensaje)
		}
	}

	quitarProductoDelCarrito(id) {
		this.llenadoraDeArrayDeIDCarrito()

		let index = this.productosCarritoId.indexOf(id)

		if (index == -1) {
			alert('No esta el producto en el carrito')
			return
		}

		if (this.productos[index].cantidad == 1) {
			this.productos.splice(index, 1)
		} else {
			this.productos[index].cantidad -= 1
		}

		this.sumadorDeTotal()
	}

	llenadoraDeArrayDeIDCarrito() {
		this.productosCarritoId = []
		for (let i = 0; i < this.productos.length; i++) {
			this.productosCarritoId.push(this.productos[i].id)
		}
	}

	sumadorDeTotal() {
		this.total = 0

		for (let i = 0; i < this.productos.length; i++) {
			this.total += this.productos[i].precio * this.productos[i].cantidad
		}
	}

	terminarCompra() {
		alert('Gracias por su compra, este es su total: ' + this.total)

		this.total = 0
		this.productos = []
		this.productosCarritoId = []
	}
}
