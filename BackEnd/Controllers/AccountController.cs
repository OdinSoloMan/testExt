﻿using BackEnd.DataAccess;
using BackEnd.Domain;
using BackEnd.Models;
using BackEnd.Rabbit;
using BackEnd.Repository;
using BackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Serilog;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<Users> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        //private readonly IUsersRepository _repo;
        private readonly ITokenService _tokenService;
        private readonly ILogger<AccountController> _log;
        private readonly IDiagnosticContext _diagnosticContext;
        //private readonly IRolesRepository _rolesRepository;

        //private readonly IBus _bus;

        public AccountController(UserManager<Users> userManager, RoleManager<IdentityRole> roleManager, ITokenService tokenService, ILogger<AccountController> log, IDiagnosticContext diagnosticContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _log = log;
            _diagnosticContext = diagnosticContext;
            //_rolesRepository = rolesRepository;
            //Docker needs to be enabled first
            //_bus = bus;
        }

        [HttpPost("registration")]
        public async Task<ActionResult<string>> Registration([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            Users user = new Users()
            {
                //Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }

        [HttpPost]
        [Route("register-admin")]
        public async Task<IActionResult> RegisterAdmin([FromBody] RegisterModel model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });

            Users user = new Users()
            {
                //Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };
            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User creation failed! Please check user details and try again." });

            if (!await _roleManager.RoleExistsAsync(UserRoles.Admin))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
            if (!await _roleManager.RoleExistsAsync(UserRoles.User))
                await _roleManager.CreateAsync(new IdentityRole(UserRoles.User));

            if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                await _userManager.AddToRoleAsync(user, UserRoles.Admin);
            }

            return Ok(new Response { Status = "Success", Message = "User created successfully!" });
        }


        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginModel model)
        {
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

        [HttpPost("refresh")]
        public async Task<ActionResult<string>> Refresh([FromBody] TokenApi tokenApi)
        {
            if (tokenApi != null)
            {
                string accessToken = tokenApi.AccessToken;
                string refreshToken = tokenApi.RefreshToken;


                var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
                _ = principal.Identity.Name; //this is mapped to the Name claim by default

                var user = await _userManager.FindByIdAsync(tokenApi.Id_users.ToString());

                if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                {
                    return BadRequest(new { messgae = "Invalid client request" });
                }


                var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
                var newRefreshToken = _tokenService.GenerateRefreshToken();

                user.RefreshToken = newRefreshToken;

                await _userManager.UpdateAsync(user);

                return new OkObjectResult(new
                {
                    tokenApi.Id_users,
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                });
            }
            return BadRequest(new { messgae = "Invalid client request" });
        }

        [Authorize]
        [HttpPost("revoke/{id}")]
        public async Task<ActionResult<string>> Revoke(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user != null)
            {
                user.RefreshToken = null;
                await _userManager.UpdateAsync(user);
                return NoContent();
            }
            return BadRequest();
        }

        //[HttpPost("refresh")]
        //public async Task<ActionResult<string>> Refresh([FromBody] TokenApi tokenApi)
        //{
        //    if (tokenApi != null)
        //    {
        //        string accessToken = tokenApi.AccessToken;
        //        string refreshToken = tokenApi.RefreshToken;


        //        var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
        //        _ = principal.Identity.Name; //this is mapped to the Name claim by default

        //        var user = await _userManager.FindByIdAsync(tokenApi.Id_users.ToString());

        //        if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
        //        {
        //            return BadRequest(new { messgae = "Invalid client request" });
        //        }


        //        var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
        //        var newRefreshToken = _tokenService.GenerateRefreshToken();

        //        user.RefreshToken = newRefreshToken;

        //        //await _userManager.Update(user);
        //        //_userManager.

        //        return new OkObjectResult(new
        //        {
        //            Id_users = tokenApi.Id_users,
        //            AccessToken = newAccessToken,
        //            RefreshToken = newRefreshToken
        //        });
        //    }
        //    return BadRequest(new { messgae = "Invalid client request" });
        //}


        //[HttpPost("registration")]
        //public async Task<ActionResult<string>> Registration(Users users)
        //{
        //    _diagnosticContext.Set("CatalogLoadTime", 1423);
        //    _log.LogInformation("Registration users: {@users}", users);
        //    users.Recording(users.Username, users.Password, null, new DateTime(), 1);
        //    if (await _repo.Select(users.Username))
        //    {
        //        return BadRequest(new { message = "Error username busy" });
        //    }
        //    await _repo.Create(users);
        //    return new OkObjectResult(users);
        //}

        //[HttpPost("login")]
        //public async Task<ActionResult<string>> Login([FromBody] AccountLogin accountLogin)
        //{
        //    var users = await _repo.Authorization(accountLogin.Username, accountLogin.Password);
        //    if(users != null)
        //    {
        //        var role = await _rolesRepository.Read(users.RolesId);
        //        var nameRole = role.Name;
        //        var claims = new List<Claim>
        //        {
        //            new Claim(ClaimTypes.NameIdentifier, users.Id_User.ToString()),
        //            new Claim(ClaimTypes.Name, users.Username),
        //            new Claim(ClaimTypes.Role, nameRole)
        //        };

        //        var accessToken = _tokenService.GenerateAccessToken(claims);
        //        var refreshToken = _tokenService.GenerateRefreshToken();

        //        users.RefreshToken = refreshToken;
        //        users.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
        //        await _repo.Update(users);


        //        var responce = new
        //        {
        //            Id_users = users.Id_User,
        //            AccessToken = accessToken,
        //            RefreshToken = refreshToken
        //        };

        //        //Docker needs to be enabled first
        //        //await _bus.SendAsync(Queue.Processing, responce.ToString());

        //        return new OkObjectResult(responce);
        //    }
        //    return Unauthorized();
        //}

        //[HttpPost("refresh")]
        //public async Task<ActionResult<string>> Refresh([FromBody] TokenApi tokenApi)
        //{
        //    if(tokenApi != null)
        //    {
        //        string accessToken = tokenApi.AccessToken;
        //        string refreshToken = tokenApi.RefreshToken;


        //        var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
        //        _ = principal.Identity.Name; //this is mapped to the Name claim by default

        //        var user = await _repo.Read(tokenApi.Id_users);

        //        if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
        //        {
        //            return BadRequest(new { messgae = "Invalid client request" });
        //        }


        //        var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
        //        var newRefreshToken = _tokenService.GenerateRefreshToken();

        //        user.RefreshToken = newRefreshToken;

        //        await _repo.Update(user);

        //        return new OkObjectResult(new
        //        {
        //            Id_users = user.Id_User,
        //            AccessToken = newAccessToken,
        //            RefreshToken = newRefreshToken
        //        });
        //    }
        //    return BadRequest(new { messgae = "Invalid client request" });
        //}

        //[Authorize]
        //[HttpPost("revoke/{id}")]
        //public async Task<ActionResult<string>> Revoke(Guid id)
        //{
        //    var user = await _repo.Read(id);

        //    if(user != null)
        //    {
        //        user.RefreshToken = null;
        //        await _repo.Update(user);
        //        return NoContent();
        //    }
        //    return BadRequest();
        //}
    }
}
