using System;
using System.Data;
using System.Data.SqlClient;
using System.Xml;

namespace Basededatos
{
    public class Transacciones
    {
        private static SqlConnection sqlConnection;

        private SqlConnection CadenaConexion()
        {
            XmlDocument xDoc = new XmlDocument();
            xDoc.Load("AppData.xml");
            XmlNodeList xServers = xDoc.GetElementsByTagName("ConnectionStrings");
            XmlNodeList xLista = ((XmlElement)xServers[0]).GetElementsByTagName("Instancia");
            string connector = null;
            foreach (XmlElement nodo in xLista)
            {
                connector = nodo.GetAttribute("Conector");
                string xNombre = nodo.InnerText;
            }
            return sqlConnection = new SqlConnection(connector.ToString());
        }

        public DataSet EjectTransactionDataSet(String[] parameters)
        {
            using (SqlConnection sqlConnection = CadenaConexion())
            {
                sqlConnection.Open();
                DataSet dsResult = new DataSet();
                try
                {
                    String sql = null;
                    int size = parameters.Length;
                    for (int i = 0; i < size; i++)
                    {
                        if (i == 0) { sql += parameters[i]; }
                        else if (i != 0 & i != size - 1) { sql += " '" + parameters[i] + "',"; }
                        else if (i == size - 1) { sql += " '" + parameters[i] + "'"; }
                    }
                    try
                    {
                        sql = sql.Replace("'NULL'", "NULL");
                        SqlCommand command = new SqlCommand(sql, sqlConnection);
                        SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(command);
                        try
                        {
                            sqlDataAdapter.Fill(dsResult);
                        }
                        catch (SqlException e)
                        {
                            throw new Exception("Error: " + e.Message.ToString());
                        }
                    }
                    catch (Exception err)
                    {
                        throw new Exception("Error: " + err.Message.ToString());
                    }
                }
                catch (Exception err)
                {
                    throw new Exception("Error originado en base de datos(método ExecuteReader): " + err.Message.ToString());
                }
                finally
                {
                    sqlConnection.Close();
                }
                return dsResult;
            }
        }
        public Boolean EjectTransaction(String[] parameters = null)
        {
            Boolean state = false;
            using (SqlConnection sqlConnection = CadenaConexion())
            {
                sqlConnection.Open();
                String sql = null;
                int size = parameters.Length;
                for (int i = 0; i < size; i++)
                {
                    if (i == 0) { sql += parameters[i]; }
                    else if (i != 0 & i != size - 1) { sql += " '" + parameters[i] + "',"; }
                    else if (i == size - 1) { sql += " '" + parameters[i] + "'"; }
                }
                try
                {
                    sql = sql.Replace("'NULL'", "NULL");
                    SqlCommand command = new SqlCommand(sql, sqlConnection);
                    try
                    {
                        command.ExecuteNonQuery();
                        state = true;
                    }
                    catch (SqlException e)
                    {
                        state = false;
                        throw new Exception("Error: " + e.Message.ToString());
                    }
                }
                catch (Exception err)
                {
                    throw new Exception("Error originado en base de datos(método ExecuteReader): " + err.Message.ToString());
                }
                finally
                {
                    sqlConnection.Close();
                }
                return state;
            }
        }
    }
}
