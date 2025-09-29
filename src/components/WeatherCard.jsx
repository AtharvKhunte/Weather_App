export default function WeatherCard({ data }) {
  return (
    <div className="mt-8 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center w-80">
      <h2 className="text-2xl font-semibold">{data.name}, {data.sys.country}</h2>
      <p className="text-lg capitalize">{data.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
      />
      <p className="text-4xl font-bold">{Math.round(data.main.temp)}°C</p>
      <div className="flex justify-around mt-4 text-sm">
        <p>💧 Humidity: {data.main.humidity}%</p>
        <p>🌬 Wind: {data.wind.speed} m/s</p>
      </div>
    </div>
  );
}
