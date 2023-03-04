using AutoMapper;
using Weather_Api.Dto.WeatherDto;
using Weather_Api.Model;

namespace Weather_Api
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<WeatherLocation, GetWeatherDto>();
        }
    }
}
