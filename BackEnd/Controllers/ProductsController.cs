using BackEnd.DataAccess;
using BackEnd.Domain;
using BackEnd.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    //[Authorize]
    [Route("products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsRepository _repo;
        private readonly ILogger<ProductsController> _log;
        private readonly IDiagnosticContext _diagnosticContext;

        public ProductsController(IProductsRepository repo, ILogger<ProductsController> log, IDiagnosticContext diagnosticContext)
        {
            _repo = repo;
            _log = log;
            _diagnosticContext = diagnosticContext ??
                throw new ArgumentNullException(nameof(diagnosticContext));
        }

        [HttpPost("addproducts")]
        public async Task<ActionResult<string>> AddNewProducts([FromBody] Products products)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Add product: {@products}", products);
            products.CreateProducts(products.Name, products.Description);
            if (await _repo.Select(products.Name))
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Error name busy!" });
            }
            await _repo.Create(products);
            return new OkObjectResult(products);
        }

        [HttpGet("readallproducts")]
        public async Task<ActionResult<string>> ReadAllProducts()
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = await _repo.ReadAll();
            _log.LogInformation("Read all products: {@res}", res);
            return new OkObjectResult(res);
        }

        [HttpGet("read/{id}")]
        public async Task<ActionResult<string>> ReadProduct(Guid id)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = await _repo.Read(id);
            if(res != null)
            {
                _log.LogInformation("Read product: {res}", res);
                return new OkObjectResult(res);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Not product under such id!" });
            }
        }

        [HttpPut("updateproducts")]
        public async Task<ActionResult<string>> UpdateProducts([FromBody] Products products)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Update product request: {@products}", products);
            if (await _repo.Select(products.Name))
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Error name busy!" });
            }
            await _repo.Update(products);
            var res = await _repo.Read(products.Id_Product);
            _log.LogInformation("Update product: {@res}", res);
            return new OkObjectResult(res);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<string>> DeleteProducts(Guid id)
        {
            try
            {
                _diagnosticContext.Set("CatalogLoadTime", 1423);
                _log.LogInformation("Delete product to id requst: {@id}", id);
                Products products = new Products() { };
                products.Id_Product = id;
                await _repo.Delete(products.Id_Product);
                return new OkObjectResult(new { delete_products = id });
            }
            catch
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "Not delete product!" });
            }
        }

        [HttpPost("testAddAdoNet")]
        public ActionResult<string> CreateTest([FromBody] Products products)
        {
            var res = "";
            string connStr = $"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog=AppDatabaseContext;Integrated Security=True";
            try
            {
                using (SqlConnection con = new SqlConnection(connStr))
                {
                    using (SqlCommand cmd = new SqlCommand("CreateProductssss", con)) 
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Id_Product", Guid.NewGuid());
                        cmd.Parameters.AddWithValue("@Name", products.Name);
                        cmd.Parameters.AddWithValue("@Description", products.Description);

                        con.Open();
                        cmd.ExecuteNonQuery();

                        con.Close();
                    }
                }
                return new OkObjectResult(new { message = res });
            }
            catch
            {
                throw;
            }
        }

        [HttpPut("testUpdateAdoNet")]
        public ActionResult<string> UpdateTest([FromBody] Products products)
        {
            var res = new Dictionary<string, string>();
            string connStr = $"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog=AppDatabaseContext;Integrated Security=True";
            try
            {
                using (SqlConnection con = new SqlConnection(connStr))
                {
                    using SqlCommand cmd = new SqlCommand("UpdateProductsss", con);
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@Id_Product", products.Id_Product);
                    cmd.Parameters.AddWithValue("@Name", products.Name);
                    cmd.Parameters.AddWithValue("@Description", products.Description);

                    con.Open();
                    cmd.ExecuteNonQuery();

                    using SqlDataReader rdr = cmd.ExecuteReader();
                    res = GetObjectResult(rdr);

                    con.Close();
                }
            }
            catch
            {
                throw;
            }
            
            return new OkObjectResult(res);
        }

        //
        [HttpPost("testAddListAdoNet")]
        public ActionResult<string> AddListTest([FromBody] Products[] products)
        {
            var res = new Dictionary<string, string>();
            string connStr = $"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog=AppDatabaseContext;Integrated Security=True";
            try
            {
                using (SqlConnection con = new SqlConnection(connStr))
                {
                    using (SqlCommand cmd = new SqlCommand("exec AddProductssss @Products", con))
                    {
                        using (var table = new DataTable())
                        {
                            table.Columns.Add("ID", typeof(Guid));
                            table.Columns.Add("Name", typeof(string));
                            table.Columns.Add("Description", typeof(string));

                            for (int i = 0; i < products.Length; i++)
                            {
                                table.Rows.Add(Guid.NewGuid(), products[i].Name, products[i].Description);
                            }

                            var pList = new SqlParameter("@Products", SqlDbType.Structured);
                            pList.TypeName = "dbo.IdTypeProduct";
                            pList.Value = table;

                            foreach (DataRow row in table.Rows)
                            {
                                foreach (DataColumn column in table.Columns)
                                {
                                    var s = row[column].ToString();
                                }
                            }

                            cmd.Parameters.Add(pList);

                            con.Open();
                            cmd.ExecuteNonQuery();

                            using SqlDataReader rdr = cmd.ExecuteReader();
                            res = GetObjectResult(rdr);

                            con.Close();
                        }
                    }
                }
            }
            catch
            {
                throw;
            }

            return new OkObjectResult(res);
        }

        [HttpDelete("testDeleteAdoNet/{id}")]
        public ActionResult<string> DeleteTest(Guid id)
        {
            var res = new Dictionary<string, string>();
            string connStr = $"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog=AppDatabaseContext;Integrated Security=True";
            try
            {
                using (SqlConnection con = new SqlConnection(connStr))
                {
                    using (SqlCommand cmd = new SqlCommand("DeleteProducts", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Id_Product", id);

                        con.Open();
                        cmd.ExecuteNonQuery();

                        using SqlDataReader rdr = cmd.ExecuteReader();
                        res = GetObjectResult(rdr);

                        con.Close();
                    }
                }
            }
            catch
            {
                throw;
            }
            return new OkObjectResult(new { message = res });
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
