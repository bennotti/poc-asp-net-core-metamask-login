using SampleProject.Core.InternalServices.Interfaces;
using SampleProjectLib;
using System;
using Xunit;

namespace SampleProjectxUnitTest
{
    public class ServiceTest
    {
        private readonly IGreeterService _greeterService;
        public ServiceTest(IGreeterService greeterService)
        {
            _greeterService = greeterService;
        }
        [Fact(DisplayName = "should be pass and defined greeterService instance")]
        [Trait("ServiceTest", "Defined")]
        public void ServiceTest_with_service_defined()
        {
            Assert.NotNull(_greeterService);
        }
    }
}
