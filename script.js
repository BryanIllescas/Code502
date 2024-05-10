document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-analisis-lexico').addEventListener('click', analizarCodigo);
});

function analizarCodigo() {
    let codigoFuente = document.getElementById('codigoFuente').value;
    let codigoResaltado = resaltarPalabrasReservadas(codigoFuente);
    document.getElementById('resultado-texto').innerHTML = codigoResaltado;
}

function mostrarTokens(tokens) {
    // Esta función ya no es necesaria para el nuevo requerimiento
}

function mostrarErrores(erroresLexicos) {
    // Esta función ya no es necesaria para el nuevo requerimiento
}

