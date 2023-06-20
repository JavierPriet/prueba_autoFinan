using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entidades.EntidadesSalida
{
    public class RtaEntidadDiccionario
    {
        public string Respuesta { get; set; }
        public string Mensaje { get; set; }
        public List<Diccionario> LstDiccionario { get; set; }
        public class Diccionario
        {
            public string Texto { get; set; }
            public string Valor { get; set; }    
        }
        
    }
}