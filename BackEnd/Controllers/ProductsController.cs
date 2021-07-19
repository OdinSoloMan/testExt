using BackEnd.DataAccess;
using BackEnd.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [Authorize]
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

        [Route("addproducts")]
        [HttpPost]
        public async Task<ActionResult<string>> AddNewProducts([FromBody] Products products)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Add product: {@products}", products);
            products.CreateProducts(products.Name, products.Description);
            await _repo.Create(products);
            return new OkObjectResult(products);
        }

        [Route("readallproducts")]
        [HttpGet]
        public async Task<ActionResult<string>> ReadAllProducts()
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = await _repo.ReadAll();
            _log.LogInformation("Read all products: {@res}", res);
            return new OkObjectResult(res);
        }

        [Route("read/{id}")]
        [HttpGet]
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
                return BadRequest(new { message = "Not product under such id" });
            }
        }

        [Route("updateproducts")]
        [HttpPut]
        public async Task<ActionResult<string>> UpdateProducts([FromBody] Products products)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Update product request: {@products}", products);
            await _repo.Update(products);
            var res = await _repo.Read(products.Id_Product);
            _log.LogInformation("Update product: {@res}", res);
            return new OkObjectResult(res);
        }

        [Route("delete/{id}")]
        [HttpDelete]
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
                return BadRequest(new { message = "Not delete product"});
            }
        }
    }
}
