using BackEnd.Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.DataAccess
{
    //[Index("Username", IsUnique = true, Name = "Username_Index")]
    public class Users : IdentityUser
    {
        //[Key]
        //public Guid Id_User { get; set; }
        //public string Username { get; set; }
        //public string Password { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

        //public int RolesId { get; set; }
        //public Roles Roles { get; set; }

        public List<Orders> Orders { get; set; } = new List<Orders>();


        public Users()
        {
            //Id_User = new Guid();
            //Username = "";
            //Password = "";
            RefreshToken = null;
            RefreshTokenExpiryTime = new DateTime();
            //RolesId = 0;
        }

        public Users(string _RefreshToken, DateTime _RefreshTokenExpiryTime)
        {
            //Username = _Username;
            //Password = _Password;
            RefreshToken = _RefreshToken;
            RefreshTokenExpiryTime = _RefreshTokenExpiryTime;
           //RolesId = _RolesId;
        }

        public void Recording(string _RefreshToken, DateTime _RefreshTokenExpiryTime)
        {
            //Username = _Username;
            //Password = Md5.Encrypt(_Password);
            RefreshToken = _RefreshToken;
            RefreshTokenExpiryTime = _RefreshTokenExpiryTime;
            //RolesId = _RolesId;
        }
    }
}
/*
 using BackEnd.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BackEnd.DataAccess
{
    [Index("Username", IsUnique = true, Name = "Username_Index")]
    public class Users
    {
        [Key]
        public Guid Id_User { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

        public int RolesId { get; set; }
        public Roles Roles { get; set; }

        public List<Orders> Orders { get; set; } = new List<Orders>();


        public Users()
        {
            Id_User = new Guid();
            Username = "";
            Password = "";
            RefreshToken = null;
            RefreshTokenExpiryTime = new DateTime();
        }

        public Users(string _Username, string _Password, string _RefreshToken, DateTime _RefreshTokenExpiryTime, int _RolesId)
        {
            Username = _Username;
            Password = _Password;
            RefreshToken = _RefreshToken;
            RefreshTokenExpiryTime = _RefreshTokenExpiryTime;
            RolesId = _RolesId;
        }

        public void Recording(string _Username, string _Password, string _RefreshToken, DateTime _RefreshTokenExpiryTime, int _RolesId)
        {
            Username = _Username;
            Password = Md5.Encrypt(_Password);
            RefreshToken = _RefreshToken;
            RefreshTokenExpiryTime = _RefreshTokenExpiryTime;
            RolesId = _RolesId;
        }
    }
}

 */