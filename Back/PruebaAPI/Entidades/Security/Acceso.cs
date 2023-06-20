using System;
using System.Collections.Generic;
using System.Text;

namespace Security
{
    public class Acceso
    {
        public string usuario { get; set; }
        public string contrasena { get; set; }
    }
    public class Respuesta
    {
        public string mensajeGeneral { get; set; }
        public string id_usuario { get; set; }
        public string Usuario { get; set; }
        public string Nombre { get; set; }

    }
}
