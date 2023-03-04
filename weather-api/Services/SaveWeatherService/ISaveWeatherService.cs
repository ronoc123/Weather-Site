using Microsoft.AspNetCore.Mvc;
using Weather_Api.Dto.WeatherDto;
using Weather_Api.Model;

namespace Weather_Api.Services.SaveWeatherService
{
    public interface ISaveWeatherService
    {

        Task<ActionResult<ServiceResponse<List<GetWeatherDto>>>> GetAllSavedWeather();

        Task<ActionResult<ServiceResponse<GetWeatherDto>>> SaveWeatherLocation(AddUserWeatherDto weatherLocation);

        Task<ActionResult> DeleteWeatherLocation(int id);

    }
}
