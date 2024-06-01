const TOKENS = {
    'Entera': { tipo: 'tipo_dato' },
    'Gaseosa': { tipo: 'tipo_dato' },
    'Almendra': { tipo: 'tipo_dato' },
    'Descremada': { tipo: 'tipo_dato' },
    'Cafe': { tipo: 'tipo_dato' },
    'Deslactosada': { tipo: 'tipo_dato' },
    'Carrito': { tipo: 'tipo_dato' },
    'Caja': { tipo: 'for' },
    '(': { tipo: 'parentesis_izq' },
    ')': { tipo: 'parentesis_der' },
    '{': { tipo: 'llave_izq' },
    '}': { tipo: 'llave_der' },
    's+': { tipo: 'operador_suma' },
    'r-': { tipo: 'operador_resta' },
    'm+': { tipo: 'operador_multiplicacion' },
    '%': { tipo: 'operador_division' },
    '~=': { tipo: 'operador_asignacion' },
    'd-': { tipo: 'operador_diferente' },
    '_': { tipo: 'operador_and' },
    'o': { tipo: 'operador_or' },
    'p_': { tipo: 'operador_menor_que' },
    'g_': { tipo: 'operador_mayor_que' },
    'p~': { tipo: 'operador_menor_igual_que' },
    'g~': { tipo: 'operador_mayor_igual_que' },
    '#': { tipo: 'fin_instruccion' },
    ';': { tipo: 'punto_y_coma' },
    'camaras': { tipo: 'funcion_readLine' },
    'pasillo': { tipo: 'if' },
    'porque': { tipo: 'else' },
    'Factura': { tipo: 'main' },
    's+s+': { tipo: 'operador_incremento' },
    'i': { tipo: 'identificador' },
    'suma': { tipo: 'identificador' },
 
};

function obtenerTokensYErrores(codigoFuente) {
    let tokens = [];
    let errores = [];
    let lineas = codigoFuente.split('\n');
    for (let i = 0; i < lineas.length; i++) {
        let linea = lineas[i];
        let palabras = linea.split(/\s+/).filter((e) => e.trim().length > 0);
        for (let j = 0; j < palabras.length; j++) {
            let palabra = palabras[j];
            if (TOKENS[palabra]) {
                tokens.push({
                    palabra: palabra,
                    linea: i + 1,
                    tipo: TOKENS[palabra].tipo
                });
            } else if (/^\d+$/.test(palabra)) { // Verificar si es un entero
                tokens.push({
                    palabra: palabra,
                    linea: i + 1,
                    tipo: 'entero'
                });
            } else if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(palabra)) { // Verificar si es un identificador
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

const REGLAS = {
    '<cuerpo>': ['for', 'parentesis_izq', '<inicializacion>', '<condicion>', '<actualizacion>', 'parentesis_der', 'llave_izq', '<instrucciones>', 'llave_der'],
    '<inicializacion>': ['tipo_dato', 'identificador', 'operador_asignacion', 'entero', 'punto_y_coma'],
    '<condicion>': ['identificador', '<operador_comparacion>', 'entero', 'punto_y_coma'],
    '<actualizacion>': ['identificador', 'operador_incremento', 'punto_y_coma'],
    '<instrucciones>': ['<asignacion>', '|', '<operacion>', '|', '<declaracion>', '|', '<cuerpo>'],
    '<asignacion>': ['identificador', 'operador_asignacion', '<expresion>', 'punto_y_coma'],
    '<operacion>': ['identificador', 'operador_suma', 'identificador', 'punto_y_coma'],
    '<declaracion>': ['tipo_dato', 'identificador', 'operador_asignacion', '<expresion>', 'punto_y_coma'],
    '<expresion>': ['identificador', '|', 'entero'],
    '<operador_comparacion>': ['operador_menor_que', '|', 'operador_mayor_que', '|', 'operador_menor_igual_que', '|', 'operador_mayor_igual_que'],
    '<operador_incremento>': ['operador_incremento'],
};

