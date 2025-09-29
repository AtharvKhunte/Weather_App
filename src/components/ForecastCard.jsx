export default function ForecastCard({ data }) {
  const date = new Date(data.dt_txt).toLocaleDateString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short"
  });

  return (
    <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl text-center w-32">
      <p className="font-semibold">{date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
      />
      <p className="capitalize">{data.weather[0].description}</p>
      <p className="font-bold">{Math.round(data.main.temp)}°C</p>
    </div>
  );
}
