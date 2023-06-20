using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using Security;
using Newtonsoft.Json;  
using Entidades.EntidadesEntrada;

namespace PruebaAPI.Controllers
{
    [AllowAnonymous]
    [Route("Security/")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        //proceso de autencicacion
        [HttpPost]
        [Route("acceso")]
        
        public IActionResult Acceso(EntidadDinamica estructura)
        {
            DataTable resultado = new DataTable();
            Seguridad seguridad = new Seguridad();
            Generico.ProcesoGenerico ProcesoGenerico = new Generico.ProcesoGenerico();
            String json = String.Empty;
            bool CredencialValida = false;
            bool UsuarioValido = false;
            Int32 ID, ID_USU = 0;
            string Usuario = string.Empty, Nombre = string.Empty;
            
            json = ProcesoGenerico.ConsultaGenerica(estructura);
            if (json != "")
            {
                DataTable resultadoJson1 = (DataTable)JsonConvert.DeserializeObject(json, typeof(DataTable));
                foreach(DataRow dataRowJson in resultadoJson1.Rows)
                {
                    ID = Convert.ToInt32(dataRowJson["PkId"].ToString());
                    ID_USU = Convert.ToInt32( dataRowJson["PkId"].ToString());
                    Usuario = dataRowJson["Usuario"].ToString().ToUpper();
                    Nombre = dataRowJson["Nombre"].ToString().ToUpper();
                    CredencialValida = true;
                    UsuarioValido = true;

                }
            }
            else
            {
                CredencialValida = false;
                UsuarioValido = false;
            }
            if (CredencialValida && UsuarioValido)
            {
                Respuesta respuesta = new Respuesta();
                respuesta.Usuario = Usuario;
                respuesta.id_usuario = ID_USU.ToString();
                respuesta.Nombre = Nombre.ToString();
                respuesta.mensajeGeneral = "Satisfactorio";
                return Ok(respuesta);
            }
            else
            {
                Respuesta respuesta = new Respuesta();
                respuesta.Usuario = "";
                respuesta.id_usuario ="";
                respuesta.Nombre = "";
                respuesta.mensajeGeneral = "Satisfactorio";
                return  Unauthorized(respuesta);
            }
        }
    }
}
