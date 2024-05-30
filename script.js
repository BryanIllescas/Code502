document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-analisis-lexico').addEventListener('click', AnalisisLexico);
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

    console.log(tableReferencia.rows.length);
    while (tableReferencia.rows.length > 1) {
        tableReferencia.deleteRow(1);
    }

    console.log(tableErrores.rows.length);
    while (tableErrores.rows.length> 1) {
        tableErrores.deleteRow(1);
    }
}

function AnalisisLexico() {      
    limpiarTablas();
    
    let tableRef = document.getElementById("tablaTokens");
    let tableErr = document.getElementById("tablaErrores");

    let codigoFuente = document.getElementById('codigoFuente').value;
    const lineas = codigoFuente.split('\n');

    // Expresión regular compilada
    const exprReservada = new RegExp("^(arroz|jabón|licor|papel|estantería|producto|Super|mostrador|sucursal|gaseosa|rosaceas|muestra|muestrafin|scaner|salida|camaras|cupon|canasta)\s*$");
    const exprTipoDato = new RegExp("(^entera|cantidad|almendra|deslactosada|descremada|cafe)\s*$");

    for (let numLinea = 0; numLinea < lineas.length; numLinea++) {
        const palabras = lineas[numLinea].split(/\s+/);
        
        for (let i = 0; i < palabras.length; i++) {
            const palabra = palabras[i];
            
            if (exprReservada.test(palabra)) {
                if (!ExpresionSI.hasOwnProperty(palabra)) {
                    ExpresionSI[palabra] = [];
                }
                ExpresionSI[palabra].push(numLinea + 1);
                TipoSI[palabra] = "Reservada";

            }else if (exprTipoDato.test(palabra)) {
                if (!ExpresionSI.hasOwnProperty(palabra)) {
                    ExpresionSI[palabra] = [];
                }
                ExpresionSI[palabra].push(numLinea + 1);
                TipoSI[palabra] = "Tipo de Dato";
             } else {
                if (!ExpresionNO.hasOwnProperty(palabra)) {
                    ExpresionNO[palabra] = [];
                }
                ExpresionNO[palabra].push(numLinea + 1);
            }
        }
    }

    conteoFilas = 0
    for (const sicoincide in ExpresionSI) {
        conteoFilas = conteoFilas + 1;
        let nuevaFilaR = tableRef.insertRow();
        let nRCelda0 = nuevaFilaR.insertCell(0);
        let nRCelda1 = nuevaFilaR.insertCell(1);
        let nRCelda2 = nuevaFilaR.insertCell(2);
        let nRCelda3 = nuevaFilaR.insertCell(3);
        nRCelda0.textContent = conteoFilas;
        nRCelda1.textContent = sicoincide;
        nRCelda2.textContent = ExpresionSI[sicoincide].join(', ');
        nRCelda3.textContent = TipoSI[sicoincide];
    }

    conteoFilas = 0
    for (const nocoincide in ExpresionNO) {
        if (nocoincide != "\s")
            {
                conteoFilas = conteoFilas + 1;
                let nuevaFilaE = tableErr.insertRow();
                let neCelda0 = nuevaFilaE.insertCell(0);
                let neCelda1 = nuevaFilaE.insertCell(1);
                let neCelda2 = nuevaFilaE.insertCell(2);
                let neCelda3 = nuevaFilaE.insertCell(3);
                let neCelda4 = nuevaFilaE.insertCell(4);
                neCelda0.textContent = conteoFilas;
                neCelda1.textContent = nocoincide;
                neCelda2.textContent = ExpresionNO[nocoincide].join(', ');
                neCelda3.textContent = "Error Léxico";
                neCelda4.textContent = "No Identificado";
            }       
    }
}
/*
//Consultar si todas los tokens deben de ir en mayusculas al inicio o todo minúscula
//algunas sentencias no se entienden su estructura
// el ~ es el 126 de la tabla ascii
let tokenAlfabeto = ["{","}","(",")","[","]",".",",","this"];

let tokenNoIdentifica = ["enteral",     //(definición de metodos)
                         "reintegro",   //(definición de metodos)
                         "s +",         //(definición de metodos) / se asume que es s+ consultar
                         "ms+"          //(sentencia de Reintegro) / se asume que es m+ consultar
                        ]

let tokenTipoDatos  = ["entera",         //int 
                       "cantidad",       //integer
                       "almendra",       //String
                       "deslactosada",   //double 
                       "descremada",     //float             
                       "cafe"            //bool
];   

let tokenCiclos     = ["agua",              //abre Do While 
                       "pura",              //cierra Do While
                       "canasta",           //abre do while (cual es la correcta agua o canasta)
                       "carrito",           //while  ---- no se comprende la estructura de ejemplo / (cual es la correcta pura o carrito)
                       "caja",              //For
                       "pasillo",           //if
                       "porque",            //else ----- no es una palabra relacionada a mercado
                       "porque pasillo",    //elseif ----- no es una palabra relacionada a mercado
                       "marcas",            //switch
                       "gondola",           //case
                       "botella",           //break 
];

let tokenOperaLogic = ["_",             // and
                       "o",             // or
                       "disponible",    //true
                       "ocupado",       //false
                       "guardia",       //return
];

let tokenOperaAsign = ["~=",            // = 
                       "d-"             // !=
];

let tokenOperarelac = ["p~",            // <= 
                       "p_",            // <
                       "g_",            // >
                       "g~",            // >=
];

let tokenOperaAritm = ["#",             //;
                       "s+",            // +
                       "r-",            // -
                       "m+",            // *
                       "%"              // /
];

let tokenReservadas = ["arroz",         //public
                       "jabón",         //private
                       "licor",         //protected
                       "papel",         //default
                       "estantería",    //class (ciclo do while)
                       "producto",      //class (palabras reservadas) / cual es la correcta?
                       "Super",         //main
                       "mostrador",     //static
                       "sucursal",      //static (palabras reservadas) / cual es la correcta?
                       "gaseosa",       //void
                       "rosaceas",      //args
                       "muestra",       //print ----- no es una palabra relacionada a mercado
                       "muestrafin",    //println ----- no es una palabra relacionada a mercado
                       "scaner",        //system
                       "salida",        //out
                       "camaras",       //readline
                       "cupon",         //try
                       "canasta"        //catch
];

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
}

*/