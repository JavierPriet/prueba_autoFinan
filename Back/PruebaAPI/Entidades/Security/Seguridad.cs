using System;
using System.Data;
using System.Text;
using Basededatos;

namespace Security
{
   public class Seguridad
    {
        public DataTable Autenticacion( string  usuario, string contrasena)
        {
            DataTable resultado = new DataTable();
            DataSet ds = new DataSet();
            

            Transacciones transaccion = new Transacciones();
            String[] procedure = { "SP_LOGIN", usuario, contrasena };
            ds = transaccion.EjectTransactionDataSet(procedure);
            resultado = ds.Tables[0];

            return resultado;
        }
    }
}
