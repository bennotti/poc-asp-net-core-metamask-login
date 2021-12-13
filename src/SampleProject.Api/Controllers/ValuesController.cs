using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SampleProject.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ValuesController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<ValuesController> _logger;
        private readonly Random _random;

        public ValuesController(Random random, ILogger<ValuesController> logger)
        {
            _logger = logger;
            _random = random;
        }

        [HttpGet]
        public IEnumerable<string> Get()
        {
            _logger.LogInformation("Obtendo WeatherForecast");
            return Enumerable.Range(1, 5).Select(index => Summaries[_random.Next(Summaries.Length)])
            .ToArray();
        }
    }
}
