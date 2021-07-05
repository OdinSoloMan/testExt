using BackEnd.DataAccess;
using BackEnd.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ninject;

namespace BackEnd.Controllers
{
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        IUsersRepository repo;
        public UsersController(IUsersRepository r)
        {
            repo = r;
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
            return new OkObjectResult(repo.ReadAll());
        }

        [Route("read/{id}")]
        [HttpGet]
        public ActionResult<string> ReadUsers(Guid id)
        {
            return new OkObjectResult(repo.Read(id));
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
