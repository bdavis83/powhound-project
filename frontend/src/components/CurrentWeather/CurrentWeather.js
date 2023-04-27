import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CurrentWeather = ({skiResort}) => {
    const [weatherData, setWeatherData] = useState();
    const lat = skiResort.latitude;
    const lon = skiResort.longitude;

    
    async function fetchCurrentWeather() {
        try {

            let response = await axios.get(` https://api.weather.gov/points/${skiResort.replace(' ', "")}`,
            {headers: {
                'User-Agent': ('myweatherapp.com','bdavis83@gmail.com'),
                'Accept': 'application/ld+json',
                
            }
            
            })
            console.log(response.data)
            setWeatherData(response.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(()=> {
        console.log(skiResort)
        fetchCurrentWeather()
    }, [lat, lon]);

    return (
        <div>
        {weatherData && (
            <div>
                <h1>Weather Forecast for {skiResort.name}</h1>
                <ul>
                    {weatherData.properties.periods.map((period, index) => (
                        <li key={index}>
                            <strong>{period.name}:</strong> {period.detailedForecast}
                            <br />
                            <strong>Temperature:</strong> {period.temperature}°F
                            <br />
                            <strong>Precipitation:</strong> {period.shortForecast.includes('Rain') ? 'Rain' : 'Snow'}
                            <br />
                            <strong>Wind:</strong> {period.windSpeed} {period.windDirection}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
      )
    };

    export default CurrentWeather;