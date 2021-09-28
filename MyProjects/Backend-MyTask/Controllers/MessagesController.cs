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
        [HttpGet("all/{message}")]
        public ActionResult<IEnumerable<string>> GetAll(string message)
        {
            _hubContext.Clients.All.SendAsync("clientMethodName", new { MessageType= "All", Message = message });
            return new string[] { "value1", "value2" };
        }

        /// <summary>
        /// Sending a message to a specific user (test)
        /// </summary>
        /// <param name="connectionId"></param>
        /// <returns></returns>
        // GET api/values/5
        [HttpGet("user/{connectionId}/{message}")]
        public ActionResult<string> GetUser(string connectionId, string message)
        {
            _hubContext.Clients.User(connectionId).SendAsync("clientMethodName", new { MessageType = "UserMessage", Message = message });
            return "value";
        }
    }
}
