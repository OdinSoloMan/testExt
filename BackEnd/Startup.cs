using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebApplication.DataAccess;
using Microsoft.EntityFrameworkCore;
using BackEnd.Repository;
using Serilog;
using Serilog.Events;
using BackEnd.Filter;
using IdentityServer4.Models;
using System.Collections.Generic;
using IdentityServer4.Test;

namespace BackEnd
{
    public class Startup
    {
        public static List<TestUser> GetUsers()
        {
            return new List<TestUser>
            {
                new TestUser
                {
                    SubjectId = "1",
                    Username = "alice",
                    Password = "password"
                },
                new TestUser
                {
                    SubjectId = "2",
                    Username = "bob",
                    Password = "password"
                }
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new List<Client>
            {
                // other clients omitted...                
                // resource owner password grant client
                new Client
                {
                    ClientId = "ro.client",
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    ClientSecrets = { new Secret("secret".Sha256()) },
                    AllowedScopes = { "api1" }
                }
            };
        }

        public static IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource("api1", "My API")
            };
        }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<AppDatabaseContext>
                (c => c.UseSqlServer($"Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog={nameof(AppDatabaseContext)};Integrated Security=True"));
            services.AddControllers();

            services.AddTransient<IUsersRepository, UsersRepository>();
            services.AddTransient<IProductsRepository, ProductsRepository>();
            services.AddTransient<IOrdersRepository, OrdersRepository>();
            services.AddCors();

            services.Configure<PositionOptions>(
                Configuration.GetSection("Position"));
            services.AddScoped<SimpleResourceFilter>();
            services.AddScoped<AddHeaderResultServiceFilter>();
            services.AddScoped<LogRequestResponseAttribute>();

            services.AddIdentityServer()
                .AddInMemoryClients(new List<Client>())
                .AddInMemoryIdentityResources(new List<IdentityResource>())
                .AddInMemoryApiResources(new List<ApiResource>())
                .AddTestUsers(new List<TestUser>())
                .AddDeveloperSigningCredential();

            services.AddControllersWithViews(options =>
            {
                options.Filters.Add(typeof(SimpleResourceFilter));
                options.Filters.Add(typeof(AddHeaderResultServiceFilter));
                options.Filters.Add(typeof(LogRequestResponseAttribute));
            });
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

            app.UseMiddleware<ResponseRewindMiddleware>();


            app.UseRouting();

            app.UseCors(
                options => options.SetIsOriginAllowed(x => _ = true).AllowAnyMethod().AllowAnyHeader().AllowCredentials()
            );

            app.UseIdentityServer();


            //app.UseAuthentication();
            //app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}