import WeatherCard from "../Components/WeatherCard";
import WeatherTimeCard from "../Components/WeatherTimeCard";
import { useAppContext } from "../context/AppContext";
import convertToFahrenheit from "../utils/Convert";
import WeatherInfo from "../Components/WeatherInfo";
import useFetchHourlyWeather from "../Hooks/useFetchHourlyWeather";

const Home = () => {
  const ctx = useAppContext();
  const { value } = useFetchHourlyWeather(
    ctx?.userLocation[0] || 33,
    ctx?.userLocation[1] || -97
  );

  if (ctx === null) return <div>no context</div>;
  const { userLocation } = ctx;
  let latitude = userLocation[0];
  let longitude = userLocation[1];
  return (
    <div className="full-screen bg-gradient-to-b from-mid-purple to-light-purple grid justify-center">
      <div className="md:grid grid-cols-main grid-flow-row auto-rows-max mt-8 gap-4 ">
        {userLocation ? (
          <WeatherCard lat={latitude} lon={longitude} />
        ) : (
          <WeatherCard />
        )}
        <WeatherInfo />
        <div className="grid grid-flow-col gap-10 bg-white rounded-lg shadow-md">
          {value?.map((time, idx) => {
            return (
              <WeatherTimeCard
                key={idx}
                icon={`http://openweathermap.org/img/wn/${time.weather[0].icon}.png`}
                temp={Number(convertToFahrenheit(time.main.temp))}
                time={time.dt_txt}
                weather={time.weather}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
