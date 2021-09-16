using Backend_MyTask.DataAccess;
using Backend_MyTask.Domain;
using Backend_MyTask.Models;
using Backend_MyTask.Service.Entity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        UserManager<User> _userManager;
        
        public UsersController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("create")]
        public async Task<ActionResult<string>> Create(CreateUserModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new User { Email = model.Email, UserName = model.Password };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    return new OkObjectResult(true);
                }
                else
                {
                    return new OkObjectResult(false);
                }
            }
            return new OkObjectResult(false);
        }


        public async Task<ActionResult<string>> Edit(string id)
        {
            User user = await _userManager.FindByIdAsync(id);
            if(user == null)
            {
                return new OkObjectResult(false);
            }
            EditUserModel model = new EditUserModel { Id = user.Id, Email = user.Email };
            return new OkObjectResult(model);
        }

        [HttpPost("edit")]
        public async Task<ActionResult<string>> Edit(EditUserModel model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByIdAsync(model.Id);
                if(user != null)
                {
                    user.Email = model.Email;
                    user.UserName = model.Email;

                    var result = await _userManager.UpdateAsync(user);
                    if (result.Succeeded)
                    {
                        return new OkObjectResult(true);
                    }
                    else
                    {
                        return new OkObjectResult(false);

                    }
                }
            }
            return new OkObjectResult(false);
        }

        [HttpPost("delete/{id}")]
        public async Task<ActionResult<string>> Delete (string id)
        {
            User user = await _userManager.FindByIdAsync(id);

            if(user != null)
            {
                IdentityResult result = await _userManager.DeleteAsync(user);
                return new OkObjectResult(true);
            }
            return new OkObjectResult(false);
        }

        public async Task<ActionResult<string>> ChangePassword(string id)
        {
            User user = await _userManager.FindByIdAsync(id);
            if (user  == null)
            {
                return new OkObjectResult(false);
            }
            ChangePasswordModel model = new ChangePasswordModel { Id = user.Id, Email = user.Email };
            return new OkObjectResult(model);
        }

        [HttpPost("change-password")]
        public async Task<ActionResult<string>> ChangePassword(ChangePasswordModel model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByIdAsync(model.Id);
                if (user != null)
                {
                    var _passwordValidator = HttpContext.RequestServices.GetService(typeof(IPasswordValidator<User>)) as IPasswordValidator<User>;
                    var _passwordHasher = HttpContext.RequestServices.GetService(typeof(IPasswordHasher<User>)) as IPasswordHasher<User>;

                    IdentityResult result = await _passwordValidator.ValidateAsync(_userManager, user, model.NewPassword);

                    if (result.Succeeded)
                    {
                        user.PasswordHash = _passwordHasher.HashPassword(user, model.NewPassword);
                        await _userManager.UpdateAsync(user);
                        return new OkObjectResult(true);
                    } 
                    else
                    {
                        return new OkObjectResult(false);
                    }
                }
                else
                {
                    return new OkObjectResult(false);
                }
            }
            return new OkObjectResult(false);
        }

        [HttpPost("change-password-knowing-old")]
        public async Task<ActionResult<string>> ChangePasswordKnowingOld(ChangePasswordKnowingOldModel model)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByIdAsync(model.Id);

                if(user != null)
                {
                    IdentityResult result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                    
                    if (result.Succeeded)
                    {
                        return new OkObjectResult(true);
                    }
                    else
                    {
                        return new OkObjectResult(false);
                    }
                }
                else
                {
                    return new OkObjectResult(false);
                }
            }
            return new OkObjectResult(false);
        }

        [HttpPost("select-id/{email}")]
        public async Task<ActionResult<string>> Select(string email)
        {
            User user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return new OkObjectResult(false);
            }
            EditUserModel model = new EditUserModel { Id = user.Id, Email = user.Email };
            return new OkObjectResult(model);
        }

        //    private readonly IUserRepository _repo;

        //    public UsersController(IUserRepository repo)
        //    {
        //        _repo = repo;
        //    }

        //    // GET: user/readalluser
        //    [HttpGet("read-all-user")]
        //    public async Task<ActionResult<string>> GetReadAllUser() =>
        //        new OkObjectResult(await _repo.ReadAll());

        //    // GET user/read/{id}
        //    [HttpGet("read/{id}")]
        //    public async Task<ActionResult<string>> GetReadUser(Guid id)
        //    {
        //        var res = await _repo.Read(id);
        //        if (res != null)
        //        {
        //            return new OkObjectResult(res);
        //        }
        //        return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "This board will not find!" });
        //    }

        //    // POST user/add
        //    [HttpPost]
        //    public async Task<ActionResult<string>> PostAddUser([FromBody] User user)
        //    {
        //        if (ModelState.IsValid)
        //        {
        //            user.UserCreate(user.Username, user.Password);
        //            await _repo.Create(user);
        //            return new OkObjectResult(user);
        //        }
        //        return BadRequest(ModelState);
        //    }

        //    // PUT user/update/{id}
        //    [HttpPut("{id}")]
        //    public async Task<ActionResult<string>> PutUpdateUser(Guid id, [FromBody] User user)
        //    {
        //        var res = _repo.Read(id);
        //        if (res != null)
        //        {
        //            await _repo.Update(user);
        //            return new OkObjectResult(user);
        //        }
        //        return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "This board will not find!" });
        //    }

        //    // DELETE user/delete/{id}
        //    [HttpDelete("delete/{id}")]
        //    public async Task<ActionResult<string>> DeleteUser(Guid id)
        //    {
        //        try
        //        {
        //            await _repo.Delete(id);
        //            return new OkObjectResult(new { delete_user = id });
        //        }
        //        catch
        //        {
        //            return StatusCode(StatusCodes.Status400BadRequest, new Response { Status = "Error", Message = "An error occurred while uninstalling!" });
        //        }
        //    }
    }
}
