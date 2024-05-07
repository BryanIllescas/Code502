function analizarCodigoFuente(codigoFuente) {
    // Definir una lista para almacenar los tokens
    let tokens = [];

    // Expresiones regulares para identificar tokens
    let regexPalabrasClave = /\b(si|sino|mientras|entero|flotante)\b/g;
    let regexIdentificadores = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
    let regexNumeros = /\b\d+(\.\d+)?\b/g;
    let regexOperadores = /[\+\-\*\/=<>!]+/g;
    let regexDelimitadores = /[\(\)\{\}\[\],;]/g;
    let regexComentarios = /\/\/.*|\/\*[\s\S]*?\*\//g;
    let regexCadenaCaracteres = /\".*?\"/g;

    // Buscar y clasificar los tokens en el código fuente
    codigoFuente.replace(regexPalabrasClave, match => tokens.push({ tipo: 'Palabra clave', valor: match }));
    codigoFuente.replace(regexIdentificadores, match => tokens.push({ tipo: 'Identificador', valor: match }));
    codigoFuente.replace(regexNumeros, match => tokens.push({ tipo: 'Número', valor: match }));
    codigoFuente.replace(regexOperadores, match => tokens.push({ tipo: 'Operador', valor: match }));
    codigoFuente.replace(regexDelimitadores, match => tokens.push({ tipo: 'Delimitador', valor: match }));
    codigoFuente.replace(regexComentarios, match => tokens.push({ tipo: 'Comentario', valor: match }));
    codigoFuente.replace(regexCadenaCaracteres, match => tokens.push({ tipo: 'Cadena de caracteres', valor: match }));

    // Retornar la lista de tokens
    return tokens;
}

function analizarCodigo() {
    let codigoFuente = document.getElementById('codigoFuente').value;
    let tokens = analizarCodigoFuente(codigoFuente);
    mostrarTokens(tokens);
}

function mostrarTokens(tokens) {
    let listaTokens = document.getElementById('listaTokens');
    listaTokens.innerHTML = ''; // Limpiar la lista de tokens

    tokens.forEach(token => {
        let listItem = document.createElement('li');
        listItem.textContent = `${token.tipo}: ${token.valor}`;
        listaTokens.appendChild(listItem);
    });
}
