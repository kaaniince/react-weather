import React from "react";
import WeatherProvider from "./context/WeatherContext";
import WeatherPage from "./components/WeatherPage";

function App() {
  return (
    <WeatherProvider>
      <WeatherPage />
    </WeatherProvider>
  );
}

export default App;
