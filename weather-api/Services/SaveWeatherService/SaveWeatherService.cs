using Microsoft.AspNetCore.Mvc;
using Weather_Api.Model;

namespace Weather_Api.Services.SaveWeatherService
{
    public class SaveWeatherService : ISaveWeatherService
    {
        public Task<ActionResult> DeleteWeatherLocation(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult<List<WeatherLocation>>> GetAllSavedWeather()
        {
            throw new NotImplementedException();
        }

        public Task<ActionResult<WeatherLocation>> SaveWeatherLocation()
        {
            throw new NotImplementedException();
        }
    }
}
