// Función para mostrar la página de inicio
function mostrarInicio() {
    // Aquí puedes agregar el código para mostrar la página de inicio
    console.log("Mostrar página de inicio");
}

// Función para mostrar la documentación
function mostrarDocumentacion() {
    // Aquí puedes agregar el código para mostrar la documentación
    console.log("Mostrar documentación");
}

// Event listeners para los botones del menú
document.getElementById('btn-inicio').addEventListener('click', mostrarInicio);
document.getElementById('btn-documentacion').addEventListener('click', mostrarDocumentacion);

document.getElementById('btn-analisis-lexico').addEventListener('click', function() {
    var codigo = document.getElementById('codigo-input').value;
    // Enviar el código al backend para el análisis léxico
    // y mostrar el resultado en el área de resultados
});

document.getElementById('btn-analisis-sintactico').addEventListener('click', function() {
    var codigo = document.getElementById('codigo-input').value;
    // Enviar el código al backend para el análisis sintáctico
    // y mostrar el resultado en el área de resultados
});
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


