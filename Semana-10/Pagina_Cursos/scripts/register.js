let botonVolver = document.getElementById('boton-volver')
let formularioRegistro = document.getElementById('formulario-registro')
let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || []

botonVolver.addEventListener('click', () => {
	history.back()
})

function verSiExisteElUsuarioEnLaLista(nombreUsuario) {
	return usuariosRegistrados.find((usuario) => {
		return usuario.nombre == nombreUsuario
	})
}

formularioRegistro.addEventListener('submit', (e) => {
	e.preventDefault()
	let elUsuarioYaExiste = verSiExisteElUsuarioEnLaLista(e.target[0].value)
	console.log(elUsuarioYaExiste)
	if (elUsuarioYaExiste) {
		Swal.fire('El usuario ya existe')
	} else {
		usuariosRegistrados.push({
			nombre: e.target[0].value,
			contraseña: e.target[1].value,
		})
		localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados))
		Swal.fire('Registraste el usuario')
	}
})
