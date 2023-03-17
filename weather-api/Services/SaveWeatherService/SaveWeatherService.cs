using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Weather_Api.Data;
using Weather_Api.Dto.WeatherDto;
using Weather_Api.Model;

namespace Weather_Api.Services.SaveWeatherService
{
    public class SaveWeatherService : ISaveWeatherService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SaveWeatherService(DataContext context, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _contextAccessor = httpContextAccessor;

            _context = context;

            _mapper = mapper;
        }
        private int GetUserId()
        {
           return int.Parse(_contextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        }
        public Task<ActionResult> DeleteWeatherLocation(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<ActionResult<ServiceResponse<List<GetWeatherDto>>>> GetAllSavedWeather()
        {
            var response = new ServiceResponse<List<GetWeatherDto>>();

            List<WeatherLocation> weatherLocations = await _context.WeatherLocations
                .Include(x => x.Users)
                .Where(weatherLocations => weatherLocations.Users.Select(u => u.Id).Contains(GetUserId()))
                .ToListAsync();
            
          

            if (weatherLocations == null)
            {
                response.Success = false;
                response.Message = "No Saved Locations";
            }
            else
            {
                response.Success = true;
                response.Data = weatherLocations.Select(w => _mapper.Map<GetWeatherDto>(w)).ToList();

            }

              

           return response;
        }


        public async Task<ActionResult<ServiceResponse<GetWeatherDto>>> SaveWeatherLocation(AddUserWeatherDto request)
        {

                var response = new ServiceResponse<GetWeatherDto>();
            try
            {


                var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == GetUserId());

                if (user == null)
                {
                    response.Success = false;
                    response.Message = "Please Login to Save a Location.";
                    return response;
                }

                var weatherLocation = await _context.WeatherLocations.FirstOrDefaultAsync(w => w.City == request.City);



                if (weatherLocation == null)
                {
                    weatherLocation = new WeatherLocation();
                    weatherLocation.City = request.City;
                  
                    await _context.WeatherLocations.AddAsync(weatherLocation);
                    await _context.SaveChangesAsync();

                    weatherLocation = await _context.WeatherLocations.FirstOrDefaultAsync(w => w.City.Equals(request.City));
                }

                if (weatherLocation == null)
                {
                    response.Success = false;
                    response.Message = "Weather Location Not Found.";
                    return response;
                }

                weatherLocation!.Users.Add(user);

 
                await _context.SaveChangesAsync();

                response.Data = _mapper.Map<GetWeatherDto>(weatherLocation);

                

                
            } 
            catch (Exception ex)
            {

                response.Success = false;
                response.Message = ex.Message;
            }

            return response;
        }
    }
}
