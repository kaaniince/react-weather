import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Istanbul");
  const [isLoading, setIsLoading] = useState(true);
  const [locationPermission, setLocationPermission] = useState(false);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataByCoordinates(latitude, longitude);
        },
        () => {
          setLocationPermission(false);
        }
      );
    } else {
      alert("Konum servisi mevcut değil.");
    }
  };

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=tr`
      );
      setWeatherData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("API Hatası:", error);
    }
  };

  const fetchWeatherDataByCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=tr`
      );
      setWeatherData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("API Hatası:", error);
    }
  };

  useEffect(() => {
    if (locationPermission) {
      getUserLocation();
    } else {
      fetchWeatherData(selectedCity);
    }
  }, [selectedCity, locationPermission]);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        selectedCity,
        setSelectedCity,
        isLoading,
        locationPermission,
        setLocationPermission,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
