import { useState, useEffect } from "react";
import { Forecast } from "../model";
import axios from "axios";

const useFetchHourlyWeather = (lat: number, lon: number) => {
  const [value, setValue] = useState<Forecast[]>();

  async function fetchData(lat: number, lon: number) {
    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    );

    setValue(data.list.slice(0, 4));
  }

  useEffect(() => {
    fetchData(lat, lon);
  }, [lat, lon]);
  return {
    value,
  };
};

export default useFetchHourlyWeather;
