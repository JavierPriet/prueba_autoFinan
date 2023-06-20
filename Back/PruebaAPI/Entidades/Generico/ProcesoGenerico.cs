using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Linq;
using Basededatos;
using Entidades.EntidadesEntrada;

namespace Generico
{
    public class ProcesoGenerico
    {
        public string InsertarActualizarGenericaold(EntidadDinamica Entidad)
        {
            Boolean Ejecuto = false;
            string resultado = "";
            Transacciones transaction = new Transacciones();
            List<string> procedure = new List<string>();
            procedure.Add(Entidad.ProcedimientoAlmacenado);
            foreach (var item in Entidad.Entidades)
            {
                procedure.Add(item.ValorEntidad.ToString());
            }
            Ejecuto = transaction.EjectTransaction(procedure.ToArray());
            if (Ejecuto)
            {
                resultado = "SE EJECUTO SATISFACTORIAMENTE EL PROCESO";
            }
            else
            {
                resultado = "ERROR AL EJECUTAR EL PROCESO EN BASE DE DATOS";
            }
            return resultado;
        }
        
        public string InsertarActualizarGenerica(EntidadDinamica Entidad)
        {
            DataTable dt = new DataTable();
            DataSet ds = new DataSet();
            string resultado = "";
            Transacciones transaction = new Transacciones();
            List<string> procedure = new List<string>();
            procedure.Add(Entidad.ProcedimientoAlmacenado);
            foreach (var item in Entidad.Entidades)
            {
                procedure.Add(item.ValorEntidad.ToString());
            }
            ds = transaction.EjectTransactionDataSet(procedure.ToArray());
            dt = ds.Tables[0];
            int rowsCount = dt.Rows.Count;
            if (rowsCount > 0)
            {
                for (int n = 0; n < rowsCount; n++)
                {
                    resultado = dt.Rows[n]["PkId"].ToString();
                }
            }
            else
            {
                resultado = "ERROR AL EJECUTAR EL PROCESO EN BASE DE DATOS";
            }
            return resultado;
        }
        public DataTable ConsultaDatableGenerico(EntidadDinamica Entidad)
        {
            DataTable dt = new DataTable();
            DataSet ds = new DataSet();
            Transacciones transaction = new Transacciones();
            List<string> procedure = new List<string>();
            procedure.Add(Entidad.ProcedimientoAlmacenado);
            foreach (var item in Entidad.Entidades)
            {
                procedure.Add(item.ValorEntidad.ToString());
            }
            ds = transaction.EjectTransactionDataSet(procedure.ToArray());
            dt = ds.Tables[0];
            return dt;
        }
        public string ConsultaGenerica(EntidadDinamica Entidad)
        {
            DataTable dt = new DataTable();
            DataSet ds = new DataSet();
            string resultado = "";
            Transacciones transaction = new Transacciones();
            List<string> procedure = new List<string>();
            procedure.Add(Entidad.ProcedimientoAlmacenado);
            foreach (var item in Entidad.Entidades)
            {
                procedure.Add(item.ValorEntidad.ToString());
            }
            ds = transaction.EjectTransactionDataSet(procedure.ToArray());
            dt = ds.Tables[0];
            int rowsCount = dt.Rows.Count;
            if (rowsCount > 0)
            {
                for (int n = 0; n < rowsCount; n++)
                {
                    resultado = dt.Rows[n]["RESULTADO"].ToString();
                }
            }
            return resultado;
        }
        
    }
}