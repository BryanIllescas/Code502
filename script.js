document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-analisis-lexico').addEventListener('click', AnalisisLexico);
    document.getElementById('btn-analisis-sintactico').addEventListener('click', AnalisisSintactico);
});

let ExpresionSI = {};
let TipoSI = {};
let ExpresionNO = {};
let conteoFilas = 0;

function limpiarTablas() {
    ExpresionSI = {};
    TipoSI = {};
    ExpresionNO = {};
    conteoFilas = 0;
    
    let tableReferencia = document.getElementById("tablaTokens");
    let tableErrores = document.getElementById("tablaErrores");

    while (tableReferencia.rows.length > 1) {
        tableReferencia.deleteRow(1);
    }

    while (tableErrores.rows.length > 1) {
        tableErrores.deleteRow(1);
    }
}

function llenarTablas(resultado) {
    let tableRef = document.getElementById("tablaTokens").getElementsByTagName('tbody')[0];
    let tableErr = document.getElementById("tablaErrores").getElementsByTagName('tbody')[0];

    // Llenar tabla de tokens
    if (resultado.tokens && resultado.tokens.length > 0) {
        resultado.tokens.forEach((token, index) => {
            let newRow = tableRef.insertRow();
            newRow.insertCell(0).innerText = index + 1;
            newRow.insertCell(1).innerText = token.palabra;
            newRow.insertCell(2).innerText = token.linea;
            newRow.insertCell(3).innerText = token.tipo;
        });
    } else {
        let newRow = tableRef.insertRow();
        newRow.insertCell(0).innerText = "-";
        newRow.insertCell(1).innerText = "No tokens";
        newRow.insertCell(2).innerText = "-";
        newRow.insertCell(3).innerText = "-";
    }

    // Llenar tabla de errores léxicos
    if (resultado.errores && resultado.errores.length > 0) {
        resultado.errores.forEach((error, index) => {
            let newRow = tableErr.insertRow();
            newRow.insertCell(0).innerText = index + 1;
            newRow.insertCell(1).innerText = error.palabra;
            newRow.insertCell(2).innerText = error.linea;
            newRow.insertCell(3).innerText = error.tipoError;
            newRow.insertCell(4).innerText = error.error;
        });
    } else {
        let newRow = tableErr.insertRow();
        newRow.insertCell(0).innerText = "-";
        newRow.insertCell(1).innerText = "No errors";
        newRow.insertCell(2).innerText = "-";
        newRow.insertCell(3).innerText = "-";
        newRow.insertCell(4).innerText = "-";
    }
}

function AnalisisLexico() {      
    limpiarTablas();
    let codigoFuente = document.getElementById('codigoFuente').value;
    let resultado = obtenerTokensYErrores(codigoFuente);
    llenarTablas(resultado);
}

function AnalisisSintactico() {
    limpiarTablaErroresSintacticos();
    let codigoFuente = document.getElementById('codigoFuente').value;
    let resultado = analizarCodigoFuente(codigoFuente);
    if (!resultado.sintacticoCorrecto) {
        llenarTablaErroresSintacticos(resultado.erroresSintacticos);
        alert('Se encontraron errores sintácticos en el código fuente.');
    } else {
        alert('Análisis sintáctico exitoso.');
    }
}

function limpiarTablaErroresSintacticos() {
    let tablaErroresSintacticos = document.getElementById("tablaErroresSintacticos").getElementsByTagName('tbody')[0];
    while (tablaErroresSintacticos.rows.length > 0) {
        tablaErroresSintacticos.deleteRow(0);
    }
}

function llenarTablaErroresSintacticos(erroresSintacticos) {
    let tablaErroresSintacticos = document.getElementById("tablaErroresSintacticos").getElementsByTagName('tbody')[0];
    erroresSintacticos.forEach((error, index) => {
        let newRow = tablaErroresSintacticos.insertRow();
        newRow.insertCell(0).innerText = index + 1;
        newRow.insertCell(1).innerText = error.linea;
        newRow.insertCell(2).innerText = error.tipoError;
        newRow.insertCell(3).innerText = error.mensaje;
    });
}

