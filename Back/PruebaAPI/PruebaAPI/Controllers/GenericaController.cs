using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Entidades.EntidadesEntrada;
using Entidades.EntidadesSalida;
using Newtonsoft.Json;

namespace PruebaAPI.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class GenericaController : ControllerBase
    {
        [HttpPost]
        public ActionResult<EntidadRespuestaSimple> InsertarActualizarGenerica(EntidadDinamica estructura)
        {
            Generico.ProcesoGenerico ProcesoGenerico = new Generico.ProcesoGenerico();
            DataTable dt = new DataTable();
            string resultado = "";
            EntidadRespuestaSimple rta = new EntidadRespuestaSimple();
            if (estructura.ProcedimientoAlmacenado!= " ")
            {
                resultado = ProcesoGenerico.InsertarActualizarGenerica(estructura);
            }
            else
            {
                rta.Respuesta = "ERROR";
                resultado = "ERROR " + estructura.ProcedimientoAlmacenado;
            }
            if (!resultado.Contains("ERROR"))
            {
                 rta.Respuesta = "SATISFACTORIO";
            }
            rta.Mensaje = resultado;
            return rta;

        }
        [HttpPost]
        public ActionResult<EntidadRespuestaSimple> ConsultaGenerica(EntidadDinamica estructura)
        {
            Generico.ProcesoGenerico ProcesoGenerico = new Generico.ProcesoGenerico();
            DataTable dt = new DataTable();
            string resultado = "";
            EntidadRespuestaSimple rta = new EntidadRespuestaSimple();
            if (estructura.ProcedimientoAlmacenado != " ")
            {
                resultado = ProcesoGenerico.ConsultaGenerica(estructura);
            }
            else
            {
                rta.Respuesta = "ERROR";
                resultado = "ERROR " + estructura.ProcedimientoAlmacenado;
            }
            if (!resultado.Contains("ERROR"))
            {
                 rta.Respuesta = "SATISFACTORIO";
            }
            rta.Mensaje = resultado;
            return rta;

        }
    }
}