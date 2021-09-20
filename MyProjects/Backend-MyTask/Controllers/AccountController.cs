using Backend_MyTask.DataAccess;
using Backend_MyTask.Models;
using Backend_MyTask.Service.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Backend_MyTask.Controllers
{
    [Route("account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register([FromBody] RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                User user = new User { Email = model.Email, UserName = model.Email };
                var result = await _userManager.CreateAsync(user, model.Password);
                if (result.Succeeded)
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = "http://localhost:8100/confirm-email/account?userId=" + user.Id + "&code=" + HttpUtility.UrlEncode(Base64Encode(code));


                    //var callbackUrl = Url.Action(
                    //    nameof(ConfirmEmail),
                    //    "account",
                    //    new { userId = user.Id, code = code },
                    //    protocol: HttpContext.Request.Scheme);
                    EmailService emailService = new EmailService();
                    await emailService.SendEmailAsync(model.Email, "Confirm your account",
                        $"Confirm registration by following the link: <a href='{callbackUrl}'>link</a>");

                    //await _signInManager.SignInAsync(user, false);
                    return new OkObjectResult(true);
                }
                else
                {
                    return BadRequest();
                }
            }
            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return BadRequest();
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest();
            }
            var result = await _userManager.ConfirmEmailAsync(user, Base64Decode(HttpUtility.UrlDecode(code)));
            if (result.Succeeded)
                return new OkObjectResult(true);
            else
                return BadRequest();
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login ([FromBody] LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, false);
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


        [HttpPost("logout")]
        [Authorize]
        public async Task<ActionResult<string>> Logout()
        {
            await _signInManager.SignOutAsync();
            return new OkObjectResult(true);
        }


        [HttpPost("reset-password-msg-email")]
        [AllowAnonymous]
        [Authorize]
        public async Task<ActionResult<string>> ResetPassword([FromBody] ForgotPasswordModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                if(user == null ||  !(await _userManager.IsEmailConfirmedAsync(user)))
                {
                    return new OkObjectResult(false);
                }

                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                var callbackUrl = "http://localhost:8100/switch-password/reset-password/?userId=" + user.Id + "&code=" + HttpUtility.UrlEncode(code);

                // Replaced generator with string execution

                //var callbackUrl = Url.Action(
                //    nameof(ResetPassword),
                //    "Account",
                //    new { userId = user.Id, code = code },
                //    protocol: HttpContext.Request.Scheme);
                EmailService emailService = new EmailService();
                await emailService.SendEmailAsync(model.Email, "Confirm your account",
                    $"Confirm reset password the link: <a href='{callbackUrl}'>link</a>");


                //EmailService emailService = new EmailService();
                //var str = "Confirm reset password by following the link: < a href=" + callbackUrl + ">link</a>";
                //await emailService.SendEmailAsync(model.Email, "Confirm your account",
                //    str);
                return new OkObjectResult(true);
            }
            return new OkObjectResult(false);
        }

        [HttpPost("reset-psw")]
        [AllowAnonymous]
        [Authorize]
        public async Task<ActionResult<string>> ResetPassword(ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            if(user == null)
            {
                return BadRequest();
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return new OkObjectResult(true);
            }
            return BadRequest();
        }


        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}
