﻿using Microsoft.EntityFrameworkCore;
using Weather_Api.Model;

namespace Weather_Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=weatherdb;Trusted_Connection=True;TrustServerCertificate=true;");
        }




        public DbSet<WeatherLocation> WeatherLocations { get; set; }

        public DbSet<User> Users { get; set; }



       
    }
}
