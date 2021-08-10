using System;

namespace BackEnd.Models
{
    public class TokenApi
    {
        public Guid Id_users { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
