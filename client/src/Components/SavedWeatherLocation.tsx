import { useState, useEffect } from "react";
import { WeatherResponse, CityLocation } from "../model";
import { useAppContext } from "../context/AppContext";
import { Pagination, TextField } from "@mui/material";
import WeatherMain from "./WeatherMain";
import axios from "axios";
import { count } from "console";

const SavedWeatherLocation = () => {
  const ctx = useAppContext();

  const [value, setValue] = useState<number>(0);
  const [location, setLocation] = useState<string>();
  const [weatherLocation, setWeatherLocation] = useState<number[]>();

  const saveInfo = async (city: string) => {
    const { data } = await axios(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
    );

    setWeatherLocation([data[0].lat, data[0].lon]);
  };
  useEffect(() => {
    getUsersSavedWeatherLocations();
  }, []);

  useEffect(() => {
    saveInfo(userSavedWeatherLocations[value - 1]?.city);
  }, [value]);

  if (ctx == null) return <div>Loading...</div>;

  const { getUsersSavedWeatherLocations, userSavedWeatherLocations } = ctx;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setValue(value);
  };

  return (
    <div className="sm:w-11/12 md:w-8/12 lg:w-6/12">
      <WeatherMain
        lat={weatherLocation ? weatherLocation[0] : 20}
        lon={weatherLocation ? weatherLocation[1] : 20}
      />
      <div className="grid place-content-center mt-2">
        <Pagination
          count={userSavedWeatherLocations.length}
          size="large"
          onChange={handleChange}
          page={value}
        />
      </div>
    </div>
  );
};

export default SavedWeatherLocation;
