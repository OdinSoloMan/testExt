using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BackEnd.Models
{
    public class AuthOptions
    {
        public const string ISSUER = "textExt";
        public const string AUDIENCE = "http://localhost:5001/";
        const string KEY = "OdinSolo_textExt-v1";
        public const int LIFETIME = 60;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
