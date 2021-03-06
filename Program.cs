using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Mikado.Models;

namespace Mikado
{
  public class Program
  {
    public static void Main(string[] args)
    {
      var host = CreateHostBuilder(args).Build();

      CreateDbIfNotExists(host);

      host.Run();
    }

    private static void CreateDbIfNotExists(IHost host)
    {
      using (var scope = host.Services.CreateScope())
      {
        var services = scope.ServiceProvider;
        var logger = services.GetRequiredService<ILogger<Program>>();

        try
        {
          var context = services.GetRequiredService<MediaDbContext>();
          context.Database.EnsureCreated();
          logger.LogInformation("Database created 🚀 🎉");
        }
        catch (Exception ex)
        {
          logger.LogError(ex, "An error occurred creating the DB.");
        }
      }
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
              webBuilder.UseStartup<Startup>();
            });
  }
}
