namespace Weather_Api.Model
{
    public class UserWeatherLocation
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int WeatherLocationId { get; set; }
        public WeatherLocation WeatherLocation { get; set; }
    }
}
