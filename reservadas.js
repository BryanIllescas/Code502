// Objeto con colores predefinidos para cada palabra reservada
var coloresPalabrasReservadas = {
    "si_suena_la_nota": "#FF5733", // Rojo
    "si_no_suena_la_nota": "#33FF57", // Verde
    "mientras_suena_la_melodia": "#3357FF", // Azul
    "por_cada_compas_en_la_partitura": "#FF33D6", // Rosa
    "tono_entero": "#FFA533", // Naranja
    "tono_flotante": "#33FFE2", // Turquesa
    "nota_musical": "#B933FF", // Púrpura
    "cadena_de_sonido": "#FF336F", // Fucsia
    "armonioso": "#FFE333", // Amarillo
    "discordante": "#338AFF", // Azul claro
    "interpretar": "#FF33D6", // Rosa
    "detener": "#FFA533", // Naranja
    "continuar_tocando": "#33FFE2", // Turquesa
    "secuencia_melodica": "#B933FF", // Púrpura
    "conjunto_musical": "#FF336F", // Fucsia
    "variacion_de": "#FFE333", // Amarillo
    "importar_partitura": "#338AFF", // Azul claro
    "exportar_partitura": "#FF5733", // Rojo
    "intentar_tocar": "#33FF57", // Verde
    "atrapar_error_musical": "#3357FF", // Azul
    "caso_de_acorde": "#FF33D6", // Rosa
    "cambio_de_tonalidad": "#FFA533", // Naranja
    "por_defecto_sonido": "#33FFE2", // Turquesa
    "sonido_estatico": "#B933FF", // Púrpura
    "fin_de_la_composicion": "#FF336F" // Fucsia
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