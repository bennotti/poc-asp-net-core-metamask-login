using SampleProject.Infrastructure.Repository;
using SampleProjectLib;
using SampleProjectxUnitTest.Infrastructure.Repository;
using System;
using System.Linq;
using Xunit;

namespace SampleProjectxUnitTest
{
    public class DbContextTest
    {
        private DatabaseContextMock _db;
        public DbContextTest(DatabaseContextMock db)
        {
            _db = db;
        }

        [Fact(DisplayName = "should be pass with a DatabaseContext instance defined")]
        [Trait("DbContextTest", "DatabaseContext defined")]
        public void DbContextTest_valid_databaseContext()
        {
            Assert.NotNull(_db);
        }

        [Fact(DisplayName = "should be pass with tasks any data")]
        [Trait("DbContextTest", "tasks any data")]
        public void DbContextTest_tasks_any_data()
        {
            Assert.True(_db.Tasks.Any());
        }
    }
}
