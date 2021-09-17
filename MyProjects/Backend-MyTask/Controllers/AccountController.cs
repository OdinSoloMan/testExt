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
using System.Threading.Tasks;

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
                    var callbackUrl = Url.Action(
                        nameof(ConfirmEmail),
                        "account",
                        new { userId = user.Id, code = code },
                        protocol: HttpContext.Request.Scheme);
                    EmailService emailService = new EmailService();
                    await emailService.SendEmailAsync(model.Email, "Confirm your account",
                        $"Confirm registration by following the link: <a href='{callbackUrl}'>link</a>");

                    //await _signInManager.SignInAsync(user, false);
                    return new OkObjectResult(true);
                }
                else
                {
                    return new OkObjectResult(false);
                }
            }
            return new OkObjectResult(false);
        }

        [HttpGet]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return new OkObjectResult(false);
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new OkObjectResult(false);
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded)
                return new OkObjectResult(new { Account_activated = true });
            else
                return new OkObjectResult(false);
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


        [HttpPost("reset-password")]
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
                var callbackUrl = Url.Action(
                    nameof(ResetPassword),
                    "Account",
                    new { userId = user.Id, code = code },
                    protocol: HttpContext.Request.Scheme);
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

        [HttpPost("resetaaa")]
        [AllowAnonymous]
        [Authorize]
        public async Task<ActionResult<string>> ResetPassword(ResetPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return new OkObjectResult(false);
            }
            var user = await _userManager.FindByEmailAsync(model.Email);
            if(user == null)
            {
                return new OkObjectResult(false);
            }
            var result = await _userManager.ResetPasswordAsync(user, model.Code, model.Password);
            if (result.Succeeded)
            {
                return new OkObjectResult(true);
            }
            return new OkObjectResult(false);
        }
    }
}
