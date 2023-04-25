import axios from 'axios';
import React, { useState, useEffect } from 'react';

const useWeather = (defaultLocation) => {
    const [location, setLocation] = useState (defaultLocation);
    const [weatherData, setWeatherData]=useState();

    useEffect(()=> {
        const fetchWeatherData = async (location)=>{
            let response = await axios.get(`https://api.weather.gov/points/${location}/forecast`,
            {headers: {
                'User-Agent': 'bdavis83@gmail.com',
                'Accept': 'application/ld+json'
            }})
            console.log(response.data)
            setWeatherData(response.data);
        };
        fetchWeatherData();
    }, [location]);

   

    return [weatherData, location];
}
 
export default useWeather;