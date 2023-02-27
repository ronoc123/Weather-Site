import { SiIcloud } from "react-icons/si";
import { militaryToRegularTime } from "../utils/MilitaryTime";
import { Weather } from "../model";

interface Props {
  temp: number;
  icon: string;
  time: string;
  weather: Weather[];
}

const WeatherTimeCard: React.FC<Props> = ({ temp, icon, time, weather }) => {
  return (
    <div className="grid place-content-center p-8 text-center text-lg">
      {/* time of day */}
      <h1>{militaryToRegularTime(time.split(" ")[1])}</h1>
      {/* temperature */}
      <h1>{temp}°</h1>
      {/* weather logo */}
      <div className="justify-self-center">
        <span className="text-6xl text-gray-400">
          <img src={icon} alt="" />
        </span>
      </div>
      {/* chance of rain if any */}
      <div>{weather[0].main}</div>
    </div>
  );
};

export default WeatherTimeCard;
