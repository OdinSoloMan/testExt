using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.DataAccess
{
    //[Index("Username", IsUnique = true, Name = "Username_Index")]
    public partial class User : IdentityUser
    {
        //[Key]
        //public Guid Id { get; set; }

        //[Required(ErrorMessage = "{0} is required.")]
        //[DisplayName("Username")]
        //[StringLength(50, MinimumLength = 3, ErrorMessage = "Part {0} must be between {2} and {1} character(s) in length.")]
        //public string Username { get; set; }

        //[Required(ErrorMessage = "{0} is required.")]
        //[DisplayName("Password")]
        //[StringLength(50, MinimumLength = 5, ErrorMessage = "Part {0} must be between {2} and {1} character(s) in length.")]
        //public string Password { get; set; }

        public ICollection<Board> Boards { get; set; }


        //public User()
        //{
        //    Id = new Guid();
        //    Username = "";
        //    Password = "";
        //}

        //public void UserCreate(string _Username, string _Password)
        //{
        //    Username = _Username;
        //    Password = _Password;
        //}
    }
}
