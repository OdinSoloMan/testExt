using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace BackEnd.DataAccess
{
    public class Users : IdentityUser
    {
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

        public List<Orders> Orders { get; set; } = new List<Orders>();


        public Users()
        {
            RefreshToken = null;
            RefreshTokenExpiryTime = new DateTime();
        }

        public Users(string _RefreshToken, DateTime _RefreshTokenExpiryTime)
        {
            RefreshToken = _RefreshToken;
            RefreshTokenExpiryTime = _RefreshTokenExpiryTime;
        }

        public void Recording(string _RefreshToken, DateTime _RefreshTokenExpiryTime)
        {
            RefreshToken = _RefreshToken;
            RefreshTokenExpiryTime = _RefreshTokenExpiryTime;
        }
    }
}