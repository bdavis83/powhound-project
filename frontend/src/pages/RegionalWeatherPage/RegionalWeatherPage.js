import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RegionalWeather from '../../components/RegionalWeather/RegionalWeather';
import { Typography } from '@mui/material';

const RegionalWeatherPage = (props) => {
    const {id} = useParams()
      const [skiResort, setSkiResort] = useState(id)
      console.log(id)

      useEffect (()=>{
        setSkiResort(id)
    }, [id])

    return (
      <div>
        <Typography variant="h4" align="center">
          
        </Typography>
        <RegionalWeather />
      </div>
    );
  };

 
export default RegionalWeatherPage;