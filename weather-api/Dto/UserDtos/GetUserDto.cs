using System.ComponentModel.DataAnnotations;
using Weather_Api.Model;

namespace Weather_Api.Dto.UserDtos
{
    public class GetUserDto
    {

        public string Username { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "user";

        public string Email { get; set; } = string.Empty;

        public DateTime RegistrationDate { get; set; }

        public DateTime LastLoginDate { get; set; }

    }
}
