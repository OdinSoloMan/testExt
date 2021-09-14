using Backend_MyTask.DataAccess;
using Backend_MyTask.Domain;
using Backend_MyTask.Service.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.Controllers
{
    [Route("mytask")]
    [ApiController]
    public class MyTasksController : ControllerBase
    {
        private readonly IMyTaskRepository _repo;

        public MyTasksController(IMyTaskRepository repo)
        {
            _repo = repo;
        }

        // GET: mytask/readall
        [HttpGet("read-all-mytask")]
        public async Task<ActionResult<string>> GetReadAllMyTask() =>
            new OkObjectResult(await _repo.ReadAll());

        // GET mytask/{id}
        [HttpGet("read/{id}")]
        public async Task<ActionResult<string>> GetReadMyTask(Guid id)
        {
            var res = await _repo.Read(id);
            if(res != null)
            {
                return new OkObjectResult(res);
            }
            return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "This MyTask will not find!" });
        }

        // POST mytask/add
        [HttpPost("add")]
        public async Task<ActionResult<string>> PostAddMyTask([FromBody] MyTask myTask)
        {
            if (ModelState.IsValid)
            {
                myTask.MyTaskCreate(myTask.Name, myTask.Description, myTask.File, myTask.DateTime);
                await _repo.Create(myTask);
                return new OkObjectResult(myTask);
            }
            return BadRequest(ModelState);
        }

        // PUT mytask/update/{id}
        [HttpPut("update/{id}")]
        public async Task<ActionResult<string>> PutUpdateMyTask(Guid id, [FromBody] MyTask myTask)
        {
            var res = _repo.Read(id);
            if (res != null)
            {
                await _repo.Update(myTask);
                return new OkObjectResult(myTask);
            }
            return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "This MyTask will not find!" });
        }

        // DELETE mytask/delete/{id}
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<string>> DeleteMyTask(Guid id)
        {
            try
            {
                await _repo.Delete(id);
                return new OkObjectResult(new { delete_mytask = id });
            }
            catch
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "An error occurred while uninstalling!" });
            }
        }
    }
}
