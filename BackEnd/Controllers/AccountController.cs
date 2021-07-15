using BackEnd.Models;
using BackEnd.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace BackEnd.Controllers
{
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly IUsersRepository repo;

        public AccountController(IUsersRepository r)
        {
            repo = r;
        }

        [Route("login")]
        [HttpPost]
        public ActionResult<string> Login([FromBody] AccountLogin value)
        {
            var identity = GetIdentity(value.Username, value.Password);

            if (identity == null)
            {
                return BadRequest();
            }

            var s = identity.Claims.ToList();
            var x = s[0].Value;

            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                            issuer: AuthOptions.ISSUER,
                            audience: AuthOptions.AUDIENCE,
                            notBefore: now,
                            claims: identity.Claims,
                            expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                            signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new OkObjectResult(new
            {
                token = encodedJwt,
                guid = x
            });
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            //var users = repo.Authorization(username, password);
            //if (users != null)
            //{
            //    var claims = new List<Claim>
            //    {
            //        new Claim(ClaimTypes.NameIdentifier, users.Id_User.ToString()),
            //        new Claim(ClaimTypes.Name, users.Username),
            //        //new Claim(ClaimsIdentity.DefaultRoleClaimType, users.Role)
            //    };

            //    ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, 
            //        "Token", 
            //        ClaimsIdentity.DefaultNameClaimType,
            //        ClaimsIdentity.DefaultRoleClaimType);
            //    return claimsIdentity;
            //}
            return null;
        }

        [Authorize]
        [Route("logout")]
        [HttpPost]
        public ActionResult<string> Logout()
        {

            return new OkObjectResult(new { message = "it`s logout" });
        }
    }
}
