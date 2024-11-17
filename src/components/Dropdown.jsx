import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import "../App.css";

const Dropdown = () => {
  const { selectedCity, setSelectedCity, setLocationPermission } =
    useContext(WeatherContext);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleLocationPermission = () => {
    setLocationPermission(true);
  };

  return (
    <div className="select-city">
      <select value={selectedCity} onChange={handleCityChange}>
        <option value="Istanbul">Istanbul</option>
        <option value="London">London</option>
        <option value="New York">New York</option>
        <option value="Tokyo">Tokyo</option>
      </select>
      <button onClick={handleLocationPermission}>Konumumu Kullan</button>
    </div>
  );
};

export default Dropdown;
