import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { openWeatherKey } from "../../openweatherkey";

const CurrentWeather = ({ skiResort }) => {
  const [weatherData, setWeatherData] = useState([]);
  const [latitude, longitude] = skiResort.split(",");

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude.trim()}&units=imperial&appid=${openWeatherKey}`
      );
      setWeatherData(response.data);
    }
    fetchData();
  }, [latitude, longitude]);

  if (!weatherData.main) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vhvh",
        paddingTop: "50px",
      }}
    >
      <Card
        sx={{ backgroundColor: "white", boxShadow: 1, borderRadius: "0.5rem" }}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            Date: {moment.unix(weatherData.dt).format("MM/DD/YYYY")}
          </Typography>
          <Typography variant="body2" component="p">
            Temperature: {weatherData.main.temp}&deg;F
          </Typography>
          <Typography variant="body2" component="p">
            Weather: {weatherData.weather[0].description}
          </Typography>
          <Typography variant="body2" component="p">
            Wind Speed: {weatherData.wind.speed}
          </Typography>
          <Typography variant="body2" component="p">
            Wind Gust: {weatherData.wind.gust}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurrentWeather;
