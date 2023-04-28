import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, Typography} from '@mui/material'
import axios from 'axios';

const CurrentWeather = ({skiResort}) => {
    const [weatherData, setWeatherData] = useState();
    const lat = skiResort.latitude;
    const lon = skiResort.longitude;

    
    async function fetchCurrentWeather() {
        try {

            let pointResponse = await axios.get(` https://api.weather.gov/points/${skiResort.replace(' ', "")}`,
            {headers: {
                'User-Agent': ('myweatherapp.com','bdavis83@gmail.com'),
                'Accept': 'application/ld+json',
                
            }
            
            })
            let forecastUrl = pointResponse.data.forecast;

            let forecastResponse = await axios.get(forecastUrl, {
                headers: {
                    'User-Agent': ('myweatherapp.com','bdavis83@gmail.com'),
                    'Accept': 'application/json',
                }
            });
            console.log(pointResponse.data)
            console.log (forecastResponse.data)        
            setWeatherData(forecastResponse.data)
            
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=> {
        console.log(skiResort)
        fetchCurrentWeather()
    }, [lat, lon]);

    return (
        <Grid container spacing={2}>
          {weatherData?.properties?.periods.map((period, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: 400 }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {period.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {period.temperature}&deg;F
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {period.shortForecast.includes('Rain') ? 'Rain' : 'Snow'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Wind: {period.windSpeed} {period.windDirection}
                  </Typography>
                  <Typography variant="body1" component="p">
                    {period.detailedForecast}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    };

    export default CurrentWeather;