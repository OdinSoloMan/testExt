using Backend_MyTask.DataAccess;
using Backend_MyTask.Domain;
using Backend_MyTask.Service.Entity;
using Backend_MyTask.Service.Token;
using Backend_MyTask.SIngalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend_MyTask
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHostedService<DashboardHostedService>();

            services.AddDbContext<ApplicationDatabaseContext>
                // Home
                // Data Source=localhost;Initial Catalog={nameof(ApplicationDatabaseContext)};Integrated Security=True
                // Work
                // Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog={nameof(ApplicationDatabaseContext)};Integrated Security=True
                (c => c.UseSqlServer($"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog={nameof(ApplicationDatabaseContext)};Integrated Security=True"));

            services.AddIdentity<User, IdentityRole>(opt => 
                {
                    opt.Password.RequiredLength = 7;
                    opt.Password.RequireDigit = false;
                    opt.Password.RequireUppercase = false;

                    opt.User.RequireUniqueEmail = true;

                    opt.SignIn.RequireConfirmedEmail = true;
                })
                .AddEntityFrameworkStores<ApplicationDatabaseContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,

                    ValidIssuer = "http://localhost:5000",
                    ValidAudience = "http://localhost:5000",
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"))
                };

                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Query["access_token"];

                        // If the request is for our hub...
                        var path = context.HttpContext.Request.Path;
                        if (!string.IsNullOrEmpty(accessToken) &&
                            (path.StartsWithSegments("/notificationHub")))
                        {
                            // Read the token out of the query string
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });

            services.AddCors();
            //services.AddCors(o => o.AddPolicy("CorsPolicy", builder => {
            //    builder
            //        .AllowAnyMethod()
            //        .AllowAnyHeader()
            //        .AllowAnyOrigin()
            //        .AllowCredentials()
            //        .WithOrigins("https://localhost:4200");
            //}));

            services.AddSignalR(opt => {
                opt.EnableDetailedErrors = true;
            });

            services.AddSingleton<IUserIdProvider, NameUserIdProvider>();

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IBoardRepository, BoardRepository>();
            services.AddTransient<IMyTaskRepository, MyTaskRepository>();
            services.AddTransient<ITokenService, TokenService>();

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSerilogRequestLogging(options =>
            {
                // Customize the message template
                options.MessageTemplate = "Handled {RequestPath}";

                // Emit debug-level events instead of the defaults
                options.GetLevel = (httpContext, elapsed, ex) => LogEventLevel.Information;

                // Attach additional properties to the request completion event
                options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
                {
                    diagnosticContext.Set("RequestHost", httpContext.Request.Host.Value);
                    diagnosticContext.Set("RequestScheme", httpContext.Request.Scheme);
                    diagnosticContext.Set("ResponceHeaders", httpContext.Response.Headers);
                };
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x
                            .AllowAnyMethod()
                            .AllowAnyHeader()
                            .SetIsOriginAllowed(origin => true) // allow any origin
                            .AllowCredentials());


            //app.UseSignalR(routes =>
            //{
            //    routes.MapHub<NotificationHub>("/notificationHub");
            //});

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationHub>("/notificationHub");
            });
        }
    }
}

public class NameUserIdProvider : IUserIdProvider
{
    public string GetUserId(HubConnectionContext connection)
    {
        return connection.User?.Identity?.Name;
    }
}