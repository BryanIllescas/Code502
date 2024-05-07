// Objeto con colores predefinidos para cada palabra reservada
var coloresPalabrasReservadas = {
    "NotAbstracta": "#FF5733", // abstract
    "ClaseMusical": "#33FF57", // class
    "EnumerarNota": "#3357FF", // enum
    "ExtenderTempo": "#FF33D6", // extends
    "FinalCancion": "#FFA533", // final
    "ImplementarRitmo": "#33FFE2", // implements
    "Interfaz": "#B933FF", // interface
    "RitmoNativo": "#FF336F", // native
    "EstrictoFP": "#FFE333", // strictfp
    "SincronizarTempo": "#338AFF", // synchronized
    "PausaMusica": "#FF5733", // break
    "NotaCaso": "#33FF57", // case
    "ContinuarMusica": "#3357FF", // continue
    "NotaDefecto": "#FF33D6", // default
    "NotaDo": "#FFA533", // do
    "NotaAlternativa": "#33FFE2", // else
    "NotaPor": "#B933FF", // for
    "NotaSi": "#FF336F", // if
    "RegresarNota": "#FFE333", // return
    "CambioRitmo": "#338AFF", // switch
    "MientrasSuena": "#FF5733", // while
    "CancionPrivada": "#33FF57", // private
    "CancionProtegida": "#3357FF", // protected
    "CancionPublica": "#FF33D6", // public
    "EsteRitmo": "#FFA533", // this
    "SuperposicionRitmo": "#33FFE2", // super
    "CapturaSonido": "#B933FF", // catch
    "SonidoFinal": "#FF336F", // finally
    "LanzarSonido": "#FFE333", // throw
    "LanzamientosSonidos": "#338AFF", // throws
    "IntentarSonido": "#FF5733", // try
    "NotaBooleana": "#33FF57", // boolean
    "NotaB": "#3357FF", // byte
    "NotaC": "#FF33D6", // char
    "NotaDoble": "#FFA533", // double
    "NotaFa": "#33FFE2", // float
    "NotaNum": "#B933FF", // int
    "TempoLa": "#FF336F", // long
    "NotaCorta": "#FFE333", // short
    "NotaVacia": "#338AFF", // void
    "letra": "#FF5733", // const
    "AfirmarTema": "#33FF57", // assert
    "IrTema": "#3357FF", // goto
    "Falso": "#FF33D6", // false
    "Nulo": "#FFA533", // null
    "Verdadero": "#33FFE2" // true
    // Agrega más palabras reservadas y colores según sea necesario
};

// Función para resaltar palabras reservadas con colores diferentes
function resaltarPalabrasReservadas() {
    var textarea = document.getElementById("codigo");
    var contenido = textarea.value;
    var codigoResaltado = document.getElementById("codigo-resaltado");
    
    // Recorre todas las palabras reservadas
    Object.keys(coloresPalabrasReservadas).forEach(function(palabra) {
        // Verifica si hay un color definido para esta palabra reservada
        var color = coloresPalabrasReservadas[palabra];
        if (color) {
            // Crea una expresión regular para buscar la palabra reservada en el contenido del textarea
            var regex = new RegExp("\\b" + palabra + "\\b", "g");
            // Reemplaza la palabra reservada con un span que tenga el color definido
            contenido = contenido.replace(regex, '<span style="color: ' + color + ';">' + palabra + '</span>');
        }
    });
    
    // Inserta el contenido resaltado en el div
    codigoResaltado.innerHTML = contenido;
}
