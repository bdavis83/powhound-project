import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentWeather = (props) => {
    const [weatherData, setWeatherData] = useState();
    const { location } = props;

    
    async function fetchCurrentWeather(location) {
        try {
            let response = await axios.get(`https://api.weather.gov/points/${location}/forecast`,
            {headers: {
                'User-Agent': 'bdavis83@gmail.com',
                'Accept': 'application/ld+json'
            }
            
            })
            console.log(response.data)
            setWeatherData(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=> {
        fetchCurrentWeather()
    }, []);

    return (
        <div>
          <h6>Current Weather for {weatherData.name}</h6>
          <p>{weatherData.detailedForecast}</p>
          <p>Temperature: {weatherData.temperature}&deg;F</p>
          <p>Wind: {weatherData.windSpeed}</p>
        </div>
      )};

    export default CurrentWeather;