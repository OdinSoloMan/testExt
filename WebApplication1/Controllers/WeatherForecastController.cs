using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApplication1.Controllers
{
    [ApiController]
    //[Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
       public class Queue
      {
           public static string Processing { get; } = "StartProcessingQueue";
     }

    private readonly ILogger<WeatherForecastController> _logger;
        private readonly IBus _busControl;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IBus busControl)
        {
            _logger = logger;
            _busControl = busControl;
        }

        [HttpPost("test/{request}")]
        public async Task<IActionResult> Post(string request)
        {
            if (request == null)
            {
                _logger.LogDebug("BadRequest - ConfigurationDto is null or empty");
                return BadRequest();
            }

            await _busControl.SendAsync(Queue.Processing, new { s= request});

            return Ok();
        }

    }
}
