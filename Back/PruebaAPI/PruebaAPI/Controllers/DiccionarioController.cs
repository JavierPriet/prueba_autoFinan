using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Entidades.EntidadesEntrada;
using Entidades.EntidadesSalida;

namespace PruebaAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DiccionarioController : ControllerBase
    {
        
        [HttpPost]
        public ActionResult<RtaEntidadDiccionario> ConsultarDiccionarioConVariables(EntidadDinamica Entdiccionario )
        {
            Entidades.Diccionarios diccionarios = new Entidades.Diccionarios();
            RtaEntidadDiccionario diccionario = new RtaEntidadDiccionario();
            DataTable dt = new DataTable();
            if (Entdiccionario.ProcedimientoAlmacenado != "")
            {
                if (Entdiccionario.Entidades.Count > 0)
                {
                    dt = diccionarios.ConsultarDiccionarioVariables(Entdiccionario);
                }
                else
                {
                    dt = diccionarios.ConsultarDiccionarioNoVariables(Entdiccionario.ProcedimientoAlmacenado);
                }
                var data = diccionarios.DataTableToListDiccionario(dt);
                if (data.Count > 0)
                {
                    List<RtaEntidadDiccionario.Diccionario> lstDic = new List<RtaEntidadDiccionario.Diccionario>();
                    foreach (var item in data)
                    {
                        RtaEntidadDiccionario.Diccionario dic = new  RtaEntidadDiccionario.Diccionario();
                        dic.Valor = item.Valor;
                        dic.Texto = item.Texto;
                        lstDic.Add(dic);
                    }
                    diccionario.LstDiccionario = lstDic;
                    diccionario.Respuesta = "SATISFACTORIO";
                    diccionario.Mensaje = "SATISFACTORIO";
                }
                else
                {
                    diccionario.Respuesta = "ADVERTENCIA";
                    diccionario.Mensaje = "NO SE ENCONTRARON DATOS PARA ESE DICCIONARIO";
                }
            }
            else
            {
                diccionario.Respuesta = "ERROR";
                diccionario.Mensaje = Entdiccionario.ProcedimientoAlmacenado;
            }
            return diccionario;
        }
    }
}