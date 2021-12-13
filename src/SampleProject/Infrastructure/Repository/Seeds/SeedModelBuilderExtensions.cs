using Microsoft.EntityFrameworkCore;
using SampleProject.Domain.Repository.Entity;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace SampleProject.Infrastructure.Repository.Seeds
{
    [ExcludeFromCodeCoverage]
    public static class SeedModelBuilderExtensions
    {
        public static void Seed(this ModelBuilder builder)
        {
            var task1 = new TaskEntity
            {
                Id = 1,
                Title = "Tarefa 1"
            };

            builder.Entity<TaskEntity>().HasData(task1);
        }
    }
}
