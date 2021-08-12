using BackEnd.DataAccess;
using BackEnd.Domain;
using BackEnd.Models;
using BackEnd.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RabbitMQServices.Client;
using RabbitMQServices.Rabbit;
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

            //await _bus.SendAsync(Queue.Processing, model);

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
                //await _bus.ReceiveAsync(Queue.Processing, Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(responce)));

                //var aaaa = new Test().TestG();

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

                var newAccessToken = _tokenService.GenerateAccessToken(claims);
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

        [HttpPost("Tasdaas/{crop}")]
        public async Task<ActionResult<string>> Testaaa(string crop)
        {
            Console.Title = "RabbitMQ RPC Client";
            string name = crop;

            using var rpcClient = new RpcClient();
            Console.WriteLine("Press ENTER or Ctrl+C to exit.");

            string message = null;

            using (var colour = new ScopedConsoleColour(ConsoleColor.Blue))
            {
                message = name;
            }

            if (string.IsNullOrWhiteSpace(message))
            {
                return BadRequest();
            }
            else
            {
                var response = await rpcClient.SendAsync(message);

                Console.Write("Response was: ");
                using var colour = new ScopedConsoleColour(ConsoleColor.Green);
                Console.WriteLine(response);
                return new OkObjectResult(response);
            }
        }
    }
}
