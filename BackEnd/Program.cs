using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using Serilog.Formatting.Compact;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication;

namespace BackEnd
{
    public class Program
    {
        public static int Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                // Filter out ASP.NET Core infrastructre logs that are Information and below
                .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .CreateLogger();

            // Wrap creating and running the host in a try-catch block
            try
            {
                Log.Information("Starting host");
                CreateHostBuilder(args).Build().Run();
                return 0;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Host terminated unexpectedly");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .UseSerilog() // <- Add this line
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
    }
}

//using Microsoft.AspNetCore.Hosting;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.Hosting;
//using Microsoft.Extensions.Logging;
//using Serilog;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using WebApplication;

//namespace BackEnd
//{
//    public class Program
//    {
//        public static void Main(string[] args)
//        {
//            //Read Configuration from appSettings
//            var config = new ConfigurationBuilder()
//                .AddJsonFile("appsettings.json")
//                .Build();
//            //Initialize Logger
//            Log.Logger = new LoggerConfiguration()
//                .ReadFrom.Configuration(config)
//                .CreateLogger();
//            try
//            {
//                Log.Information("Application Starting.");
//                CreateHostBuilder(args).Build().Run();
//            }
//            catch (Exception ex)
//            {
//                Log.Fatal(ex, "The Application failed to start.");
//            }
//            finally
//            {
//                Log.CloseAndFlush();
//            }
//        }

//        public static IHostBuilder CreateHostBuilder(string[] args) =>
//            Host.CreateDefaultBuilder(args)
//                .UseSerilog() //Uses Serilog instead of default .NET Logger
//                .ConfigureWebHostDefaults(webBuilder =>
//                {
//                    webBuilder.UseStartup<Startup>();
//                });
//    }
//}

//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.Hosting;
//using Microsoft.Extensions.Logging;
//using Serilog;

//namespace BackEnd
//{
//    public class Program
//    {
//        public static int Main(string[] args)
//        {
//            Log.Logger = new LoggerConfiguration()
//                .WriteTo.Console()
//                .WriteTo.File("logs/myapp.txt", rollingInterval: RollingInterval.Day, rollOnFileSizeLimit: true)
//                .CreateBootstrapLogger();

//            Log.Information("Starting up!");

//            try
//            {
//                CreateHostBuilder(args).Build().Run();

//                Log.Information("Stopped cleanly");
//                return 0;
//            }
//            catch (Exception ex)
//            {
//                Log.Fatal(ex, "An unhandled exception occured during bootstrapping");
//                return 1;
//            }
//            finally
//            {
//                Log.CloseAndFlush();
//            }
//        }

//        public static IHostBuilder CreateHostBuilder(string[] args) =>
//            Host.CreateDefaultBuilder(args)
//            .UseSerilog((context, services, configuration) => configuration
//                        .ReadFrom.Configuration(context.Configuration)
//                        .ReadFrom.Services(services)
//                        .Enrich.FromLogContext()
//                        .WriteTo.Console().WriteTo.File("logs/myapp.txt", rollingInterval: RollingInterval.Day, rollOnFileSizeLimit: true))
//            .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
//    }
//}


//using Microsoft.AspNetCore.Hosting;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Extensions.Hosting;
//using Microsoft.Extensions.Logging;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using WebApplication;

//namespace BackEnd
//{
//    public class Program
//    {
//        public static void Main(string[] args)
//        {
//            CreateHostBuilder(args).Build().Run();
//        }

//        public static IHostBuilder CreateHostBuilder(string[] args) =>
//            Host.CreateDefaultBuilder(args)
//                .ConfigureWebHostDefaults(webBuilder =>
//                {
//                    webBuilder.UseStartup<Startup>();
//                });
//    }
//}
