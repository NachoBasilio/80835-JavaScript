// Ejercicio 1: Autenticación básica
// Simula un login con usuario y contraseña predefinidos.

multi(3, 5);

const userDB = "nacho";
const passDB = "1235";
let saldo;
let montonMinimoParaPoderPedirUnRePrestamo = 8000;
let deuda = 0;

// const credencial = login(username, contraseña)

// function login(usuario, pass){
//     let cantidadDeIntentos = 2

//     for (let i = 0; i < cantidadDeIntentos; i++) {
//         if(usuario == null || pass == null){
//             alert("O la contraseña o el usuario estan vacios")
//         }else{
//             if(userDB === usuario && passDB === pass){
//                 alert("¡¡¡Entraste!!!")
//                 return true
//             }else if(userDB === usuario && passDB != pass){
//                 alert("Tu contraseña es incorrecta")
//             }else if (userDB != usuario && passDB === pass){
//                 alert("Tu usuario es incorrecto")
//             }else{
//                 alert("¡Ta todo mal!")
//             }
//             usuario = prompt("Cual es tu user")
//             pass = prompt("Cual es tu contraseña")
//         }
//     }

//     alert("Ahi va la polesia a tu casa")
//     return false
// }

function login(usuario, pass) {
    if (usuario == null || pass == null) {
        alert("O la contraseña o el usuario estan vacios");
    } else {
        if (userDB === usuario && passDB === pass) {
            alert("¡¡¡Entraste!!!");
            return true;
        } else if (userDB === usuario && passDB != pass) {
            alert("Tu contraseña es incorrecta");
        } else if (userDB != usuario && passDB === pass) {
            alert("Tu usuario es incorrecto");
        } else {
            alert("¡Ta todo mal!");
        }
    }
    return false;
}

function depositar() {
    let montoDeposito = Number(prompt("¿Cuanto quiere ingresar?"));
    if (montoDeposito > 0) {
        saldo += montoDeposito;
    } else {
        alert("No puede ingresar valores negativos");
    }
}

function retirar(montoRetirar) {
    if (montoRetirar > 0) {
        //Que no sea negativo
        if (montoRetirar > saldo) {
            //Que no quiera retirar mas plata que la que tiene
            alert("No podes retirar mas dinero que el que tenes...");
        } else {
            saldo -= montoRetirar;
        }
    } else {
        alert("Que te crees?");
    }
}

function trasferencia(alias, montoATrasferir) {
    if (alias == null || alias.length <= 8) {
        alert("Tiene que ingresar un alias correcto");
    } else {
        if (montoATrasferir > 0) {
            if (montoATrasferir <= saldo) {
                saldo -= montoATrasferir;
            } else {
                alert("No tienes ese dinero, proyecto sugar not found");
            }
        } else {
            alert("No podes poner numeros negativos");
        }
    }
}

function prestamo() {
    if (saldo > montonMinimoParaPoderPedirUnRePrestamo) {
        alert("Usted puede pedir prestado");
        let montoAPedirPrestado = Number(
            prompt("¿Cuanto quiere pedir prestado?")
        );
        if (montoAPedirPrestado > 0) {
            alert(
                "Usted nos va a tener que devolver " + montoAPedirPrestado * 1.5
            );
            saldo += montoAPedirPrestado;
            deuda += montoAPedirPrestado;
            console.log(deuda);
        } else {
            alert("¿Le queres prestar vos al banco?");
        }
    } else {
        alert("Yo con secos no hablo");
    }
}

function verDeuda() {
    if (deuda == 0) {
        alert("Usted no tiene deudas");
    } else {
        alert(`Su deuda es de: ${deuda}.`);
    }
}

// let username = prompt("Cual es tu user")
// let contraseña = prompt("Cual es tu contraseña")

// let credencial = login(username, contraseña)
// console.log(credencial)

// while(!credencial){
//     username = prompt("Cual es tu user")
//     contraseña = prompt("Cual es tu contraseña")

//     credencial = login(username, contraseña)
//     console.log(credencial)
// }

let credencial;

for (let i = 0; i < 3; i++) {
    let username = prompt("Cual es tu user");
    let contraseña = prompt("Cual es tu contraseña");

    credencial = login(username, contraseña);
    console.log(credencial);

    if (credencial) {
        break;
    }

    if (i == 2) {
        alert("La polesia va en camino");
    }
}

if (credencial) {
    let saldoUser = Number(prompt("¿Cuanta plata tiene en el banco?"));

    if (isNaN(saldoUser)) {
        saldoUser = null;
    }

    saldo = saldoUser ?? 0; //null undefined
    let bandera = true;

    while (bandera) {
        let menu = Number(
            prompt(
                "¡Bienvenidos a Perrito con Chaucha Bank\n ¿Que quiere hacer?\n 1- depositar\n 2- ver saldo\n 3- retirar\n 4- trasferencia\n 5- prestamo\n 6- ver deuda\n 8- salir"
            )
        );

        if (!isNaN(menu)) {
            switch (menu) {
                case 1:
                    depositar();
                    break;
                case 2:
                    alert(saldo);
                    break;
                case 3:
                    let montoRetirar = Number(prompt("¿Cuanto quiere sacar?"));
                    retirar(montoRetirar);
                    break;
                case 4:
                    let alias = prompt(
                        "¿Cual es el alias de la persona a trasferir?"
                    );
                    let montoATrasferir = Number(
                        prompt("¿Cuanto quiere trasferir?")
                    );
                    trasferencia(alias, montoATrasferir);
                    break;
                case 5:
                    prestamo();
                    break;
                case 6:
                    verDeuda();
                    break;
                case 8:
                    bandera = false;
                    break;
                default:
                    alert("Esa opcion no la tenemos");
                    break;
            }
        } else {
            alert("Tiene que ser un numero");
        }
    }
}
