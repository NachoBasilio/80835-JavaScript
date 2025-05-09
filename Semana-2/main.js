// Ejercicio 1: Autenticación básica
// Simula un login con usuario y contraseña predefinidos.

// const userDB = "IgnaDev"
// const passDB = "GojoUnCapo"
// let cantidadDeIntentos = 3
// let ingreso = false

// for (let i = 0; i < cantidadDeIntentos; i++) {
//     let username = prompt("Cual es tu user")
//     let contraseña = prompt("Cual es tu contraseña")

//     if(username == null || contraseña == null){
//         alert("O la contraseña o el usuario estan vacios")
//     }else{
//         if(userDB === username && passDB === contraseña){
//             alert("¡¡¡Entraste!!!")
//             ingreso = true
//         }else if(userDB === username && passDB != contraseña){
//             alert("Tu contraseña es incorrecta")
//         }else if (userDB != username && passDB === contraseña){
//             alert("Tu usuario es incorrecto")
//         }else{
//             alert("¡Ta todo mal!")
//         }
//     }
// }

// //ingreso === false
// if(!ingreso){
//     alert("No entraste, ya te mande a la polesia")
// }

// //ingreso === true
// if(ingreso){

// }

let saldoUser = Number(prompt("¿Cuanta plata tiene en el banco?"))

if(isNaN(saldoUser)){
    saldoUser = null
}


let saldo = saldoUser ?? 0 //null undefined
let bandera = true
let montonMinimoParaPoderPedirUnRePrestamo = 8000
let deuda = 0

while(bandera){
        let menu = Number(prompt("¡Bienvenidos a Perrito con Chaucha Bank\n ¿Que quiere hacer?\n 1- depositar\n 2- ver saldo\n 3- retirar\n 4- trasferencia\n 5- prestamo\n 6- ver deuda \n 8- salir"))

        if (!isNaN(menu)){
        switch (menu) {
            case 1:
                let montoDeposito = Number(prompt("¿Cuanto quiere ingresar?"))
                if(montoDeposito > 0){
                //saldo = saldo + monto
                saldo += montoDeposito
                }else{
                    alert("No puede ingresar valores negativos")
                }
            break
            case 2:
                alert(saldo)
            break
            case 3:
                let montoRetirar = Number(prompt("¿Cuanto quiere sacar?"))
                if(montoRetirar > 0){//Que no sea negativo
                    if(montoRetirar > saldo){//Que no quiera retirar mas plata que la que tiene
                        alert("No podes retirar mas dinero que el que tenes...")
                    }else{
                        saldo -= montoRetirar
                    }
                }else{
                    alert("Que te crees?")
                }
            break
            case 4:
                let alias = prompt("¿Cual es el alias de la persona a trasferir?")
                if(alias == null || alias.length <= 8){
                    alert("Tiene que ingresar un alias correcto")
                }else{
                    let montoATrasferir = Number(prompt("¿Cuanto quiere trasferir?"))
                    if(montoATrasferir > 0){
                        if(montoATrasferir <= saldo){
                            saldo -= montoATrasferir
                        }else{
                            alert("No tienes ese dinero, proyecto sugar not found")
                        }
                    }else{
                        alert("No podes poner numeros negativos")
                    }
                }
            break
            case 5:
                if(saldo > montonMinimoParaPoderPedirUnRePrestamo){
                    alert("Usted puede pedir prestado")
                    let montoAPedirPrestado = Number(prompt("¿Cuanto quiere pedir prestado?"))
                    if(montoAPedirPrestado > 0){
                        alert("Usted nos va a tener que devolver " + montoAPedirPrestado * 1.5)
                        saldo += montoAPedirPrestado
                        deuda += montoAPedirPrestado
                        console.log(deuda)
                    }else{
                        alert("¿Le queres prestar vos al banco?")
                    }
                }else{
                    alert("*Le pega con una escoba*")
                }
            break
            case 6:
                if(deuda == 0){
                    alert("Usted no tiene deudas")
                }else{
                    alert(`Su deuda es de: ${deuda}.`)
                }
            break
            case 8:
                bandera = false
            break
            default:
                alert("Esa opcion no la tenemos")
            break
            }
        }else{
            alert("Tiene que ser un numero")
        }
}










