using Microsoft.AspNetCore.Mvc;
using Weather_Api.Model;

namespace Weather_Api.Services.SaveWeatherService
{
    public interface ISaveWeatherService
    {

        Task<ActionResult<List<WeatherLocation>>> GetAllSavedWeather();

        Task<ActionResult<WeatherLocation>> SaveWeatherLocation();

        Task<ActionResult> DeleteWeatherLocation(int id);

    }
}
