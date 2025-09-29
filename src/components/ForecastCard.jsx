export default function ForecastCard({ data, unit }) {
  const date = new Date(data.dt * 1000);
  const day = date.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg text-center">
      <p className="font-semibold">{day}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
        className="mx-auto w-16 h-16"
      />
      <p className="text-xl font-bold">{Math.round(data.main.temp)}°{unit}</p>
      <p className="capitalize text-sm">{data.weather[0].description}</p>
    </div>
  );
}
