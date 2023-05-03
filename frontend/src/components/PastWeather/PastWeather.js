import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import {Grid, Card, CardContent, Typography} from '@mui/material'
import { openWeatherKey } from '../../OpenWeatherKey';

const PastWeather = ({skiResort}) => {
    const [pastWeatherData, setPastWeatherData]=useState([]);
    const [latitude,longitude] = skiResort.split(',');
debugger
    const today = moment().unix();
    const oneDayAgo = moment().subtract(1, 'day').unix()
    console.log(oneDayAgo)

    useEffect(()=> {
        async function fecthData() {
            let response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${latitude}&lon=${longitude.trim()}&dt=${oneDayAgo}&appid=${openWeatherKey}`);
            console.log(response.data)
            setPastWeatherData(response.data)
        }
        fecthData();
    },[latitude, longitude])

    if (!pastWeatherData) {
        return null;
    }

    return ( 
        <Grid container spacing={3}>
    
    {pastWeatherData.map((data) => (
  <Card key={data}>
    <CardContent>
      <Typography variant="h5" component="h2">
        Temperature: {data.temp}
      </Typography>
      <Typography variant="body2" component="p">
        Date: {moment.unix(data.dt).format('MM/DD/YYYY')}
      </Typography>
    </CardContent>
  </Card>
))}
      </Grid>
    );
     
}
 
export default PastWeather;