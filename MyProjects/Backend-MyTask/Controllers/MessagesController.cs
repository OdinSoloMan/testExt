using Backend_MyTask.Domain;
using Backend_MyTask.SIngalR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Backend_MyTask.Controllers
{
    [Route("message")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private IHubContext<NotificationHub> _hubContext;

        public MessagesController(IHubContext<NotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        /// <summary>
        /// Sending a message to users (test)
        /// </summary>
        /// <returns></returns>
        // GET api/values
        [HttpGet("all")]
        public ActionResult<IEnumerable<string>> Get()
        {
            _hubContext.Clients.All.SendAsync("clientMethodName", "get all called");
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Sending a message to a specific user (test)
        /// </summary>
        /// <param name="connectionId"></param>
        /// <returns></returns>
        // GET api/values/5
        [HttpGet("user/{connectionId}")]
        public ActionResult<string> Get(string connectionId)
        {
            _hubContext.Clients.Client(connectionId).SendAsync("clientMethodName", "get called");
            return "value";
        }
    }
}
