import { useState, useEffect } from "react";
import { WeatherResponse, CityLocation } from "../model";
import { useAppContext } from "../context/AppContext";
import { Pagination, TextField } from "@mui/material";
import WeatherMain from "./WeatherMain";

const SavedWeatherLocation = () => {
  const ctx = useAppContext();

  const [value, setValue] = useState<number>(0);
  const [location, setLocation] = useState<string>();
  const [weatherLocation, setWeatherLocation] = useState<string[]>();

  const saveInfo = (cities: CityLocation[]) => {
    let result = [];

    for (const value in cities) {
      result.push(cities[value].city);
    }

    setWeatherLocation(result);
  };

  useEffect(() => {
    getUsersSavedWeatherLocations();
    saveInfo(userSavedWeatherLocations);
  }, []);

  if (ctx == null) return <div>Loading...</div>;

  const { getUsersSavedWeatherLocations, userSavedWeatherLocations } = ctx;

  return (
    <div className="sm:w-11/12 md:w-8/12 lg:w-6/12">
      {/* <TextField
        id="outlined-controlled"
        label="Username"
        value={location}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setLocation(event.target.value);
        }}
      /> */}
      <WeatherMain lat={20} lon={20} />
      <div className="grid place-content-center mt-2">
        <Pagination count={userSavedWeatherLocations.length} size="large" />
      </div>
    </div>
  );
};

export default SavedWeatherLocation;
