// Función para realizar análisis léxico o sintáctico
function analizar(codigo, tipo) {
    // Aquí puedes agregar el código para enviar el código al backend y mostrar el resultado
    console.log("Analizar " + tipo + ": " + codigo);
}

// Event listeners para análisis léxico y sintáctico
document.getElementById('btn-analisis-lexico').addEventListener('click', function() {
    var codigo = document.getElementById('contenido-archivo').value;
    analizar(codigo, "léxico");
});

document.getElementById('btn-analisis-sintactico').addEventListener('click', function() {
    var codigo = document.getElementById('contenido-archivo').value;
    analizar(codigo, "sintáctico");
});

// Event listener para la carga de archivos
document.getElementById('archivo-input').addEventListener('change', function(event) {
    const archivo = event.target.files[0]; // Obtener el primer archivo seleccionado

    // Verificar si se seleccionó un archivo
    if (archivo) {
        const lector = new FileReader();

        // Leer el contenido del archivo como texto
        lector.readAsText(archivo);

        // Cuando la lectura esté completa
        lector.onload = function() {
            const contenido = lector.result;
            // Mostrar el contenido del archivo en el textarea
            document.getElementById('contenido-archivo').value = contenido;
        };

        // Manejar errores de lectura de archivo
        lector.onerror = function() {
            console.error("Error al leer el archivo");
        };
    }
});
