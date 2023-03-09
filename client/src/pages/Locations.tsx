import React from "react";
import WeatherCard from "../Components/WeatherCard";
import WeatherLocation from "../Components/WeatherLocation";

const Locations = () => {
  return (
    <div className="full-screen bg-gradient-to-b from-mid-purple to-light-purple grid justify-center">
      <WeatherLocation />
    </div>
  );
};

export default Locations;
