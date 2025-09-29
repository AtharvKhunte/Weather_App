import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  // ✅ CRA uses process.env.REACT_APP_
  const API_KEY = process.env.REACT_APP_WEATHER_KEY;

  // 📌 On load → fetch current location weather
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchByCoords, () =>
        setError("Location access denied.")
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, []);

  // ✅ Fetch by coordinates
  const fetchByCoords = async (position) => {
    const { latitude, longitude } = position.coords;
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );

      setWeather(weatherRes.data);
      setForecast(forecastRes.data.list.filter((_, i) => i % 8 === 0));
      setError("");
    } catch (err) {
      setError("Could not fetch location weather.");
    }
  };

  // ✅ Fetch by city (manual search)
  const fetchWeather = async (city) => {
    if (!city) return;
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );

      setWeather(weatherRes.data);
      setForecast(forecastRes.data.list.filter((_, i) => i % 8 === 0));
      setError("");
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
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-6 w-full max-w-4xl">
          {forecast.map((day, idx) => (
            <ForecastCard key={idx} data={day} />
          ))}
        </div>
      )}
    </div>
  );
}
