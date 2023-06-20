
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Entidades.EntidadesEntrada
{
    public class EntidadDinamica
    {
    public string ProcedimientoAlmacenado { get; set; }
    public List<PropiedadEntidad> Entidades { get; set; }
    public class PropiedadEntidad
    {    
            public string NombreEntidad { get; set; }
            public string ValorEntidad { get; set; }
    }
    
}
}