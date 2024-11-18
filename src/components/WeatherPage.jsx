import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import Dropdown from "./Dropdown";
import WeatherCard from "./WeatherCard";
import "../App.css";
const WeatherPage = () => {
  const { weatherData, isLoading, selectedCity, setSelectedCity } =
    useContext(WeatherContext);

  if (isLoading) return <div>Yükleniyor...</div>;
  if (!weatherData) return <div>Hava durumu verisi bulunamadı.</div>;

  const dailyData = weatherData.list
    .reduce((acc, reading) => {
      const readingDate = new Date(reading.dt_txt);
      const today = new Date();
      if (readingDate >= today) {
        const readingDateStr = readingDate.toLocaleDateString();
        if (
          !acc.some(
            (item) =>
              new Date(item.dt_txt).toLocaleDateString() === readingDateStr
          )
        ) {
          acc.push(reading);
        }
      }
      return acc;
    }, [])
    .slice(0, 7);

  return (
    <div>
      <h1>{selectedCity} Hava Durumu</h1>
      <Dropdown />
      <div className="weather-cards">
        {dailyData.map((day, index) => (
          <WeatherCard key={index} day={day} />
        ))}
      </div>
    </div>
  );
};

export default WeatherPage;
