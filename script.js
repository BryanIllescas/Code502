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

    let tokenAlfabeto = ["{","}","(",")","[","]",".",",","this"];

    function separarfilas(Texto, separador){
        var arregloFilas = newCodigoFuente.split(separador);
        let ctrllineas = "";
        let nuevaFila;
        let nuevaCelda;
        let conteoF = 0;

        for (var a = 0; a < arregloFilas.length; a++) {
            conteoF += 1;
            for (var b = 0; b < tokenAlfabeto.length; b++){
                if (arregloFilas[a].includes(tokenAlfabeto[b])){
                    nuevaFila = tableRef.insertRow(-1);
                    nuevaCelda = nuevaFila.insertCell(0);       //#
                    nuevaCelda.textContent = conteoF;
                    nuevaCelda = nuevaFila.insertCell(1);       //Palabra
                    nuevaCelda.textContent = tokenAlfabeto[b];
                    nuevaCelda = nuevaFila.insertCell(2);       //No. Linea
                    nuevaCelda.textContent = a + 1;
                    nuevaCelda = nuevaFila.insertCell(3);
                    nuevaCelda.textContent = "Token Alfabeto";  //Tipo
            }else{
                nuevaFila = tableErr.insertRow(-1);
                nuevaCelda = nuevaFila.insertCell(0);           //#
                nuevaCelda.textContent = conteoF;
                nuevaCelda = nuevaFila.insertCell(1);           //Palabra
                nuevaCelda.textContent = tokenAlfabeto[b];
                nuevaCelda = nuevaFila.insertCell(2);           //No. Linea
                nuevaCelda.textContent = a + 1;
                nuevaCelda = nuevaFila.insertCell(3);           //Tipo Error
                nuevaCelda.textContent = "Léxico";
                nuevaCelda = nuevaFila.insertCell(4);           //Error
                nuevaCelda.textContent = "Token no identificado";
            }
        }
        }
    }
    
    separarfilas(newCodigoFuente,"|")
}

//Consultar si todas los tokens deben de ir en mayusculas al inicio o todo minúscula
//algunas sentencias no se entienden su estructura
// el ~ es el 126 de la tabla ascii


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

