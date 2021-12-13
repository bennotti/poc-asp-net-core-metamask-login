using Microsoft.EntityFrameworkCore;
using SampleProject.Domain.Repository.Entity;
using SampleProject.Infrastructure.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SampleProjectxUnitTest.Infrastructure.Repository
{
    public partial class DatabaseContextMock : DatabaseContext
    {
        public DatabaseContextMock(DbContextOptions options) : base(options)
        {
            SeedMockAsync().GetAwaiter().GetResult();
        }

        private async Task SeedMockAsync()
        {
            await this.Tasks.AddRangeAsync(
                new TaskEntity() { Id = 1, Title = "Earth" }
            );
            await this.SaveChangesAsync();
        }
    }
}
