import React from "react";
import "../App.css";

const WeatherCard = ({ day }) => {
  const date = new Date(day.dt_txt);
  const options = { weekday: "long" }; // Gün adı
  const dayName = date.toLocaleDateString("tr-TR", options);

  const today = new Date().toLocaleDateString("tr-TR", { weekday: "long" });

  const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

  return (
    <div className={`weather-card ${dayName === today ? "today" : ""}`}>
      <h3>{dayName}</h3>
      <img src={iconUrl} alt={day.weather[0].description} />
      <p>{`Max: ${Math.round(day.main.temp_max)}°C`}</p>
      <p>{`Min: ${Math.round(day.main.temp_min)}°C`}</p>
    </div>
  );
};

export default WeatherCard;
