document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-analisis-lexico').addEventListener('click', analizarCodigo);
});

function limpiarTablas() {
    let tableRef = document.getElementById("tablaTokens");
    let tableErr = document.getElementById("tablaErrores");
    while (tableRef.rows.length > 1) {
        tableRef.deleteRow(1);
    }
    while (tableErr.rows.length > 1) {
        tableErr.deleteRow(1);
    }
}

function analizarCodigo() {
    limpiarTablas(); // Limpia las tablas antes de analizar el código
    let codigoFuente = document.getElementById('codigoFuente').value;
    let newCodigoFuente = codigoFuente.toString().replaceAll("\n","|");
    let codigoResaltado = resaltarPalabrasReservadas(codigoFuente);
    document.getElementById('resultado-texto').innerHTML = codigoResaltado;

    let tableRef = document.getElementById("tablaTokens");
    let tableErr = document.getElementById("tablaErrores");

    let tokens = window.TOKENS; // Obtener el objeto de tokens del archivo TOKENS.js

    function separarfilas(Texto, separador){
        var arregloFilas = newCodigoFuente.split(separador);
        let conteoF = 0;

        for (var a = 0; a < arregloFilas.length; a++) {
            conteoF += 1;
            let palabras = arregloFilas[a].split(' '); // Dividir la línea en palabras
            for (var b = 0; b < palabras.length; b++) {
                let palabra = palabras[b].trim(); // Eliminar espacios al inicio y al final de la palabra
                // Ignorar si la palabra es un espacio en blanco
                if (palabra === "") continue;
                
                // Normalizar la palabra eliminando caracteres especiales
                let palabraNormalizada = palabra.replace(/[(){}[\],;"]/g, '');
                // Verificar si la palabra está en las palabras reservadas
                if (tokens[palabraNormalizada]) {
                    let nuevaFila = tableRef.insertRow(-1);
                    let nuevaCelda1 = nuevaFila.insertCell(0); // #
                    nuevaCelda1.textContent = conteoF;
                    let nuevaCelda2 = nuevaFila.insertCell(1); // Palabra
                    nuevaCelda2.textContent = palabraNormalizada;
                    let nuevaCelda3 = nuevaFila.insertCell(2); // No. Linea
                    nuevaCelda3.textContent = a + 1;
                    let nuevaCelda4 = nuevaFila.insertCell(3); // Tipo
                    nuevaCelda4.textContent = tokens[palabraNormalizada].tipo;
                } else if (palabra === "#") {
                    // El símbolo "#" se considera como salto de línea
                    let nuevaFilaErr = tableErr.insertRow(-1);
                    let nuevaCeldaErr1 = nuevaFilaErr.insertCell(0); // #
                    nuevaCeldaErr1.textContent = conteoF;
                    let nuevaCeldaErr2 = nuevaFilaErr.insertCell(1); // Palabra
                    nuevaCeldaErr2.textContent = palabra;
                    let nuevaCeldaErr3 = nuevaFilaErr.insertCell(2); // No. Linea
                    nuevaCeldaErr3.textContent = a + 1;
                    let nuevaCeldaErr4 = nuevaFilaErr.insertCell(3); // Tipo Error
                    nuevaCeldaErr4.textContent = "Léxico";
                    let nuevaCeldaErr5 = nuevaFilaErr.insertCell(4); // Error
                    nuevaCeldaErr5.textContent = "El símbolo '#' debe estar separado de las palabras";
                } else if (/[(){}"]/g.test(palabra)) {
                    // La palabra es un paréntesis, llave o comilla
                    let nuevaFila = tableRef.insertRow(-1);
                    let nuevaCelda1 = nuevaFila.insertCell(0); // #
                    nuevaCelda1.textContent = conteoF;
                    let nuevaCelda2 = nuevaFila.insertCell(1); // Palabra
                    nuevaCelda2.textContent = palabra;
                    let nuevaCelda3 = nuevaFila.insertCell(2); // No. Linea
                    nuevaCelda3.textContent = a + 1;
                    let nuevaCelda4 = nuevaFila.insertCell(3); // Tipo
                    nuevaCelda4.textContent = "Caracter";
                } else {
                    // Verificar si la palabra mal escrita está en las palabras reservadas
                    let palabraCorrecta = Object.keys(tokens).find(key => key.toLowerCase() === palabraNormalizada.toLowerCase());
                    if (palabraCorrecta) {
                        // La palabra está mal escrita pero existe una versión correcta en las palabras reservadas
                        let nuevaFilaErr = tableErr.insertRow(-1);
                        let nuevaCeldaErr1 = nuevaFilaErr.insertCell(0); // #
                        nuevaCeldaErr1.textContent = conteoF;
                        let nuevaCeldaErr2 = nuevaFilaErr.insertCell(1); // Palabra
                        nuevaCeldaErr2.textContent = palabra;
                        let nuevaCeldaErr3 = nuevaFilaErr.insertCell(2); // No. Linea
                        nuevaCeldaErr3.textContent = a + 1;
                        let nuevaCeldaErr4 = nuevaFilaErr.insertCell(3); // Tipo Error
                        nuevaCeldaErr4.textContent = "Léxico";
                        let nuevaCeldaErr5 = nuevaFilaErr.insertCell(4); // Error
                        nuevaCeldaErr5.textContent = "Palabra mal escrita";
                    } else {
                        // La palabra no está en las palabras reservadas
                        let nuevaFila = tableRef.insertRow(-1);
                        let nuevaCelda1 = nuevaFila.insertCell(0); // #
                        nuevaCelda1.textContent = conteoF;
                        let nuevaCelda2 = nuevaFila.insertCell(1); // Palabra
                        nuevaCelda2.textContent = palabraNormalizada;
                        let nuevaCelda3 = nuevaFila.insertCell(2); // No. Linea
                        nuevaCelda3.textContent = a + 1;
                        let nuevaCelda4 = nuevaFila.insertCell(3); // Tipo
                        nuevaCelda4.textContent = "identificador";
                    }
                }
            }
        }
    }
    
    separarfilas(newCodigoFuente,"|")
}
