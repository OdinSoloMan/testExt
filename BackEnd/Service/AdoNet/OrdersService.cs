using BackEnd.DataAccess;
using BackEnd.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Service.AdoNet
{
    public class OrdersService : IOrdersService
    {
        readonly string connectionString = $"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog=AppDatabaseContext;Integrated Security=True";

        public Task CraateList(Orders[] orders)
        {
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("exec AddOrdersList @Orders", con);
                using var table = new DataTable();
                table.Columns.Add("ID", typeof(Guid));
                table.Columns.Add("Count", typeof(int));
                table.Columns.Add("UsersId", typeof(string));
                table.Columns.Add("ProductsId", typeof(Guid));

                for (int i = 0; i < orders.Length; i++)
                {
                    table.Rows.Add(Guid.NewGuid(), orders[i].Count, orders[i].UsersId, orders[i].ProductsId);
                }

                cmd.Parameters.Add(new SqlParameter("@Orders", SqlDbType.Structured)
                {
                    TypeName = "dbo.IdTypeOrder",
                    Value = table
                });

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch
            {
                throw;
            }
            return Task.CompletedTask;
        }

        public Task Create(Orders orders)
        {
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("AddOrders", con);
                cmd.CommandType = CommandType.StoredProcedure;

                orders.Id_Order = Guid.NewGuid();
                ParametersTableOrders(orders, cmd);

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch
            {
                throw;
            }
            return Task.CompletedTask;
        }

        public Task Delete(Guid GuidOrdersId)
        {
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("DeleteOrders", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id_Order", GuidOrdersId);

                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    _ = rdr["OpenTransactions"].ToString();
                }

                con.Close();
                return Task.CompletedTask;
            }
            catch
            {
                throw;
            }
        }

        public Task<Orders> Read(Guid GuidOrdersId)
        {
            Orders res = new Orders();
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("ReadIdOrders", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id_Order", GuidOrdersId);

                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    res = new Orders
                    {
                        Id_Order = Guid.Parse(rdr["Id_Order"].ToString()),
                        Count = Convert.ToInt32(rdr["Count"]),
                        UsersId = rdr["UsersId"].ToString(),
                        ProductsId = Guid.Parse(rdr["ProductsId"].ToString())
                    };
                }

                con.Close();
                return Task.FromResult(res);
            }
            catch
            {
                throw;
            }
        }

        public Task<IEnumerable<Orders>> ReadAll()
        {
            List<Orders> res = new List<Orders>();
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("SelectAllOrders", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Orders orders = new Orders
                    {
                        Id_Order = Guid.Parse(rdr["Id_Order"].ToString()),
                        Count = Convert.ToInt32(rdr["Count"]),
                        UsersId = rdr["UsersId"].ToString(),
                        ProductsId = Guid.Parse(rdr["ProductsId"].ToString())
                    };
                    res.Add(orders);
                }

                con.Close();
                IEnumerable<Orders> c = res.ToList();
                return Task.FromResult(c);
            }
            catch
            {
                throw;
            }
        }

        public Task<object> ReadInfoOrders(string id_user)
        {
            List<object> res = new List<object>();
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("ReadInfoOredersUser", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UsersId", id_user);

                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    res.Add(new
                    {
                        Id_Order = Guid.Parse(rdr["Id_Order"].ToString()),
                        Count = Convert.ToInt32(rdr["Count"]),
                        Name = rdr["Name"].ToString()
                    });
                }

                con.Close();
                object c = res.ToList();
                return Task.FromResult(c);
            }
            catch
            {
                throw;
            }
        }

        public Task<Page> ReadInfoOredrsUserPerPage(string id_user, int rows, int next)
        {
            int count = 0;
            int _totalPages = (int)Math.Round((float)count / (float)next);
            rows = (rows == 1) ? 0 : (rows != 0) ? ((rows - 1) * next) : 0;

            List<object> infoObj = new List<object>();
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("InfoOredrsUserPerPage", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UsersId", id_user);
                cmd.Parameters.AddWithValue("@Rows", rows);
                cmd.Parameters.AddWithValue("@Next", next);

                con.Open();

                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    count = Convert.ToInt32(rdr["_Count"]);
                }

                rdr.NextResult();

                while (rdr.Read())
                {
                    infoObj.Add(new
                    {
                        Id_Order = Guid.Parse(rdr["Id_Order"].ToString()),
                        Count = Convert.ToInt32(rdr["Count"]),
                        Name = rdr["Name"].ToString()
                    });
                }

                con.Close();
            }
            catch
            {
                throw;
            }

            var data = infoObj.ConvertAll<object>(item => (object)item).ToArray();
            var res = new Page() { Data = data, TotalPages = _totalPages, TotalPassengers = count };
            return Task.FromResult(res);
        }

        public Task Update(Orders orders)
        {
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("UpdateOrders", con);
                cmd.CommandType = CommandType.StoredProcedure;

                ParametersTableOrders(orders, cmd);

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch
            {
                throw;
            }
            return Task.CompletedTask;
        }

        private static void ParametersTableOrders(Orders orders, SqlCommand cmd)
        {
            cmd.Parameters.AddWithValue("@Id_Order", orders.Id_Order);
            cmd.Parameters.AddWithValue("@Count", orders.Count);
            cmd.Parameters.AddWithValue("@UsersId", orders.UsersId);
            cmd.Parameters.AddWithValue("@ProductsId", orders.ProductsId);
        }
    }
}
