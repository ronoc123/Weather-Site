import { useState } from "react";
import axios from "axios";
import { WeatherResponse } from "../model";
import { useEffect } from "react";
const useFetchWeather = (lat: number, lon: number) => {
  const [value, setValue] = useState<WeatherResponse | null>(null);

  async function fetchData(lat: number, lon: number) {
    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    );
    setValue(data);
  }

  useEffect(() => {
    fetchData(lat, lon);
  }, [lat, lon]);

  return {
    value,
  };
};

export default useFetchWeather;
