using BackEnd.DataAccess;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebApplication.DataAccess
{
    public class AppDatabaseContext : IdentityDbContext<Users>
    {
        public AppDatabaseContext(DbContextOptions<AppDatabaseContext> options) :
            base(options)
        { }

        public AppDatabaseContext() => Database.EnsureCreated();

        protected override void OnConfiguring(DbContextOptionsBuilder OptionsBuilder) =>
            //pc home
            //Data Source=localhost;Initial Catalog=ContextApp;Integrated Security=True
            //pc job
            //Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog={nameof(AppDatabaseContext)};Integrated Security=True
            OptionsBuilder.UseSqlServer($"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog={nameof(AppDatabaseContext)};Integrated Security=True");

        //public DbSet<Users> Users { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Orders> Orders { get; set; }
        //public DbSet<Roles> Roles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) => base.OnModelCreating(builder);
    }
}