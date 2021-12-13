using Microsoft.Extensions.DependencyInjection;
using SampleProjectLib;
using System;
using Xunit;

namespace SampleProjectxUnitTest
{
    public class ServiceProviderTest
    {
        private IServiceProvider _serviceProvider;

        public ServiceProviderTest(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        [Fact(DisplayName = "should be pass with defined")]
        [Trait("ServiceProvider", "SayHello")]
        public void ServiceProviderTest_with_defined_result()
        {
            Assert.NotNull(_serviceProvider);
        }
    }
}
