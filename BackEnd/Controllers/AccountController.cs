﻿using BackEnd.Models;
using BackEnd.Rabbit;
using BackEnd.Repository;
using BackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BackEnd.Controllers
{
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly IUsersRepository _repo;
        private readonly ITokenService _tokenService;
        private readonly IBus _bus;

        public AccountController(IUsersRepository repo, ITokenService tokenService, IBus bus)
        {
            _repo = repo;
            _tokenService = tokenService;
            _bus = bus;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] AccountLogin accountLogin)
        {
            var users = await _repo.Authorization(accountLogin.Username, accountLogin.Password);
            if(users != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, users.Id_User.ToString()),
                    new Claim(ClaimTypes.Name, users.Username),
                    //you can add roles so that later you can differentiate by rolls
                    new Claim(ClaimTypes.Role, "users")
                };

                var accessToken = _tokenService.GenerateAccessToken(claims);
                var refreshToken = _tokenService.GenerateRefreshToken();

                users.RefreshToken = refreshToken;
                users.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
                await _repo.Update(users);


                var responce = new
                {
                    Id_users = users.Id_User,
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                };

                await _bus.SendAsync(Queue.Processing, responce);

                return new OkObjectResult(responce);
            }
            return Unauthorized();
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<string>> Refresh([FromBody] TokenApi tokenApi)
        {
            if(tokenApi != null)
            {
                string accessToken = tokenApi.AccessToken;
                string refreshToken = tokenApi.RefreshToken;


                var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);
                _ = principal.Identity.Name; //this is mapped to the Name claim by default

                var user = await _repo.Read(tokenApi.Id_users);

                if (user == null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                {
                    return BadRequest(new { messgae = "Invalid client request" });
                }


                var newAccessToken = _tokenService.GenerateAccessToken(principal.Claims);
                var newRefreshToken = _tokenService.GenerateRefreshToken();

                user.RefreshToken = newRefreshToken;

                await _repo.Update(user);

                return new OkObjectResult(new
                {
                    Id_users = user.Id_User,
                    AccessToken = newAccessToken,
                    RefreshToken = newRefreshToken
                });
            }
            return BadRequest(new { messgae = "Invalid client request" });
        }

        [Authorize]
        [HttpPost("revoke/{id}")]
        public async Task<ActionResult<string>> Revoke(Guid id)
        {
            var user = await _repo.Read(id);

            if(user != null)
            {
                user.RefreshToken = null;
                await _repo.Update(user);
                return NoContent();
            }
            return BadRequest();
        }
    }
}
