function resaltarSimbolos(codigoFuente) {
    let contenidoResaltado = codigoFuente;
    // Resaltar llaves {}
    contenidoResaltado = contenidoResaltado.replace(/(\{|\})/g, '<span style="color: yellow;">$1</span>');
    // Resaltar paréntesis ()
    contenidoResaltado = contenidoResaltado.replace(/(\(|\))/g, '<span style="color: yellow;">$1</span>');
    return contenidoResaltado;
}

function resaltarPalabrasReservadas(codigoFuente) {
    let contenidoResaltado = codigoFuente;
    Object.keys(window.TOKENS).forEach(function(palabra) {
        let color = window.TOKENS[palabra].color;
        if (color) {
            let regex = new RegExp("\\b" + palabra + "\\b", "g");
            contenidoResaltado = contenidoResaltado.replace(regex, '<span style="color: ' + color + ';">' + palabra + '</span>');
        }
    });
    return contenidoResaltado;
}

function analizarCodigoFuente(codigoFuente) {
    let tokens = [];
    let erroresLexicos = [];

    // Aquí se realizaría el análisis léxico y se obtendrían los tokens y errores léxicos
    // Por ahora, simplemente devolvemos un objeto vacío

    // Resaltar palabras reservadas
    let contenidoResaltado = resaltarPalabrasReservadas(codigoFuente);
    // Resaltar símbolos
    contenidoResaltado = resaltarSimbolos(contenidoResaltado);

    return { contenidoResaltado: contenidoResaltado, tokens: tokens, erroresLexicos: erroresLexicos };
}

