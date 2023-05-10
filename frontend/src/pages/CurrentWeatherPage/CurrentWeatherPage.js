import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WeatherForecast from '../../components/WeatherForecast/WeatherForecast';
import CurrentWeather from '../../components/CurrentWeather/CurrentWeather';
import { Typography } from '@mui/material';

const CurrentWeatherPage = (props) => {
    const {id} = useParams()
      const [skiResort, setSkiResort] = useState(id)
      console.log(id)

      useEffect (()=>{
        setSkiResort(id)
    }, [id])

    return (
      <div>
        <Typography variant="h4" align="center">
          Current Weather
        </Typography>
        <CurrentWeather skiResort={skiResort} />
        
      </div>
    );
  };

 
export default CurrentWeatherPage;
