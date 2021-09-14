﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_MyTask.DataAccess
{
    public class ApplicationDatabaseContext : DbContext
    {
        public ApplicationDatabaseContext(DbContextOptions<ApplicationDatabaseContext> options) :
            base(options)
        { }

        public ApplicationDatabaseContext() =>
            Database.EnsureCreated();

        protected override void OnConfiguring(DbContextOptionsBuilder OptionsBuilder) =>
            OptionsBuilder.UseSqlServer($"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog={nameof(ApplicationDatabaseContext)};Integrated Security=True");

        public DbSet<User> Users { get; set; }
        public DbSet<Board> Boards { get; set; }
        public DbSet<MyTask> MyTasks { get; set; }
    }
}