namespace Weather_Api.Model
{
    public class WeatherLocation
    {
        public int Id { get; set; }

        public string City { get; set; }

        public List<User> Users { get; set; }
    }
}
