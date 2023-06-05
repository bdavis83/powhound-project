import React, { useEffect, useState } from "react";
import axios from "axios";
import { openWeatherKey } from "../../openweatherkey";

const RegionalWeather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const north = 49.384358; // Northern latitude
        const west = -125.0; // Western longitude
        const south = 41.991794; // Southern latitude
        const east = -116.916512; // Eastern longitude
        const url = `https://api.openweathermap.org/data/2.5/box/city?bbox=${west},${south},${east},${north},10&appid=${openWeatherKey}`;

        const response = await axios.get(url);
        setWeatherData(response.data.list);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Weather Data for the Pacific Northwest</h1>
      {weatherData.map((city) => (
        <div key={city.id}>
          <h2>City: {city.name}</h2>
          <p>Temperature: {city.main.temp} K</p>
          <p>Humidity: {city.main.humidity}%</p>
          <p>Wind Speed: {city.wind.speed} m/s</p>
          <p>Weather Description: {city.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default RegionalWeather;
