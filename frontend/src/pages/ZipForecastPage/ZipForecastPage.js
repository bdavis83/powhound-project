import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { openWeatherKey } from "../../openweatherkey";
import { Card, CardContent, Typography } from "@mui/material";

const ZipForecastPage = () => {
  const { id } = useParams();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchForecastByZip = async () => {
      try {
        const response = await axios.get(
          `http://api.openweathermap.org/data/2.5/forecast?zip=${id}&units=imperial&appid=${openWeatherKey}`
        );
        setWeatherData(response.data);
        console.log(weatherData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchForecastByZip();
  }, [id]);

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Weather Forecast for {id}
      </Typography>
      {weatherData && (
        <div>
          {weatherData.list.map((item) => (
            <Card key={item.dt} variant="outlined" sx={{ marginBottom: "1rem" }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Date: {item.dt_txt}
                </Typography>
                <Typography variant="body1">
                  Temperature: {item.main.temp}
                </Typography>
                <Typography variant="body1">
                  Description: {item.weather[0].description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ZipForecastPage;
