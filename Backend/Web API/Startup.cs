using Autofac;
using BackEnd.DataAccess;
using BackEnd.Filter;
using BackEnd.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Events;
using System.Text;
using WebApplication.DataAccess;
using RabbitMQServices.Rabbit;

namespace BackEnd
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
            services.AddDbContext<AppDatabaseContext>
                //pc home
                //Data Source=localhost;Initial Catalog=ContextApp;Integrated Security=True
                //pc job
                //Data Source=WS-PC-16\\SQLEXPRESS;Initial Catalog={nameof(AppDatabaseContext)};Integrated Security=True
                (c => c.UseSqlServer(new ConnectionString().ConnStr()));
            services.AddControllers();

            // For Identity
            services.AddIdentity<Users, IdentityRole>()
                .AddEntityFrameworkStores<AppDatabaseContext>()
                .AddDefaultTokenProviders();

            services.AddOptions();

            services.AddCors();

            services.AddScoped<SimpleResourceFilter>();
            services.AddScoped<AddHeaderResultServiceFilter>();
            services.AddScoped<LogRequestResponseAttribute>();

            services.AddControllersWithViews(options =>
            {
                options.Filters.Add(typeof(SimpleResourceFilter));
                options.Filters.Add(typeof(AddHeaderResultServiceFilter));
                options.Filters.Add(typeof(LogRequestResponseAttribute));
            });

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
            });

            services.AddControllersWithViews();

            //Docker needs to be enabled first
            //services.AddSingleton(sp => RabbitHutch.CreateBus("localhost"));
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule(new Dependency.DependencyRegister());
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


            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}