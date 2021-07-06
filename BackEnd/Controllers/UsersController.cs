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

namespace BackEnd.Controllers
{
    [SimpleResourceFilter]
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository repo;
        readonly IDiagnosticContext _diagnosticContext;

        public UsersController(IUsersRepository r, IDiagnosticContext diagnosticContext)
        {
            repo = r;
            _diagnosticContext = diagnosticContext;
        }


        [Route("addusers")]
        [HttpPost]
        public ActionResult<string> AddNewUsers([FromBody] Users users)
        {
            users.Recording(users.Username, users.Password);
            repo.Create(users);
            return new OkObjectResult(users);
        }

        
        [Route("readallusers")]
        [HttpGet]
        public ActionResult<string> ReadAllUsers()
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            return new OkObjectResult(repo.ReadAll());
        }

        //[TimeElapsed]
        [Route("read/{id}")]
        [HttpGet]
        public ActionResult<string> ReadUsers(Guid id)
        {
            var res = repo.Read(id);
            if (res != null)
                return new OkObjectResult(repo.Read(id));
            else
                return BadRequest(new { message = "Not users under such id" });
        }

        [Route("updateusers")]
        [HttpPut]
        public ActionResult<string> UpdateUsers([FromBody] Users users)
        {
            repo.Update(users);
            return new OkObjectResult(repo.Read(users.Id_User));
        }

        [Route("delete/{id}")]
        [HttpDelete]
        public ActionResult<string> DeleteUsers(Guid id)
        {
            try
            {
                Users users = new Users() { };
                users.Id_User = id;
                repo.Delete(users.Id_User);
                return new OkObjectResult(new { delete_users = id });
            }
            catch
            {
                return BadRequest();
            }
        }

        //private IUsersRepository db;

        //public UsersController()
        //{
        //    db = new UsersRepository();
        //}


        //[Route("addusers")]
        //[HttpPost]
        //public ActionResult<string> AddNewUsers([FromBody] Users users)
        //{
        //    users.Recording(users.Username, users.Password);
        //    db.Create(users);
        //    return new OkObjectResult(users);
        //}

        //[Route("readallusers")]
        //[HttpGet]
        //public ActionResult<string> ReadAllUsers()
        //{
        //    return new OkObjectResult(db.ReadAll());
        //}
    }
}
