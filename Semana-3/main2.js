//Vamos a hacer una super calculadora.

// alert("Hola, esta es mi super calculadora")

// let opcion = prompt("¿Que quiere hacer?\n + \n - \n * \n / ")

function suma() {
    let numero1 = Number(prompt("¿Cual es el primero numero?"));
    let numero2 = Number(prompt("¿Cual es el segundo numero?"));

    let suma = numero1 + numero2;

    alert(suma);
}

const menos = function () {
    let numero1 = Number(prompt("¿Cual es el primero numero?"));
    let numero2 = Number(prompt("¿Cual es el segundo numero?"));

    let resta = numero1 - numero2;

    return resta;
};

/**
 * Multiplica dos números y muestra el resultado en una alerta.
 *
 * @param {number} num1 - El primer número a multiplicar.
 * @param {number} num2 - El segundo número a multiplicar.
 * @returns {void} No retorna ningún valor; muestra el resultado en una alerta.
 */
const multi = (num1, num2) => {
    let multi = num1 * num2;

    alert(multi);
};

function divi(num1, num2) {
    let resultado = num1 / num2;

    return resultado;
}

// switch (opcion) {
//     case "+":
//         suma()
//         break;
//     case "-":
//         let retornoDeFuncion = menos()
//         alert(retornoDeFuncion)
//         break;
//     case "*":
//         let numero1 = Number(prompt("¿Cual es el primero numero?"))
//         let numero2 = Number(prompt("¿Cual es el segundo numero?"))
//         multi(numero1, numero2)
//         break;
//     case "/":
//         let num1 = Number(prompt("¿Cual es el primero numero?"))
//         let num2 = Number(prompt("¿Cual es el segundo numero?"))
//         let retorno = divi(num1, num2)
//         alert(retorno)
//         break;
//     default:
//         alert("No es una opcion")
//         break;
// }
