using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Weather_Api.Data;
using Weather_Api.Dto.WeatherDto;
using Weather_Api.Model;
using Weather_Api.Services.SaveWeatherService;

namespace Weather_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SaveWeatherController : ControllerBase
    {
        private readonly ISaveWeatherService _saveWeatherService;
        private readonly DataContext _context;

        public SaveWeatherController(ISaveWeatherService saveWeatherService, DataContext context)
        {
            _saveWeatherService = saveWeatherService;
            _context = context;
        }


        [HttpGet, Authorize(Roles = "User")]
        public async Task<ActionResult<ServiceResponse<List<GetWeatherDto>>>> GetWeatherLocations()
        {

            var response = await _saveWeatherService.GetAllSavedWeather();

            if (!response.Value!.Success)
            {
                return Ok(response.Value);
            }

            return BadRequest(response.Value);

        }

        [HttpPost]

        public async Task<ActionResult<ServiceResponse<GetWeatherDto>>> AddWeatherLocation(AddUserWeatherDto request)
        {

            var response = await _saveWeatherService.SaveWeatherLocation(request);
            if (!response.Value!.Success)
            {
               return Ok(response.Value);
            }
            return BadRequest(response.Value);
        }

    }
}
