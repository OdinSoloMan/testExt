using BackEnd.DataAccess;
using BackEnd.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Serilog;
using System;

namespace BackEnd.Controllers
{
    [Route("orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersRepository repo;
        private readonly ILogger<OrdersController> _log;
        private readonly IDiagnosticContext _diagnosticContext;

        public OrdersController(IOrdersRepository r, ILogger<OrdersController> log, IDiagnosticContext diagnosticContext)
        {
            repo = r;
            _log = log;
            _diagnosticContext = diagnosticContext ??
                throw new ArgumentNullException(nameof(diagnosticContext));
        }

        [Route("addorders")]
        [HttpPost]
        public ActionResult<string> AddOrders([FromBody] Orders orders)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Add orders : {@orders}", orders);
            orders.CreateOrders(orders.Count, orders.UsersId, orders.ProductsId);
            repo.Create(orders);
            return new OkObjectResult(orders);
        }

        [Route("readallorders")]
        [HttpGet]
        public ActionResult<string> ReadAllOrders()
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = repo.ReadAll();
            _log.LogInformation("Read all orders : {@res}", res);
            return new OkObjectResult(repo.ReadAll());
        }

        [Route("read/{id}")]
        [HttpGet]
        public ActionResult<string> ReadOrders(Guid id)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = repo.Read(id);
            if (res != null)
            {
                _log.LogInformation("Read order: {@res}", res);
                return new OkObjectResult(res);
            }
            else
            {
                return BadRequest(new { message = "Not order under such id" });
            }
        }

        [Route("updateorders")]
        [HttpPut]
        public ActionResult<string> UpdateOrders([FromBody] Orders orders)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Update order request: {@users}", orders);
            repo.Update(orders);
            var res = repo.Read(orders.Id_Order);
            _log.LogInformation("Update order : {@res}", res);
            return new OkObjectResult(res);
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public ActionResult<string> DeleteOrders(Guid id)
        {
            try
            {
                _diagnosticContext.Set("CatalogLoadTime", 1423);
                _log.LogInformation("Delete order to id request: {@id}", id);
                Orders orders = new Orders() { };
                orders.Id_Order = id;
                repo.Delete(orders.Id_Order);
                return new OkObjectResult(new { delete_orders = id });
            }
            catch
            {
                return BadRequest(new { message = "Not delete orders" });
            }
        }


        //тестовый метод вызова пока не сделана авторизация пользователя
        [Route("readinforders/{id_user}")]
        [HttpGet]
        public ActionResult<string> ReadInfoOrders(Guid id_user)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            return new OkObjectResult(repo.ReadInfoOrders(id_user));
        }
    }
}
