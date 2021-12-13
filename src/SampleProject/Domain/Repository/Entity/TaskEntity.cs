using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Text;

namespace SampleProject.Domain.Repository.Entity
{
    [ExcludeFromCodeCoverage]
    public class TaskEntity
    {
        public int Id { get; set; }
        public string Title { get; set; }
    }
}
