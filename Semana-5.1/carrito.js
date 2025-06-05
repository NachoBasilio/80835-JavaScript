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
		console.log(this.productos)
	}

	quitarProducto(id) {
		console.log('Hola')
		this.llenadoraDeArrayDeIDCarrito()

		let indexCarrito = this.productosCarritoId.indexOf(id)

		if (indexCarrito == -1) {
			alert('No esta este producto en el carrito')
		} else {
			if (this.productos[indexCarrito].cantidad == 1) {
				this.productos.splice(indexCarrito, 1)
			} else {
				this.productos[indexCarrito].cantidad -= 1
			}
		}

		this.sumadorDeTotal()
		console.log(this.productos)
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
