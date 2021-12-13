using SampleProjectLib;
using System;
using Xunit;

namespace SampleProjectxUnitTest
{
    public class GreeterTest
    {
        [Fact(DisplayName = "should be pass and return empty result with null param")]
        [Trait("Greeter", "SayHello")]
        public void GreeterSayHelloTest_with_null_param()
        {
            var obj = new Greeter();
            // Act  
            var response = obj.SayHello(null);
            //Assert  
            Assert.Equal(string.Empty, response);
        }

        [Fact(DisplayName = "should be pass and return string \"Hello {param}\" with valid param")]
        [Trait("Greeter", "SayHello")]
        public void GreeterSayHelloTest_with_valid_param()
        {
            var obj = new Greeter();
            // Act  
            var response = obj.SayHello("World!");
            //Assert  
            Assert.Equal("Hello World!", response);
        }
    }
}
