// function analizarCodigoFuente(codigoFuente) {
//     // Definir una lista para almacenar los tokens
//     let tokens = [];

//     // Expresiones regulares para identificar tokens
//     let regexPalabrasClave = /\b(si|sino|mientras|entero|flotante)\b/g;
//     let regexIdentificadores = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
//     let regexNumeros = /\b\d+(\.\d+)?\b/g;
//     let regexOperadores = /[\+\-\*\/=<>!]+/g;
//     let regexDelimitadores = /[\(\)\{\}\[\],;]/g;
//     let regexComentarios = /\/\/.*|\/\*[\s\S]*?\*\//g;
//     let regexCadenaCaracteres = /\".*?\"/g;

//     // Buscar y clasificar los tokens en el código fuente
//     codigoFuente.replace(regexPalabrasClave, match => tokens.push({ tipo: 'Palabra clave', valor: match }));
//     codigoFuente.replace(regexIdentificadores, match => tokens.push({ tipo: 'Identificador', valor: match }));
//     codigoFuente.replace(regexNumeros, match => tokens.push({ tipo: 'Número', valor: match }));
//     codigoFuente.replace(regexOperadores, match => tokens.push({ tipo: 'Operador', valor: match }));
//     codigoFuente.replace(regexDelimitadores, match => tokens.push({ tipo: 'Delimitador', valor: match }));
//     codigoFuente.replace(regexComentarios, match => tokens.push({ tipo: 'Comentario', valor: match }));
//     codigoFuente.replace(regexCadenaCaracteres, match => tokens.push({ tipo: 'Cadena de caracteres', valor: match }));

//     // Retornar la lista de tokens
//     return tokens;
// }

// function analizarCodigo() {
//     let codigoFuente = document.getElementById('codigoFuente').value;
//     let tokens = analizarCodigoFuente(codigoFuente);
//     mostrarTokens(tokens);
// }

// function mostrarTokens(tokens) {
//     let listaTokens = document.getElementById('listaTokens');
//     listaTokens.innerHTML = ''; // Limpiar la lista de tokens

//     tokens.forEach(token => {
//         let listItem = document.createElement('li');
//         listItem.textContent = `${token.tipo}: ${token.valor}`;
//         listaTokens.appendChild(listItem);
//     });
// }


function analizarCodigoFuente(codigoFuente) {
    // Definir una lista para almacenar los tokens y errores léxicos
    let tokens = [];
    let erroresLexicos = [];

    // Expresiones regulares para identificar tokens
    let regexPalabrasClave = /\b(do-while|for|while|if|if\selse|if\selse\sif|return|Switch|public|Private|Protected|Default|INT|VOID|STRING|FLOAT|BOOL|DOUBLE)\b/g;
    let regexIdentificadores = /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g;
    let regexNumeros = /\b\d+(\.\d+)?\b/g;
    let regexOperadores = /[\+\-\*\/=%<>]+/g;
    let regexDelimitadores = /[\(\)\{\}\[\],;]/g;
    let regexCadenaCaracteres = /\".*?\"/g;

    // Buscar y clasificar los tokens en el código fuente
    codigoFuente.replace(regexPalabrasClave, match => tokens.push({ tipo: 'Palabra clave', valor: match }));
    codigoFuente.replace(regexIdentificadores, match => tokens.push({ tipo: 'Identificador', valor: match }));
    codigoFuente.replace(regexNumeros, match => tokens.push({ tipo: 'Número', valor: match }));
    codigoFuente.replace(regexOperadores, match => tokens.push({ tipo: 'Operador', valor: match }));
    codigoFuente.replace(regexDelimitadores, match => tokens.push({ tipo: 'Delimitador', valor: match }));
    codigoFuente.replace(regexCadenaCaracteres, match => tokens.push({ tipo: 'Cadena de caracteres', valor: match }));

    // Buscar errores léxicos
    let palabrasReservadas = ['agua-pura', 'Caja', 'Carrito', 'guardia', 'marcas', 'Arroz', 'Jabon', 'Licor', 'Papel', 'Entera', 'Gaseosa', 'Almendra', 'Descremada', 'Cafe', 'Deslactosada', 's+', 'r-', 'm*', '%', 'p_', 'g_', 'p~', 'g~', '_', 'o'];
    let palabrasEncontradas = tokens.map(token => token.valor);
    palabrasEncontradas.forEach(palabra => {
        if (!palabrasReservadas.includes(palabra)) {
            erroresLexicos.push({ token: palabra, error: 'Token no reconocido' });
        }
    });

    // Retornar la lista de tokens y errores léxicos
    return { tokens: tokens, erroresLexicos: erroresLexicos };
}

function analizarCodigo() {
    let codigoFuente = document.getElementById('codigoFuente').value;
    let { tokens, erroresLexicos } = analizarCodigoFuente(codigoFuente);
    mostrarTokens(tokens);
    mostrarErrores(erroresLexicos);
}

function mostrarTokens(tokens) {
    let tablaTokens = document.getElementById('tablaTokens');
    tablaTokens.innerHTML = ''; // Limpiar la tabla de tokens

    tokens.forEach(token => {
        let fila = `<tr><td>${token.tipo}</td><td>${token.valor}</td></tr>`;
        tablaTokens.innerHTML += fila;
    });
}

function mostrarErrores(erroresLexicos) {
    let tablaErrores = document.getElementById('tablaErrores');
    tablaErrores.innerHTML = ''; // Limpiar la tabla de errores léxicos

    erroresLexicos.forEach(error => {
        let fila = `<tr><td>${error.token}</td><td>${error.error}</td></tr>`;
        tablaErrores.innerHTML += fila;
    });
}
