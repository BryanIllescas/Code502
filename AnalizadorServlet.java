import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;

public class AnalizadorServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // Obtener el código ingresado por el usuario desde el parámetro del formulario
        String codigo = request.getParameter("codigo");

        // Realizar análisis del código aquí
        // Por ejemplo, podrías utilizar una biblioteca de análisis léxico/sintáctico para analizar el código Java

        // Enviar la respuesta al cliente (opcional)
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("Análisis completado. Resultado aquí...");
    }
}


public class AnalizadorServlet {
    final static String si_suena_la_nota = "if";
final static String si_no_suena_la_nota = "else";
final static String mientras_suena_la_melodia = "while";
final static String por_cada_compas_en_la_partitura = "for";
final static String tono_entero = "int";
final static String tono_flotante = "float";
final static String nota_musical = "char";
final static String cadena_de_sonido = "String";
final static String armonioso = "true";
final static String discordante = "false";
final static String interpretar = "return";
final static String detener = "break";
final static String continuar_tocando = "continue";
final static String secuencia_melodica = "function";
final static String conjunto_musical = "class";
final static String variacion_de = "extends";
final static String importar_partitura = "import";
final static String exportar_partitura = "export";
final static String intentar_tocar = "try";
final static String atrapar_error_musical = "catch";
final static String caso_de_acorde = "case";
final static String cambio_de_tonalidad = "switch";
final static String por_defecto_sonido = "default";
final static String sonido_estatico = "static";
final static String fin_de_la_composicion = "final";

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        

    }
    
}
