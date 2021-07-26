using BackEnd.DataAccess;
using BackEnd.Repository;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Logging;
using Serilog;
using BackEnd.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using BackEnd.Domain;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Collections.Generic;
using BackEnd.Services;

namespace BackEnd.Controllers
{
    [Authorize]
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //private readonly IUsersRepository _repo;
        private readonly UserManager<Users> _userManager;
        private readonly ITokenService _tokenService;
        private readonly ILogger<UsersController> _log;
        private readonly IDiagnosticContext _diagnosticContext;

        public UsersController(UserManager<Users> userManager, ITokenService tokenService, ILogger<UsersController> log, IDiagnosticContext diagnosticContext)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _log = log;
            _diagnosticContext = diagnosticContext ??
                throw new ArgumentNullException(nameof(diagnosticContext));
        }


        [HttpPost("addusers")]
        public async Task<ActionResult<string>> AddNewUsers([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            Users user = new Users()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }


        [HttpGet("readallusers")]
        public ActionResult<string> ReadAllUsers()
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = _userManager.Users;
            _log.LogInformation("Read all users: {@res}", res);
            return new OkObjectResult(res);
        }

        [HttpGet("read/{id}")]
        public async Task<ActionResult<string>> ReadUsers(string id)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            var res = await _userManager.FindByIdAsync(id);
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

        //[HttpPut("updateusers")]
        //public async Task<ActionResult<string>> UpdateUsers([FromBody] Users users)
        //{
        //    _diagnosticContext.Set("CatalogLoadTime", 1423);
        //    _log.LogInformation("Update user request: {@users}", users);
        //    var isUsers = await _userManager.FindByNameAsync(users.UserName);
        //    if (isUsers != null)
        //    {
        //        return BadRequest(new { message = "Error username busy" });
        //    }
        //    var userUpdate = await _userManager.FindByIdAsync(users.Id);
        //    userUpdate.UserName = users.UserName;
        //    userUpdate.PasswordHash = users.PasswordHash;
        //    await _userManager.UpdateAsync(userUpdate);
        //    var res = await _userManager.FindByIdAsync(users.Id);
        //    _log.LogInformation("Update user: {@res}", res);
        //    return new OkObjectResult(res);
        //}

        [HttpDelete("delete/{id}")]
        public async Task<ActionResult<string>> DeleteUsers(string id)
        {
            try
            {
                _diagnosticContext.Set("CatalogLoadTime", 1423);
                _log.LogInformation("Delete user to id request: {@id}", id);
                var userExists = await _userManager.FindByIdAsync(id);
                await _userManager.DeleteAsync(userExists);
                return new OkObjectResult(new { delete_users = id });
            }
            catch
            {
                return BadRequest(new { message = "Not delete users" });
            }
        }


        [HttpPost("testAuthorization")]
        public async Task<ActionResult<string>> TestAuthorization([FromBody] LoginModel model)
        {
            _diagnosticContext.Set("CatalogLoadTime", 1423);
            _log.LogInformation("Authorization user: {@model}", model);
            var user = await _userManager.FindByNameAsync(model.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                //var nameRole = role.Name;
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id),
                    new Claim(ClaimTypes.Name, user.UserName),
                    //new Claim(ClaimTypes.Role, nameRole)
                };

                foreach (var userRole in userRoles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var accessToken = _tokenService.GenerateAccessToken(claims);
                var refreshToken = _tokenService.GenerateRefreshToken();

                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
                await _userManager.UpdateAsync(user);


                var responce = new
                {
                    Id_users = user.Id,
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                };

                //Docker needs to be enabled first
                //await _bus.SendAsync(Queue.Processing, responce.ToString());

                return new OkObjectResult(responce);
            }
            return Unauthorized();
        }
    }
}
