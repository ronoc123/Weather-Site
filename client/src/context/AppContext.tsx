import { useReducer, useContext, createContext, useEffect } from "react";
import reducer from "./reducer";
import { ForecastResponse, LoginUser } from "../model";
import axios from "axios";

interface Values {
  location: string;
  isLoading: boolean;
  userLocation: number[];
  hourlyWeather: ForecastResponse[];
  updateUserLocation: (city: string) => Promise<void>;
  toggleUserInfo: () => void;
  getUserInfo: () => void;
  loginUser: (currentUser: LoginUser) => Promise<void>;
  isUserInfoOpen: boolean;
  token: string;
}

const token = localStorage.getItem("token");

const initialState = {
  location: "",
  isLoading: false,
  userLocation: [],
  hourlyWeather: [],
  isUserInfoOpen: false,
  token: token ? token : "",
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

  const toggleUserInfo = () => {
    dispatch({ type: "TOGGLE_USER_INFO", payload: state.isUserInfoOpen });
  };

  const getUserInfo = async () => {
    const user = await axios("/api/Auth/GetUser");
  };

  const loginUser = async (currentUser: LoginUser) => {
    dispatch({ type: "LOGIN_USER_BEGIN" });
    try {
      const { data } = await axios.post("api/Auth/login", {
        username: currentUser.username,
        password: currentUser.password,
      });
      const { token } = data;

      dispatch({ type: "SETUP_USER_SUCCESS", payload: token });

      addTokenToLocalStorage(token);
    } catch (error) {
      dispatch({ type: "SETUP_USER_ERROR" });
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
        getUserInfo,
        loginUser,
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
