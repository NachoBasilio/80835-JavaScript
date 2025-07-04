let botonRegistro = document.getElementById('boton-registro')
let botonVolver = document.getElementById('boton-volver')
let formularioLogin = document.getElementById('formulario-login')

let usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || []

botonVolver.addEventListener('click', () => {
	history.back()
})

botonRegistro.addEventListener('click', () => {
	window.location.href = 'register.html'
})

function verSiExisteElUsuarioEnLaLista(nombreUsuario) {
	return usuariosRegistrados.find((usuario) => {
		return usuario.nombre == nombreUsuario
	})
}

function logear(nombreDeUsuario, contraseñaDeUsuario) {
	console.log(usuariosRegistrados)
	let usuarioALogear = usuariosRegistrados.find(
		(usuario) =>
			usuario.nombre == nombreDeUsuario &&
			usuario.contraseña == contraseñaDeUsuario
	)

	if (!usuarioALogear) {
		Swal.fire('Tu contraseña esta mal')
	} else {
		localStorage.setItem('loggedIn', nombreDeUsuario)
		Swal.fire('Esta logeado')
		setTimeout(() => {
			window.location.href = '../index.html'
		}, 500)
	}
}

formularioLogin.addEventListener('submit', (e) => {
	e.preventDefault()
	let elUsuarioYaExiste = verSiExisteElUsuarioEnLaLista(e.target[0].value)

	if (!elUsuarioYaExiste) {
		Swal.fire('No tenes cuenta')
	} else {
		logear(e.target[0].value, e.target[1].value)
	}
})
