import {
  CityLocation,
  ForecastResponse,
  User,
  WeatherResponse,
} from "../model";

interface Values {
  userLocation: number[];
  isLoading: boolean;
  location: string;
  hourlyWeather: ForecastResponse[];
  isUserInfoOpen: boolean;
  token: string;
  isUserLoggedIn: boolean;
  user?: User;
  userSavedWeatherLocations: CityLocation[];
  currentSavedLocation?: WeatherResponse;
}
type Action =
  | { type: "GET_WEATHER_INFO_BEGIN" }
  | { type: "GET_WEATHER_INFO_SUCCESS" }
  | { type: "SET_USER_LOCATION"; payload: number[] }
  | { type: "SEARCH_NEW_LOCATION"; payload: number[] }
  | { type: "TOGGLE_USER_INFO"; payload: boolean }
  | { type: "LOGIN_USER_BEGIN" }
  | { type: "LOGIN_USER_SUCCESS"; payload: string }
  | { type: "LOGIN_USER_ERROR" }
  | { type: "GET_USER_INFO_BEGIN" }
  | { type: "GET_USER_INFO_SUCCESS"; payload: User }
  | { type: "GET_USER_INFO_ERROR" }
  | { type: "GET_SAVED_LOCATIONS_BEGIN" }
  | { type: "GET_SAVED_LOCATIONS_SUCCESS"; payload: CityLocation[] }
  | { type: "GET_SAVED_LOCATIONS_ERROR" }
  | { type: "GET_CURRENT_SAVED_LOCATION_BEGIN" }
  | { type: "GET_CURRENT_SAVED_LOCATION_SUCCESS"; payload: WeatherResponse }
  | { type: "GET_CURRENT_SAVED_LOCATION_ERROR" };

const reducer = (state: Values, action: Action) => {
  if (action.type === "GET_WEATHER_INFO_BEGIN") {
    return { ...state, isLoading: true };
  }
  if (action.type === "GET_WEATHER_INFO_SUCCESS") {
    return { ...state, isLoading: false };
  }

  if (action.type === "SET_USER_LOCATION") {
    return {
      ...state,
      userLocation: [action.payload[0], action.payload[1]],
    };
  }

  if (action.type === "SEARCH_NEW_LOCATION") {
    return {
      ...state,
      userLocation: [action.payload[0], action.payload[1]],
    };
  }
  if (action.type === "TOGGLE_USER_INFO") {
    return {
      ...state,
      isUserInfoOpen: !action.payload,
    };
  }
  if (action.type === "LOGIN_USER_BEGIN") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "LOGIN_USER_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      isUserLoggedIn: true,
      token: action.payload,
    };
  }

  if (action.type === "LOGIN_USER_ERROR") {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === "GET_USER_INFO_BEGIN") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "GET_USER_INFO_SUCCESS") {
    return {
      ...state,
      user: action.payload,
      isLoading: false,
    };
  }

  if (action.type === "GET_USER_INFO_ERROR") {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === "GET_SAVED_LOCATIONS_BEGIN") {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === "GET_SAVED_LOCATIONS_SUCCESS") {
    return {
      ...state,
      userSavedWeatherLocations: action.payload,
      isLoading: false,
    };
  }
  if (action.type === "GET_SAVED_LOCATIONS_ERROR") {
    return {
      ...state,
      isUserInfoOpen: true,
      isLoading: false,
    };
  }

  if (action.type === "GET_CURRENT_SAVED_LOCATION_BEGIN") {
    return {
      ...state,
    };
  }
  if (action.type === "GET_CURRENT_SAVED_LOCATION_SUCCESS") {
    return {
      ...state,
    };
  }
  if (action.type === "GET_CURRENT_SAVED_LOCATION_ERROR") {
    return {
      ...state,
    };
  }

  throw new Error("Action not Found!");
};

export default reducer;
