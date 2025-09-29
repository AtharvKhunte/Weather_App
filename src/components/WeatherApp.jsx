import { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_KEY;

  const fetchWeather = async (city) => {
    if (!city) return;
    try {
      // Current weather
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${API_KEY}`
      );
      setWeather(weatherRes.data);
      setError("");

      // 5-day forecast
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city.trim()}&units=metric&appid=${API_KEY}`
      );

      // Pick one forecast per day (12:00 PM)
      const dailyForecast = forecastRes.data.list.filter(f =>
        f.dt_txt.includes("12:00:00")
      );
      setForecast(dailyForecast);

    } catch (err) {
      setError("City not found!");
      setWeather(null);
      setForecast([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🌤 Weather App</h1>

      <SearchBar onSearch={fetchWeather} />

      {error && <p className="mt-4 text-red-200">{error}</p>}

      {weather && <WeatherCard data={weather} />}

      {forecast.length > 0 && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-5 gap-4">
          {forecast.map(f => (
            <ForecastCard key={f.dt} data={f} />
          ))}
        </div>
      )}
    </div>
  );
}
