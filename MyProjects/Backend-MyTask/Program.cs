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

namespace Backend_MyTask
{
    public class Program
    {
        public static int Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.File(new CompactJsonFormatter(), "logs/myapp__.json")
                .CreateBootstrapLogger();

                        Log.Information("Starting up!");

                        try
                        {
                            CreateHostBuilder(args).Build().Run();

                            Log.Information("Stopped cleanly");
                            return 0;
                        }
                        catch (Exception ex)
                        {
                            Log.Fatal(ex, "An unhandled exception occured during bootstrapping");
                            return 1;
                        }
                        finally
                        {
                            Log.CloseAndFlush();
                        }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
            .UseSerilog((context, services, configuration) => configuration
                        .ReadFrom.Configuration(context.Configuration)
                        .ReadFrom.Services(services)
                        .Enrich.FromLogContext()
                        .WriteTo.Console()
                        .WriteTo.File(new CompactJsonFormatter(), "logs/myapp__.json"))
                        .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}
