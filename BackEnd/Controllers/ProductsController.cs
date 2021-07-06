using BackEnd.DataAccess;
using BackEnd.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Route("products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsRepository repo;
        public ProductsController(IProductsRepository r)
        {
            repo = r;
        }

        [Route("addproducts")]
        [HttpPost]
        public ActionResult<string> AddNewProducts([FromBody] Products products)
        {
            products.CreateProducts(products.Name, products.Description);
            repo.Create(products);
            return new OkObjectResult(products);
        }

        [Route("readallproducts")]
        [HttpGet]
        public ActionResult<string> ReadAllProducts()
        {
            return new OkObjectResult(repo.ReadAll());
        }

        [Route("read/{id}")]
        [HttpGet]
        public ActionResult<string> ReadProduct(Guid id)
        {
            return new OkObjectResult(repo.Read(id));
        }

        [Route("updateproducts")]
        [HttpPut]
        public ActionResult<string> UpdateProducts([FromBody] Products products)
        {
            repo.Update(products);
            return new OkObjectResult(repo.Read(products.Id_Product));
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public ActionResult<string> DeleteProducts(Guid id)
        {
            try
            {
                Products products = new Products() { };
                products.Id_Product = id;
                repo.Delete(products.Id_Product);
                return new OkObjectResult(new { delete_products = id });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
