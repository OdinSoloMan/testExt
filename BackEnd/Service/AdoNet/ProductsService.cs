﻿using BackEnd.DataAccess;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Service.AdoNet
{
    public class ProductsService : IProductsService
    {
        string connectionString = $"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog=AppDatabaseContext;Integrated Security=True";
        public Task Create(Products products)
        {
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("AddProducts", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id_Product", Guid.NewGuid());
                cmd.Parameters.AddWithValue("@Name", products.Name);
                cmd.Parameters.AddWithValue("@Description", products.Description);

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

        public Task Delete(Guid GuidProductsId)
        {
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("DeleteProducts", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id_Product", GuidProductsId);

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                var res = "";
                while (rdr.Read())
                {
                    res = rdr["OpenTransactions"].ToString();
                }
                con.Close();
                return Task.CompletedTask;
            }
            catch
            {
                throw;
            }
        }

        public Task<Products> Read(Guid GuidProductsId)
        {
            Products res = new Products();
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("ReadIdProducts", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id_Product", GuidProductsId);

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    res = new Products
                    {
                        Id_Product = Guid.Parse(rdr["Id_Product"].ToString()),
                        Name = rdr["Name"].ToString(),
                        Description = rdr["Description"].ToString()
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

        public Task<IEnumerable<Products>> ReadAll()
        {
            List<Products> res = new List<Products>();
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("SelectAllProducts", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Products products = new Products
                    {
                        Id_Product = Guid.Parse(rdr["Id_Product"].ToString()),
                        Name = rdr["Name"].ToString(),
                        Description = rdr["Description"].ToString()
                    };
                    res.Add(products);
                }
                con.Close();
                IEnumerable<Products> c = res.ToList();
                return Task.FromResult(c);
            }
            catch
            {
                throw;
            }
        }

        public Task<bool> Select(string name)
        {
            Products res = new Products();
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("SelectNameProducts", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Name", name);

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    res = new Products
                    {
                        Id_Product = Guid.Parse(rdr["Id_Product"].ToString()),
                        Name = rdr["Name"].ToString(),
                        Description = rdr["Description"].ToString()
                    };
                }
                con.Close();
                if (res.Name == "")
                    return Task.FromResult(false);
                else 
                    return Task.FromResult(true);
            }
            catch
            {
                throw;
            }
        }

        public Task Update(Products products)
        {
            try
            {
                using SqlConnection con = new SqlConnection(connectionString);
                using SqlCommand cmd = new SqlCommand("UpdateProducts", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id_Product", products.Id_Product);
                cmd.Parameters.AddWithValue("@Name", products.Name);
                cmd.Parameters.AddWithValue("@Description", products.Description);

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

        Dictionary<string, string> GetObjectResult(SqlDataReader rdr)
        {
            var res = new Dictionary<string, string>();

            DataTable dt = new DataTable();
            dt.Load(rdr);

            foreach (DataRow row in dt.Rows)
            {
                foreach (DataColumn column in dt.Columns)
                {
                    res.Add(column.ColumnName, row[column].ToString());
                }
            }

            return res;
        }
    }
}