function verificarCicloFor(tokens) {
    function avanzar() {
        tokenActual = tokens[++indice];
    }

    let indice = 0;
    let tokenActual = tokens[indice];

    if (tokenActual.palabra === 'caja') {
        avanzar();
        if (tokenActual.palabra === '(') {
            avanzar();
            if (verificarInicializacion() && verificarCondicion() && verificarActualizacion()) {
                if (tokenActual.palabra === ')') {
                    avanzar();
                    if (tokenActual.palabra === '{') {
                        avanzar();
                        if (verificarInstrucciones()) {
                            if (tokenActual.palabra === '}') {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }

    function verificarInicializacion() {
        if (['Entera', 'Almendra', 'Descremada', 'Cafe'].includes(tokenActual.palabra)) {
            avanzar();
            if (tokenActual.tipo === 'identificador') {
                avanzar();
                if (tokenActual.palabra === '~=') {
                    avanzar();
                    if (tokenActual.tipo === 'entero') {
                        avanzar();
                        if (tokenActual.palabra === '#') {
                            avanzar();
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    
    function verificarCondicion() { 
        if (tokenActual.tipo === 'identificador') {
            avanzar();
            if (['p~', 'g~', 'p_', 'g_'].includes(tokenActual.palabra)) {
                avanzar();
                if (tokenActual.tipo === 'entero') {
                    avanzar();
                    if (tokenActual.palabra === '#') {
                        avanzar();
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    function verificarActualizacion() {
        if (tokenActual.tipo === 'identificador') {
            avanzar();
            if (tokenActual.palabra === 's+s+') {
                avanzar();
                if (tokenActual.palabra === '#') {
                    avanzar();
                    return true;
                }
            }
        }
        return false;
    }
    
    function verificarInstrucciones() {
        while (verificarAsignacion() || verificarDeclaracion() || verificarOperacion() || verificarCuerpo() || verificarInstruccion()) {
            // Avanzar al siguiente token
        }
        return true;
    }
    
    function verificarAsignacion() {
        if (tokenActual.tipo === 'identificador') {
            avanzar();
            if (tokenActual.palabra === '~=') {
                avanzar();
                if (verificarExpresion()) {
                    if (tokenActual.palabra === '#') {
                        avanzar();
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    function verificarDeclaracion() {
        if (['Entera', 'Almendra', 'Descremada', 'Cafe'].includes(tokenActual.palabra)) {
            avanzar();
            if (tokenActual.tipo === 'identificador') {
                avanzar();
                if (tokenActual.palabra === '~=') {
                    avanzar();
                    if (verificarExpresion()) {
                        if (tokenActual.palabra === '#') {
                            avanzar();
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    
    function verificarOperacion() {
        if (tokenActual.tipo === 'identificador') {
            avanzar();
            if (['s+', 'r-', 'm+', '%'].includes(tokenActual.palabra)) {
                avanzar();
                if (tokenActual.tipo === 'identificador') {
                    if (tokenActual.palabra === '#') {
                        avanzar();
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    function verificarCuerpo() {
        if (tokenActual.palabra === 'caja') {
            return verificarCicloFor(tokens.slice(indice)); // Verificar un ciclo for anidado
        }
        return false;
    }
    
    function verificarInstruccion() {
        if (['caja', 'Entera', 'Almendra', 'Descremada', 'Cafe'].includes(tokenActual.palabra)) {
            return verificarCicloFor(tokens.slice(indice)) || verificarDeclaracion();
        }
        return false;
    }

    return false;
}

function obtenerTokensYErrores(codigoFuente) {
    const lineas = codigoFuente.split('\n');
    let tokens = [];
    let errores = [];

    for (let i = 0; i < lineas.length; i++) {
        const palabras = lineas[i].split(/\s+/);
        for (let palabra of palabras) {
            if (palabra === 'caja') {
                tokens.push({
                    palabra: 'caja',
                    linea: i + 1,
                    tipo: 'reservada'
                });
            } else if (palabra === '(' || palabra === ')' || palabra === '{' || palabra === '}' || palabra === '~=' || palabra === '#' || palabra === 's+s+' || palabra === 's+' || palabra === 'r-' || palabra === 'm+' || palabra === '%' || palabra === 'p~' || palabra === 'g~' || palabra === 'p_' || palabra === 'g_') {
                tokens.push({
                    palabra: palabra,
                    linea: i + 1,
                    tipo: 'simbolo'
                });
            } else if (['Entera', 'Almendra', 'Descremada', 'Cafe'].includes(palabra)) {
                tokens.push({
                    palabra: palabra,
                    linea: i + 1,
                    tipo: 'tipo_dato'
                });
            } else if (/^\d+$/.test(palabra)) {
                tokens.push({
                    palabra: palabra,
                    linea: i + 1,
                    tipo: 'entero'
                });
            } else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(palabra)) {
                tokens.push({
                    palabra: palabra,
                    linea: i + 1,
                    tipo: 'identificador'
                });
            } else {
                errores.push({
                    palabra: palabra,
                    linea: i + 1,
                    tipoError: 'Desconocido',
                    error: 'Token no reconocido'
                });
            }
        }
    }
    return { tokens, errores };
}

function analizarTokens(tokens) {
    let posicion = 0;
    let erroresSintacticos = [];

    function parsearRegla(regla) {
        let componentes = REGLAS[regla];
        for (let i = 0; i < componentes.length; i++) {
            let componente = componentes[i];
            if (componente === '|') continue;
            if (REGLAS[componente]) {
                if (!parsearRegla(componente)) return false;
            } else {
                if (posicion < tokens.length && tokens[posicion].tipo === componente) {
                    posicion++;
                } else {
                    if (regla === '<instrucciones>' && componente === '<cuerpo>' && tokens[posicion] && tokens[posicion].palabra === 'caja') {
                        erroresSintacticos.push({
                            linea: tokens[posicion] ? tokens[posicion].linea : 'fin de entrada',
                            tipoError: 'Estructura de ciclo anidado incorrecta',
                            mensaje: 'Se encontró "caja" en lugar de un componente válido del ciclo'
                        });
                    } else {
                        erroresSintacticos.push({
                            linea: tokens[posicion] ? tokens[posicion].linea : 'fin de entrada',
                            tipoError: 'Error de sintaxis',
                            mensaje: `Se esperaba ${componente} pero se encontró ${tokens[posicion] ? tokens[posicion].tipo : 'fin de entrada'}`
                        });
                    }
                    return false;
                }
            }
        }
        return true;
    }

    let sintacticoCorrecto = parsearRegla('<cuerpo>');
    return { sintacticoCorrecto, erroresSintacticos };
}

function analizarCodigoFuente(codigoFuente) {
    let resultadoLexico = obtenerTokensYErrores(codigoFuente);
    let { tokens, errores } = resultadoLexico;

    if (errores.length > 0) {
        return { errores, tokens, sintacticoCorrecto: false, erroresSintacticos: [] };
    }

    let { sintacticoCorrecto, erroresSintacticos } = analizarTokens(tokens);
    return { tokens, errores, sintacticoCorrecto, erroresSintacticos };
}
