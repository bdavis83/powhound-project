import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, Box } from "@mui/material";

const WeatherByZipPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const weatherData = location.state?.weatherData;

  const handleForecastClick = () => {
    navigate(`/zipforecast/${id}`, { state: { zipCode: id } });
  };

  return (
    <Box display="flex" justifyContent="center">
      <Card>
        <CardContent>
          <Typography variant="h5">Current Weather for {id}</Typography>
          {weatherData && (
            <div>
              <Typography variant="body1">
                Temperature: {weatherData.main.temp}
              </Typography>
              <Typography variant="body1">
                Description: {weatherData.weather[0].description}
              </Typography>
              <button onClick={handleForecastClick}>Forecast</button>
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default WeatherByZipPage;
