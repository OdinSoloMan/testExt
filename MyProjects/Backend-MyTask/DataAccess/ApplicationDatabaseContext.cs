using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.DataAccess
{
    public class ApplicationDatabaseContext : IdentityDbContext<User>
    {
        public ApplicationDatabaseContext(DbContextOptions<ApplicationDatabaseContext> options) :
            base(options)
        { }

        public ApplicationDatabaseContext() =>
            Database.EnsureCreated();

        protected override void OnConfiguring(DbContextOptionsBuilder OptionsBuilder) =>
            // Home
            // Data Source=localhost;Initial Catalog={nameof(ApplicationDatabaseContext)};Integrated Security=True
            // Work
            // Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog={nameof(ApplicationDatabaseContext)};Integrated Security=True
            OptionsBuilder.UseSqlServer($"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog={nameof(ApplicationDatabaseContext)};Integrated Security=True");

        //public DbSet<User> Users { get; set; }
        public DbSet<Board> Boards { get; set; }
        public DbSet<MyTask> MyTasks { get; set; }
    }
}