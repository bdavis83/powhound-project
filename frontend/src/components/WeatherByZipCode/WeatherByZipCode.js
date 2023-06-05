import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { openWeatherKey } from "../../openweatherkey";

const WeatherByZip = () => {
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);

  const handleInputChange = (event) => {
    setZipCode(event.target.value);
  };

  const fetchWeatherByZip = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${openWeatherKey}`
      );
      const weatherData = response.data;
      console.log(weatherData);
      navigate(`/weatherbyzip/${zipCode}`, { state: { weatherData } });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={zipCode}
        onChange={handleInputChange}
        placeholder="Search By ZIP Code"
      />
      <button onClick={fetchWeatherByZip}>Search</button>
      {weatherData && (
        <div>
          <h2>Current Weather for {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherByZip;
