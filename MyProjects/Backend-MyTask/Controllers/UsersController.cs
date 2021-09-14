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
    [Route("user")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repo;

        public UsersController(IUserRepository repo)
        {
            _repo = repo;
        }

        // GET: user/readalluser
        [HttpGet("read-all-user")]
        public async Task<ActionResult<string>> GetReadAllUser() =>
            new OkObjectResult(await _repo.ReadAll());

        // GET user/read/{id}
        [HttpGet("read/{id}")]
        public async Task<ActionResult<string>> GetReadUser(Guid id)
        {
            var res = await _repo.Read(id);
            if (res != null)
            {
                return new OkObjectResult(res);
            }
            return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "This board will not find!" });
        }

        // POST user/add
        [HttpPost]
        public async Task<ActionResult<string>> PostAddUser([FromBody] User user)
        {
            if (ModelState.IsValid)
            {
                user.UserCreate(user.Username, user.Password);
                await _repo.Create(user);
                return new OkObjectResult(user);
            }
            return BadRequest(ModelState);
        }

        // PUT user/update/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<string>> PutUpdateUser(Guid id, [FromBody] User user)
        {
            var res = _repo.Read(id);
            if (res != null)
            {
                await _repo.Update(user);
                return new OkObjectResult(user);
            }
            return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "This board will not find!" });
        }

        // DELETE user/delete/{id}
        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<string>> DeleteUser(Guid id)
        {
            try
            {
                await _repo.Delete(id);
                return new OkObjectResult(new { delete_user = id });
            }
            catch
            {
                return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "An error occurred while uninstalling!" });
            }
        }
    }
}
