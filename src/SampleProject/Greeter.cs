using System;

namespace SampleProjectLib
{
    public class Greeter
    {
        public string SayHello(string param)
        {
            if (string.IsNullOrEmpty(param)) return string.Empty;
            return $"Hello {param}";
        }
    }
}
