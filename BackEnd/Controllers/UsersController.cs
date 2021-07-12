using BackEnd.DataAccess;
using BackEnd.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ninject;
using BackEnd.Filter;
using System.Net;
using Microsoft.Extensions.Logging;
using Serilog;
using Newtonsoft.Json;
using BackEnd.Models;

namespace BackEnd.Controllers
{
    //[SimpleResourceFilter]
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository repo;
        private readonly ILogger<UsersController> _log;
        private readonly IDiagnosticContext _diagnosticContext;


        public UsersController(IUsersRepository r, ILogger<UsersController> log, IDiagnosticContext diagnosticContext)
        {
            repo = r;
            _log = log;
            _diagnosticContext = diagnosticContext ??
                throw new ArgumentNullException(nameof(diagnosticContext));
        }


        [Route("addusers")]
        [HttpPost]
        public ActionResult<string> AddNewUsers([FromBody] Users users)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Add users: {@users}", users);
            users.Recording(users.Username, users.Password);
            repo.Create(users);
            return new OkObjectResult(users);
        }

        
        [Route("readallusers")]
        [HttpGet]
        public ActionResult<string> ReadAllUsers()
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = repo.ReadAll();
            _log.LogInformation("Read all users: {@res}", res);
            return new OkObjectResult(res);
        }

        //[TimeElapsed]
        [Route("read/{id}")]
        [HttpGet]
        public ActionResult<string> ReadUsers(Guid id)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = repo.Read(id);
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

        [Route("updateusers")]
        [HttpPut]
        public ActionResult<string> UpdateUsers([FromBody] Users users)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Update user request: {@users}", users);
            repo.Update(users);
            var res = repo.Read(users.Id_User);
            _log.LogInformation("Update user: {@res}", res);
            return new OkObjectResult(res);
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public ActionResult<string> DeleteUsers(Guid id)
        {
            try
            {
                _diagnosticContext.Set("CatalogLoadTime", 1423);
                _log.LogInformation("Delete user to id request: {@id}", id);
                Users users = new Users() { };
                users.Id_User = id;
                repo.Delete(users.Id_User);
                return new OkObjectResult(new { delete_users = id });
            }
            catch
            {
                return BadRequest(new { message = "Not delete users"});
            }
        }


        [Route("testAuthorization")]
        [HttpPost]
        public ActionResult<string> testAuthorization([FromBody] AccountLogin account)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Authorization user: {@account}", account);
            var a = repo.Authorization(account.Username, account.Password);
            if(a != null)
                return new OkObjectResult(a);
            else
                return BadRequest();
        }
    }
}
