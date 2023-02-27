import { useReducer, useContext, createContext, useEffect } from "react";
import reducer from "./reducer";
import { ForecastResponse } from "../model";
import axios from "axios";

interface Values {
  location: string;
  isLoading: boolean;
  userLocation: number[];
  hourlyWeather: ForecastResponse[];
  updateUserLocation: (city: string) => Promise<void>;
}
const initialState = {
  location: "",
  isLoading: false,
  userLocation: [],
  hourlyWeather: [],
};

const AppContext = createContext<Values | null>(null);

const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getUserStartingLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch({
        type: "SET_USER_LOCATION",
        payload: [position.coords.latitude, position.coords.longitude],
      });
    });
  };

  const updateUserLocation = async (location: string) => {
    var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(location);

    try {
      if (isValidZip) {
        const { data } = await axios(
          `http://api.openweathermap.org/geo/1.0/zip?zip=${location}&appid=${process.env.REACT_APP_API_KEY}`
        );
        dispatch({
          type: "SEARCH_NEW_LOCATION",
          payload: [data.lat, data.lon],
        });
      } else {
        const { data } = await axios(
          `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
        );
        dispatch({
          type: "SEARCH_NEW_LOCATION",
          payload: [data[0].lat, data[0].lon],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserStartingLocation();
  }, []);

  return (
    <AppContext.Provider value={{ ...state, updateUserLocation }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, AppContext };
