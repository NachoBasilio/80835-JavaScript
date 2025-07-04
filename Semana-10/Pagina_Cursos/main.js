let cursoLista = document.getElementById('curso-lista')
let iniciaSesion = document.getElementById('inicia-sesion')

let siEstaLogeado = localStorage.getItem('loggedIn') || false

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
					</div>
				</li>`
	})
}

async function llamadoraDeCursosDestacados() {
	let res = await fetch('../data/cursosDestacados.json')
	let datos = await res.json()
	return datos
}

document.addEventListener('DOMContentLoaded', async () => {
	let cursosDestacados = await llamadoraDeCursosDestacados()
	if (siEstaLogeado) {
		iniciaSesion.innerText = siEstaLogeado
	}
	pintadoraDeCards(cursosDestacados)
})
