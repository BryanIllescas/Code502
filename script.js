document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-analisis-lexico').addEventListener('click', analizarCodigo);
});

function analizarCodigo() {
    let codigoFuente = document.getElementById('codigoFuente').value;
    let newCodigoFuente = codigoFuente.toString().replaceAll("\n","|");
    let codigoResaltado = resaltarPalabrasReservadas(codigoFuente);
    document.getElementById('resultado-texto').innerHTML = codigoResaltado;

    let tableRef = document.getElementById("tablaTokens");
    let tableErr = document.getElementById("tablaErrores");

    let tokens = window.TOKENS; // Obtener el objeto de tokens del archivo TOKENS.js
    let palabrasAgregadas = new Set(); // Conjunto para almacenar las palabras ya agregadas

    function separarfilas(Texto, separador){
        var arregloFilas = newCodigoFuente.split(separador);
        let conteoF = 0;

        for (var a = 0; a < arregloFilas.length; a++) {
            conteoF += 1;
            let palabras = arregloFilas[a].split(' '); // Dividir la línea en palabras
            for (var b = 0; b < palabras.length; b++) {
                let palabra = palabras[b];
                // Verificar si la palabra está en las palabras reservadas sin considerar los caracteres adicionales
                let palabraNormalizada = palabra.replace(/[(){}[\],;]/g, '');
                if (tokens[palabraNormalizada] && !palabrasAgregadas.has(palabraNormalizada)) {
                    palabrasAgregadas.add(palabraNormalizada); // Agregar la palabra al conjunto de palabras agregadas
                    let nuevaFila = tableRef.insertRow(-1);
                    let nuevaCelda1 = nuevaFila.insertCell(0); // #
                    nuevaCelda1.textContent = conteoF;
                    let nuevaCelda2 = nuevaFila.insertCell(1); // Palabra
                    nuevaCelda2.textContent = palabraNormalizada;
                    let nuevaCelda3 = nuevaFila.insertCell(2); // No. Linea
                    nuevaCelda3.textContent = a + 1;
                    let nuevaCelda4 = nuevaFila.insertCell(3); // Tipo
                    nuevaCelda4.textContent = tokens[palabraNormalizada].tipo;
                } else if (!palabrasAgregadas.has(palabraNormalizada)) {
                    palabrasAgregadas.add(palabraNormalizada); // Agregar la palabra al conjunto de palabras agregadas
                    let nuevaFilaErr = tableErr.insertRow(-1);
                    let nuevaCeldaErr1 = nuevaFilaErr.insertCell(0); // #
                    nuevaCeldaErr1.textContent = conteoF;
                    let nuevaCeldaErr2 = nuevaFilaErr.insertCell(1); // Palabra
                    nuevaCeldaErr2.textContent = palabraNormalizada;
                    let nuevaCeldaErr3 = nuevaFilaErr.insertCell(2); // No. Linea
                    nuevaCeldaErr3.textContent = a + 1;
                    let nuevaCeldaErr4 = nuevaFilaErr.insertCell(3); // Tipo Error
                    nuevaCeldaErr4.textContent = "Léxico";
                    let nuevaCeldaErr5 = nuevaFilaErr.insertCell(4); // Error
                    nuevaCeldaErr5.textContent = "Token no identificado";
                }
            }
        }
    }
    
    separarfilas(newCodigoFuente,"|")
}
