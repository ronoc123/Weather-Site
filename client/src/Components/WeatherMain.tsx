import React from "react";
import convertToFahrenheit from "../utils/Convert";
import useFetchWeather from "../Hooks/useFetchWeather";
import { useEffect } from "react";

interface Props {
  lat?: number;
  lon?: number;
}

const WeatherMain: React.FC<Props> = ({ lat, lon }) => {
  const { value } = useFetchWeather(lat || 0, lon || 0);
  if (value === null) return <div>No Content</div>;
  const { weather } = value;
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const timeHours = currentTime.getHours();

  return (
    <div className="background-image text-white rounded-lg shadow-md h-5/6 mt-8">
      <header className="text-2xl bg-black opacity-75 p-1 pl-6 rounded-t-lg">
        <span className="opacity-100">
          {value?.name} As of {hours > 12 ? hours - 12 : hours}:
          {minutes < 10 ? `0${minutes}` : minutes}{" "}
          {timeHours < 12 ? "am" : "pm"}
        </span>
      </header>
      <div className="grid grid-flow-col p-4">
        <div>
          <h1 className="text-8xl mb-2 font-medium">
            {convertToFahrenheit(value?.main.temp)}°
          </h1>
          <h1 className="text-4xl mb-2 font-medium">{weather[0]?.main}</h1>
          <h1 className="text-4xl font-medium">
            Low {convertToFahrenheit(value.main.temp_min)}° - High{" "}
            {convertToFahrenheit(value.main.temp_max)}°
          </h1>
        </div>
        <div className="justify-self-end self-center w-4/5">
          <div className="">
            <img
              src={`http://openweathermap.org/img/wn/${value.weather[0].icon}.png`}
              alt=""
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMain;
