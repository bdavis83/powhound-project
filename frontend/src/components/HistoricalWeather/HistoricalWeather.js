import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography} from '@mui/material'
import { useParams } from 'react-router-dom';
import moment from 'moment'

const HistoricalWeather = ({skiResort}) => {
    const {id} = useParams()
    const [radarStation, setRadarStation] = useState();
    const [histWeatherData, setHistWeatherData] = useState();
    const lat = skiResort.latitude;
    const lng = skiResort.longitude;
    const city = skiResort.city

    async function fetchRadaStation() {
        try {
            let radarResponse = await axios.get(`https://api.weather.gov/points/${skiResort.replace(' ', "")}`,
            {headers: {
                'User-Agent': ('myweatherapp.com','bdavis83@gmail.com'),
                'Accept': 'application/ld+json',
                
            }
            });
            console.log (radarResponse.data.radarStation)
            setRadarStation()
            fetchHistWeather(radarResponse.data.radarStation)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=> {
        console.log(skiResort)
        fetchRadaStation()
    }, [lat, lng]); 
        
    async function fetchHistWeather(weatherStation) {
        const today = moment().format('YYYY-MM-DD');
        const sevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
debugger
        
        
        try {
            let pointResponse = await axios.get(`https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=TAVG&limit=1000&stationid=GHCND:USW00023129&startdate=${sevenDaysAgo}&enddate=${today}`,
            {
                headers: {token: 'zqcBNXgeSuwGlgEJXrIHzenuRVtWhRYk'}
            })
            console.log(pointResponse.data)
            setHistWeatherData(pointResponse.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=> {
        console.log(skiResort)
        fetchHistWeather()
    }, []); 

    return ( 
        
        <Grid container spacing={2}>
      {histWeatherData && histWeatherData.map((weatherData, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                {weatherData.date}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Temperature: {weatherData.value} &deg;C
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Precipitation: {weatherData.value} mm
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
     );
}
 
export default HistoricalWeather;