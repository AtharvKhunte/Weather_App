import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState("C"); 
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchByCoords, () =>
        setError("Location access denied.")
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, [unit]);

  const fetchByCoords = async (position) => {
    const { latitude, longitude } = position.coords;
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );

      setWeather(convertTemp(weatherRes.data));
      setForecast(forecastRes.data.list.filter((_, i) => i % 8 === 0).map(convertTemp));
      setError("");
    } catch (err) {
      setError("Could not fetch location weather.");
    }
  };

  const fetchWeather = async (city) => {
    if (!city) return;
    try {
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );

      setWeather(convertTemp(weatherRes.data));
      setForecast(forecastRes.data.list.filter((_, i) => i % 8 === 0).map(convertTemp));
      setError("");
    } catch (err) {
      setError("City not found!");
      setWeather(null);
      setForecast([]);
    }
  };

  const convertTemp = (data) => {
    if (unit === "F") {
      return {
        ...data,
        main: { ...data.main, temp: data.main.temp * 9 / 5 + 32 },
      };
    }
    return data;
  };

  // Toggle unit
  const handleToggleUnit = () => setUnit(unit === "C" ? "F" : "C");
  // Toggle dark mode
  const handleToggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark min-h-screen flex flex-col items-center justify-center p-6" 
                              : "min-h-screen flex flex-col items-center justify-center p-6"}>

      {/* Background */}
      <div className={darkMode 
        ? "absolute inset-0 bg-gray-900/90 dark:bg-gray-800 transition-all" 
        : "absolute inset-0 bg-blue-500/70 transition-all"}></div>

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-white">🌤 Weather App</h1>

        <div className="flex gap-2 mb-4">
          <button
            onClick={handleToggleUnit}
            className="bg-yellow-400 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
          >
            Show in {unit === "C" ? "°F" : "°C"}
          </button>

          <button
            onClick={handleToggleDarkMode}
            className="bg-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition text-white"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <SearchBar onSearch={fetchWeather} />

        {error && <p className="mt-4 text-red-200">{error}</p>}

        {weather && <WeatherCard data={weather} unit={unit} darkMode={darkMode} />}

        {forecast.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mt-6 w-full max-w-4xl">
            {forecast.map((day, idx) => (
              <ForecastCard key={idx} data={day} unit={unit} darkMode={darkMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
