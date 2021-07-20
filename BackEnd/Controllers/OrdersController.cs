﻿using BackEnd.DataAccess;
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
    [Route("orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersRepository _repo;
        private readonly ILogger<OrdersController> _log;
        private readonly IDiagnosticContext _diagnosticContext;

        public OrdersController(IOrdersRepository repo, ILogger<OrdersController> log, IDiagnosticContext diagnosticContext)
        {
            _repo = repo;
            _log = log;
            _diagnosticContext = diagnosticContext ??
                throw new ArgumentNullException(nameof(diagnosticContext));
        }

        [HttpPost("addorders")]
        public async Task<ActionResult<string>> AddOrders([FromBody] Orders orders)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Add orders : {@orders}", orders);
            orders.CreateOrders(orders.Count, orders.UsersId, orders.ProductsId);
            await _repo.Create(orders);
            return new OkObjectResult(orders);
        }

        [HttpGet("readallorders")]
        public async Task<ActionResult<string>> ReadAllOrders()
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = await _repo.ReadAll();
            _log.LogInformation("Read all orders : {@res}", res);
            return new OkObjectResult(res);
        }

        [HttpGet("read/{id}")]
        public async Task<ActionResult<string>> ReadOrders(Guid id)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = await _repo.Read(id);
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

        [HttpPut("updateorders")]
        public async Task<ActionResult<string>> UpdateOrders([FromBody] Orders orders)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Update order request: {@users}", orders);
            await _repo.Update(orders);
            var res = await _repo.Read(orders.Id_Order);
            _log.LogInformation("Update order : {@res}", res);
            return new OkObjectResult(res);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<string>> DeleteOrders(Guid id)
        {
            try
            {
                _diagnosticContext.Set("CatalogLoadTime", 1423);
                _log.LogInformation("Delete order to id request: {@id}", id);
                Orders orders = new Orders() { };
                orders.Id_Order = id;
                await _repo.Delete(orders.Id_Order);
                return new OkObjectResult(new { delete_orders = id });
            }
            catch
            {
                return BadRequest(new { message = "Not delete orders" });
            }
        }


        //тестовый метод вызова пока не сделана авторизация пользователя
        [HttpGet("readinforders/{id_user}")]
        public async Task<ActionResult<string>> ReadInfoOrders(Guid id_user)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            return new OkObjectResult(await _repo.ReadInfoOrders(id_user));
        }

        [HttpPost("addorderslist")]
        public async Task<ActionResult<string>> AddOrdersList([FromBody] Orders[] orders)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Add orders : {@orders}", orders);
            await _repo.CraateList(orders);
            return new OkObjectResult(orders);
        }
    }
}
