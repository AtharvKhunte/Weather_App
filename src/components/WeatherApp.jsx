import { useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = process.env.REACT_APP_WEATHER_KEY;

  const fetchWeather = async (city) => {
    if (!city) return;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);
      setError("");
    } catch (err) {
      setError("City not found!");
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🌤 Weather App</h1>

      <SearchBar onSearch={fetchWeather} />

      {error && <p className="mt-4 text-red-200">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}
