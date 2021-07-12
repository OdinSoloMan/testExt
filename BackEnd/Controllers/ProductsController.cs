using BackEnd.DataAccess;
using BackEnd.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Serilog;
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
        private readonly ILogger<ProductsController> _log;
        private readonly IDiagnosticContext _diagnosticContext;

        public ProductsController(IProductsRepository r, ILogger<ProductsController> log, IDiagnosticContext diagnosticContext)
        {
            repo = r;
            _log = log;
            _diagnosticContext = diagnosticContext ??
                throw new ArgumentNullException(nameof(diagnosticContext));
        }

        [Route("addproducts")]
        [HttpPost]
        public ActionResult<string> AddNewProducts([FromBody] Products products)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Add product: {@products}", products);
            products.CreateProducts(products.Name, products.Description);
            repo.Create(products);
            return new OkObjectResult(products);
        }

        [Route("readallproducts")]
        [HttpGet]
        public ActionResult<string> ReadAllProducts()
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = repo.ReadAll();
            _log.LogInformation("Read all products: {@res}", res);
            return new OkObjectResult(res);
        }

        [Route("read/{id}")]
        [HttpGet]
        public ActionResult<string> ReadProduct(Guid id)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = repo.Read(id);
            if(res != null)
            {
                _log.LogInformation("Read product: {res}", res);
                return new OkObjectResult(res);
            }
            else
            {
                return BadRequest(new { message = "Not product under such id" });
            }
        }

        [Route("updateproducts")]
        [HttpPut]
        public ActionResult<string> UpdateProducts([FromBody] Products products)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Update product request: {@products}", products);
            repo.Update(products);
            var res = repo.Read(products.Id_Product);
            _log.LogInformation("Update product: {@res}", res);
            return new OkObjectResult(res);
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public ActionResult<string> DeleteProducts(Guid id)
        {
            try
            {
                _diagnosticContext.Set("CatalogLoadTime", 1423);
                _log.LogInformation("Delete product to id requst: {@id}", id);
                Products products = new Products() { };
                products.Id_Product = id;
                repo.Delete(products.Id_Product);
                return new OkObjectResult(new { delete_products = id });
            }
            catch
            {
                return BadRequest(new { message = "Not delete product"});
            }
        }
    }
}
