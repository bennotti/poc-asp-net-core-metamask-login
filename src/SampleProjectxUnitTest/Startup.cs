using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SampleProject.Core.BusinessRules.Interfaces;
using SampleProject.Core.InternalServices.Interfaces;
using SampleProject.Infra.BusinessRules;
using SampleProject.Infra.InternalServices;
using SampleProject.Infrastructure.Repository;
using SampleProjectxUnitTest.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace SampleProjectxUnitTest
{
    public class Startup
    {
        public void ConfigureHost(IHostBuilder hostBuilder)
        {
            //hostBuilder
            //    .ConfigureAppConfiguration(builder =>
            //    {
            //        builder
            //            .AddInMemoryCollection(new Dictionary<string, string>()
            //            {
            //                {"UserName", "Alice"}
            //            })
            //            .AddJsonFile("appsettings.json")
            //            ;
            //    })
            //    ;
        }

        public void ConfigureServices(IServiceCollection services, HostBuilderContext hostBuilderContext)
        {
            services.AddDbContext<DatabaseContextMock>(options =>
            {
                options.UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString());
            });

            services.AddTransient<IGreeterService, GreeterService>();
            services.AddTransient<IGreeterBusinessRule, GreeterBusinessRule>();
        }

        public void Configure(IServiceProvider applicationServices)
        {
        }
    }
}
