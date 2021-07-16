using BackEnd.Models;
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

        public AccountController(IUsersRepository repo, ITokenService tokenService)
        {
            _repo = repo;
            _tokenService = tokenService;
        }

        [Route("login")]
        [HttpPost]
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

                return new OkObjectResult(new
                {
                    Id_users = users.Id_User,
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                });
            }
            return Unauthorized();
        }

        [Route("refresh")]
        [HttpPost]
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
        [Route("revoke/{id}")]
        [HttpPost]
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

        //[Route("login")]
        //[HttpPost]
        //public async Task<ActionResult<string>> Login([FromBody] AccountLogin value)
        //{
        //    var identity = await GetIdentity(value.Username, value.Password);

        //    if (identity == null)
        //    {
        //        return BadRequest();
        //    }

        //    var s = identity.Claims.ToList();
        //    var x = s[0].Value;

        //    var now = DateTime.UtcNow;

        //    var jwt = new JwtSecurityToken(
        //                    issuer: AuthOptions.ISSUER,
        //                    audience: AuthOptions.AUDIENCE,
        //                    notBefore: now,
        //                    claims: identity.Claims,
        //                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
        //                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
        //    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        //    return new OkObjectResult(new
        //    {
        //        token = encodedJwt,
        //        guid = x
        //    });
        //}

        //private async Task<ClaimsIdentity> GetIdentity(string username, string password)
        //{
        //    var users = await _repo.Authorization(username, password);
        //    if (users != null)
        //    {
        //        var claims = new List<Claim>
        //        {
        //            new Claim(ClaimTypes.NameIdentifier, users.Id_User.ToString()),
        //            new Claim(ClaimTypes.Name, users.Username),
        //            //new Claim(ClaimsIdentity.DefaultRoleClaimType, users.Role)
        //        };

        //        ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims,
        //            "Token",
        //            ClaimsIdentity.DefaultNameClaimType,
        //            ClaimsIdentity.DefaultRoleClaimType);
        //        return claimsIdentity;
        //    }
        //    return null;
        //}

        //[Authorize]
        //[Route("logout")]
        //[HttpPost]
        //public ActionResult<string> Logout()
        //{
        //    return new OkObjectResult(new { message = "Logout" });
        //}
    }
}
