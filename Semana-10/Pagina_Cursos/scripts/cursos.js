let cursoLista = document.getElementById('curso-lista-completo')
let botonVolverAtras = document.getElementById('boton-volver-atras')
let siEstaLogeado = localStorage.getItem('loggedIn') || false
let cursosRealizados =
	JSON.parse(localStorage.getItem(siEstaLogeado + 'cursos-realizados')) || []

function pintadoraDeCards(arregloDeCursos) {
	arregloDeCursos.forEach((curso) => {
		cursoLista.innerHTML += `
                <li id=${curso.id}>
					<img
						src=${curso.imagen}
						alt=${curso.titulo}
					/>
					<div>
						<p class="titulo">${curso.titulo}</p>
						<p class="duracion">${curso.duracion}</p>
						<p class="descripcion">
							${curso.descripcion}
						</p>
                        <input class="inputs-cursos" type="checkbox" /> Marcar como realizado
					</div>
				</li>`
	})
	dadoraDeEventosALosInputs()
}

function dadoraDeEventosALosInputs() {
	let inputsDOM = document.getElementsByClassName('inputs-cursos')
	let inputsArrays = Array.from(inputsDOM)

	inputsArrays.forEach((input) => {
		console.log(cursosRealizados)
		cursosRealizados.forEach((curso) => {
			console.log(curso)
			if (curso.id == input.parentNode.parentNode.id) {
				input.checked = true
			}
		})

		input.addEventListener('change', (evento) => {
			if (!siEstaLogeado) {
				Swal.fire('Debes estar logeado')
				evento.target.checked = false
				setTimeout(() => {
					window.location.href = 'login.html'
				}, 500)
			} else {
				guardarQueCursoYaHice(evento.target.parentNode.parentNode.id)
			}
		})
	})
}

async function llamadoraDeCursosDestacados() {
	let res = await fetch('../data/cursos.json')
	let datos = await res.json()
	return datos
}

function guardarQueCursoYaHice(id) {
	let index = cursosRealizados.findIndex((curso) => curso.id == id)

	if (index != -1) {
		cursosRealizados.splice(index, 1)
	} else {
		cursosRealizados.push({ id })
	}
	localStorage.setItem(
		siEstaLogeado + 'cursos-realizados',
		JSON.stringify(cursosRealizados)
	)
}

botonVolverAtras.addEventListener('click', () => {
	history.back()
})

document.addEventListener('DOMContentLoaded', async (e) => {
	let cursosDestacados = await llamadoraDeCursosDestacados()
	pintadoraDeCards(cursosDestacados)
})
