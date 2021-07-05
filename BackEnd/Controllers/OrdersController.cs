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
    [Route("orders")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        IOrdersRepository repo;
        public OrdersController(IOrdersRepository r)
        {
            repo = r;
        }

        [Route("addorders")]
        [HttpPost]
        public ActionResult<string> AddOrders([FromBody] Orders orders)
        {
            orders.CreateOrders(orders.Count, orders.UsersId, orders.ProductsId);
            repo.Create(orders);
            return new OkObjectResult(orders);
        }

        [Route("readallorders")]
        [HttpGet]
        public ActionResult<string> ReadAllOrders()
        {
            return new OkObjectResult(repo.ReadAll());
        }

        [Route("read/{id}")]
        [HttpGet]
        public ActionResult<string> ReadOrders(Guid id)
        {
            return new OkObjectResult(repo.Read(id));
        }

        [Route("updateorders")]
        [HttpPut]
        public ActionResult<string> UpdateOrders([FromBody] Orders orders)
        {
            repo.Update(orders);
            return new OkObjectResult(repo.Read(orders.Id_Order));
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public ActionResult<string> DeleteOrders(Guid id)
        {
            try
            {
                Orders orders = new Orders() { };
                orders.Id_Order = id;
                repo.Delete(orders.Id_Order);
                return new OkObjectResult(new { delete_orders = id });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
