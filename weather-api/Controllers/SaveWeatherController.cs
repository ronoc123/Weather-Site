using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Weather_Api.Data;
using Weather_Api.Model;
using Weather_Api.Services.SaveWeatherService;

namespace Weather_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaveWeatherController : ControllerBase
    {
        private readonly ISaveWeatherService _saveWeatherService;
        private readonly DataContext _context;

        public SaveWeatherController(ISaveWeatherService saveWeatherService, DataContext context)
        {
            _saveWeatherService = saveWeatherService;
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<WeatherLocation>>> GetWeatherLocations()
        {
            throw new NotImplementedException();
        }

    }
}
