import { ForecastResponse } from "../model";

interface Values {
  userLocation: number[];
  isLoading: boolean;
  location: string;
  hourlyWeather: ForecastResponse[];
}
type Action =
  | { type: "GET_WEATHER_INFO_BEGIN" }
  | { type: "GET_WEATHER_INFO_SUCCESS" }
  | { type: "SET_USER_LOCATION"; payload: number[] }
  | { type: "SEARCH_NEW_LOCATION"; payload: number[] };

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

  throw new Error("Action not Found!");
};

export default reducer;
