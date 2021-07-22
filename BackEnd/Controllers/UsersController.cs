using BackEnd.DataAccess;
using BackEnd.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Logging;
using Serilog;
using BackEnd.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace BackEnd.Controllers
{
    [Authorize]
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _repo;
        private readonly ILogger<UsersController> _log;
        private readonly IDiagnosticContext _diagnosticContext;

        public UsersController(IUsersRepository repo, ILogger<UsersController> log, IDiagnosticContext diagnosticContext)
        {
            _repo = repo;
            _log = log;
            _diagnosticContext = diagnosticContext ??
                throw new ArgumentNullException(nameof(diagnosticContext));
        }


        [HttpPost("addusers")]
        public async Task<ActionResult<string>> AddNewUsers([FromBody] Users users)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Add users: {@users}", users);
            users.Recording(users.Username, users.Password, null, new DateTime());
            if(await _repo.Select(users.Username))
            {
                return BadRequest(new { message = "Error username busy" });
            }
            await _repo.Create(users);
            return new OkObjectResult(users);
        }

        
        [HttpGet("readallusers")]
        public async Task<ActionResult<string>> ReadAllUsers()
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = await _repo.ReadAll();
            _log.LogInformation("Read all users: {@res}", res);
            return new OkObjectResult(res);
        }

        [HttpGet("read/{id}")]
        public async Task<ActionResult<string>> ReadUsers(Guid id)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res =  await _repo.Read(id);
            if (res != null)
            {
                _log.LogInformation("Read user: {@res}", res);
                return new OkObjectResult(res);
            }
            else
            {
                return BadRequest(new { message = "Not user under such id" });
            }
        }

        [HttpPut("updateusers")]
        public async Task<ActionResult<string>> UpdateUsers([FromBody] Users users)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Update user request: {@users}", users);
            if (await _repo.Select(users.Username))
            {
                return BadRequest(new { message = "Error username busy" });
            }
            await _repo.Update(users);
            var res = await _repo.Read(users.Id_User);
            _log.LogInformation("Update user: {@res}", res);
            return new OkObjectResult(res);
        }

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<string>> DeleteUsers(Guid id)
        {
            try
            {
                _diagnosticContext.Set("CatalogLoadTime", 1423);
                _log.LogInformation("Delete user to id request: {@id}", id);
                Users users = new Users() { };
                users.Id_User = id;
                await _repo.Delete(users.Id_User);
                return new OkObjectResult(new { delete_users = id });
            }
            catch
            {
                return BadRequest(new { message = "Not delete users"});
            }
        }


        [HttpPost("testAuthorization")]
        public async Task<ActionResult<string>> TestAuthorization([FromBody] AccountLogin account)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Authorization user: {@account}", account);
            var res = await _repo.Authorization(account.Username, account.Password);
            if(res != null)
                return new OkObjectResult(res);
            else
                return BadRequest();
        }
    }
}
