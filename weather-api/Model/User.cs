﻿using System.ComponentModel.DataAnnotations;

namespace Weather_Api.Model
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; } = string.Empty;

        [Required]
        public string Role { get; set; } = "User";

        [Required]
        public string Email { get; set; } = string.Empty;

        public DateTime RegistrationDate { get; set; }

        public DateTime LastLoginDate { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }

        public List<WeatherLocation> WeatherLocations { get; set; } = new List<WeatherLocation>();
    }
}
