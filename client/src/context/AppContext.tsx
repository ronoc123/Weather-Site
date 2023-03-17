import { useReducer, useContext, createContext, useEffect } from "react";
import reducer from "./reducer";
import {
  CityLocation,
  ForecastResponse,
  LoginUser,
  User,
  WeatherResponse,
} from "../model";
import axios from "axios";

interface Values {
  location: string;
  isLoading: boolean;
  userLocation: number[];
  hourlyWeather: ForecastResponse[];
  isUserInfoOpen: boolean;
  token: string;
  isUserLoggedIn: boolean;
  user?: User;
  userSavedWeatherLocations: CityLocation[];
  currentSavedLocation?: WeatherResponse;
  updateUserLocation: (city: string) => Promise<void>;
  toggleUserInfo: () => void;
  getUserInformation: () => void;
  loginUser: (currentUser: LoginUser) => Promise<void>;
  getUsersSavedWeatherLocations: () => Promise<void>;
}

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  location: "",
  isLoading: false,
  userLocation: [],
  hourlyWeather: [],
  isUserInfoOpen: false,
  token: token ? token : "",
  isUserLoggedIn: token ? true : false,
  user: user ? JSON.parse(user) : null,
  userSavedWeatherLocations: [],
  currentSavedLocation: undefined,
};

const AppContext = createContext<Values | null>(null);

const AppProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    headers: {
      Authorization: `Bearer ${state.token}`,
    },
  });

  const addTokenToLocalStorage = (token: string) => {
    localStorage.setItem("token", token);
  };

  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
  };

  const addUserToLocalStorage = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };
  const getUserInformation = async () => {
    dispatch({ type: "GET_USER_INFO_BEGIN" });

    try {
      const { data } = await authFetch("/api/Auth/GetUser");

      dispatch({ type: "GET_USER_INFO_SUCCESS", payload: data.data });
      addUserToLocalStorage(data.data);
    } catch (error) {
      console.log(error);
      dispatch({ type: "GET_USER_INFO_ERROR" });
    }
  };

  const getUserStartingLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      dispatch({
        type: "SET_USER_LOCATION",
        payload: [position.coords.latitude, position.coords.longitude],
      });
    });
  };

  const getUsersSavedWeatherLocations = async () => {
    dispatch({ type: "GET_SAVED_LOCATIONS_BEGIN" });

    try {
      const { data } = await authFetch("/api/SaveWeather");
      dispatch({ type: "GET_SAVED_LOCATIONS_SUCCESS", payload: data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "GET_SAVED_LOCATIONS_ERROR" });
    }
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

  const toggleUserInfo = () => {
    dispatch({ type: "TOGGLE_USER_INFO", payload: state.isUserInfoOpen });
  };

  const loginUser = async (currentUser: LoginUser) => {
    dispatch({ type: "LOGIN_USER_BEGIN" });
    try {
      const { data } = await axios.post("api/Auth/login", {
        username: currentUser.username,
        password: currentUser.password,
      });

      dispatch({ type: "LOGIN_USER_SUCCESS", payload: data.data });

      addTokenToLocalStorage(data.data);
      toggleUserInfo();
    } catch (error) {
      dispatch({ type: "LOGIN_USER_ERROR" });
    }
  };

  useEffect(() => {
    getUserStartingLocation();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        updateUserLocation,
        toggleUserInfo,
        getUserInformation,
        loginUser,
        getUsersSavedWeatherLocations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, AppContext };
