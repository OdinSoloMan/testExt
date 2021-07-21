using EasyNetQ;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication2.BackgroundService;

namespace WebApplication2.Controllers
{
    [ApiController]
    public class ProducerController : ControllerBase
    {
        private readonly IBus _bus;

        public ProducerController(IBus bus)
        {
            _bus = bus;
        }

        [HttpPost("aaaaaa")]
        public async Task<ActionResult<string>> AddOrders()
        {
            UserRequest requst = new UserRequest(1);

            var response = await _bus.Rpc.RequestAsync<UserRequest, UserResponce>(requst);

            return new OkObjectResult(response.Name);
        }
    }
}
