import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Card, CardContent, Box } from '@mui/material';

const WeatherByZipPage = () => {
  const { id } = useParams();
  const location = useLocation();

  const weatherData = location.state?.weatherData;

  return (
    <Box display="flex" justifyContent="center">
      <div>
      
        {weatherData && (
          <Card>
            <CardContent>
              <Typography variant="h5">Current Weather for {weatherData.name}</Typography>
              <Typography variant="body1">Temperature: {weatherData.main.temp}</Typography>
              <Typography variant="body1">Description: {weatherData.weather[0].description}</Typography>
            </CardContent>
          </Card>
        )}
      </div>
    </Box>
  );
};

export default WeatherByZipPage;


