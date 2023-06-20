using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Linq;
using Basededatos;
using Entidades.EntidadesEntrada;
using Entidades.EntidadesSalida;
namespace Entidades
{
    public class Diccionarios
    {
        public DataTable ConsultarDiccionarioNoVariables(string proceso)
        {
            try
            {
                DataSet ds = new DataSet();
                Transacciones transaction = new Transacciones();
                String[] procedure = {proceso};
                ds = transaction.EjectTransactionDataSet(procedure);
                return ds.Tables[0];
            }
            catch (System.Exception)
            {
                DataTable dt = new DataTable();
                return dt;
            }
            
        }
        public DataTable ConsultarDiccionarioVariables(EntidadDinamica Entidad)
        {
            DataSet ds = new DataSet();
            Transacciones transaction = new Transacciones();
            List<string> procedure = new List<string>();
            procedure.Add(Entidad.ProcedimientoAlmacenado);
            foreach (var item in Entidad.Entidades)
            {
                procedure.Add(item.ValorEntidad.ToString());
            }
            ds = transaction.EjectTransactionDataSet(procedure.ToArray());
            return ds.Tables[0];
        }
        public List<EntidadDiccionario> DataTableToListDiccionario(DataTable table) 
        {   
            List<EntidadDiccionario> modelList = new List<EntidadDiccionario>();
            int rowsCount = table.Rows.Count;
            if (rowsCount > 0)
            {
                EntidadDiccionario model;
                for (int n = 0; n < rowsCount; n++)
                {
                    model = new EntidadDiccionario();

                    model.Texto = table.Rows[n]["TEXTO"].ToString();
                    model.Valor = table.Rows[n]["VALOR"].ToString();
                    modelList.Add(model);
                }
            }
            return modelList;
        }
    } 
}
