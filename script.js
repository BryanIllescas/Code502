document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-analisis-lexico').addEventListener('click', analizarCodigo);
});

function analizarCodigo() {
    let codigoFuente = document.getElementById('codigoFuente').value;
    let codigoResaltado = resaltarPalabrasReservadas(codigoFuente);
    document.getElementById('resultado-texto').innerHTML = codigoResaltado;
}

// Listas de tokens, palabras clave y símbolos
let nottkns = ['\t', ',', '\s', '\n', 'none', null, ' ', ''];
let palabrasClave = ["Entera", "Gaseosa", "Almendra", "Descremada", "Cafe", "Deslactosada", "Carrito", "Caja", "canasta-carrito", "Arroz", "Jabón", "Licor", "Papel", "Escaner", "salida", "muestra", "muestrafin", "producto", "sucursal", "marcas", "gondola", "botella;", "disponible", "ocupado", "guardia", "cantidad", "bandaentera", "camaras", "hay", "no-hay", "aquí"];
let tipos = ['void', 'str', 'float', 'int'];
let simbolosEspeciales = [';', '{', '}', '<<', '(', ')', '{'];
let simbolos = ['(', ')', '{', '}'];
let simbolosEsp = ['='];
let operadores = ['+', '*', '-', '/', '='];
let operadoresError = ['+', '*', '-', '/', '=', "#", '@'];

// Mapeo de palabras clave JAVA a CMARKET
let palabrasClaveMap = {
    "If": "hay",
    "else": "no-hay",
    "this": "aquí",
    "INT": "Entera",
    "VOID": "Gaseosa",
    "STRING": "Almendra",
    "FLOAT": "Descremada",
    "BOOL": "Cafe",
    "DOUBLE": "Deslactosada",
    "WHILE": "Carrito",
    "for": "Caja",
    "Do-while": "canasta-carrito",
    "Public": "Arroz",
    "Private": "Jabón",
    "Protected": "Licor",
    "Default": "Papel",
    "system": "Escaner",
    "out": "salida",
    "print": "muestra",
    "println": "muestrafin",
    "class": "producto",
    "static": "sucursal",
    "switch": "marcas",
    "case": "gondola",
    "break;": "botella",
    "VERDADERO": "disponible",
    "FALSO": "ocupado",
    "return": "guardia",
    "try": "",
    "catch": "",
    "Integer": "cantidad",
    "ParseInt()": "bandaentera",
    ";": "#",
    "readLine()": "camaras"
};

function mostrarTokens(tokens) {
    let tablaTokens = document.getElementById('tablaTokens').getElementsByTagName('tbody')[0];
    tablaTokens.innerHTML = ''; // Limpiar la tabla de tokens

    tokens.forEach(token => {
        let fila = `<tr>
                        <td>${token.linea}</td>
                        <td>${token.tipo}</td>
                        <td>${token.token}</td>
                        <td>${token.regex}</td>
                        <td>${token.subtipo}</td>
                        <td>${token.valor}</td>
                    </tr>`;
        tablaTokens.innerHTML += fila;
    });
}

function mostrarErrores(erroresLexicos) {
    let tablaErrores = document.getElementById('tablaErrores').getElementsByTagName('tbody')[0];
    tablaErrores.innerHTML = ''; // Limpiar la tabla de errores léxicos

    erroresLexicos.forEach(error => {
        let fila = `<tr>
                        <td>${error.linea}</td>
                        <td>${error.tipo}</td>
                        <td>${error.token}</td>
                        <td>${error.regex}</td>
                        <td>${error.subtipo}</td>
                        <td>${error.valor}</td>
                        <td>${error.tipoError}</td>
                        <td>${error.error}</td>
                    </tr>`;
        tablaErrores.innerHTML += fila;
    });
}
