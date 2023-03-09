import { ForecastResponse } from "../model";

interface Values {
  userLocation: number[];
  isLoading: boolean;
  location: string;
  hourlyWeather: ForecastResponse[];
  isUserInfoOpen: boolean;
  token: string;
}
type Action =
  | { type: "GET_WEATHER_INFO_BEGIN" }
  | { type: "GET_WEATHER_INFO_SUCCESS" }
  | { type: "SET_USER_LOCATION"; payload: number[] }
  | { type: "SEARCH_NEW_LOCATION"; payload: number[] }
  | { type: "TOGGLE_USER_INFO"; payload: boolean }
  | { type: "LOGIN_USER_BEGIN" }
  | { type: "SETUP_USER_SUCCESS" }
  | { type: "SETUP_USER_ERROR" };

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

  throw new Error("Action not Found!");
};

export default reducer;
