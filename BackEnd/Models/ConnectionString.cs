using WebApplication.DataAccess;

namespace BackEnd.Models
{
    public class ConnectionString
    {
        public string ConnStr() => $"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog={nameof(AppDatabaseContext)};Integrated Security=True";
    }
}
