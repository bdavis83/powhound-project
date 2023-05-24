import React, { useState } from 'react';
import { openWeatherKey } from '../../openweatherkey';
import DisplaySkiResorts from '../SkiResorts/SkiResorts';
import axios from 'axios';

const SearchConditions = ({ skiResorts }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    const handleSearch = async () => {
      const apiKey = openWeatherKey;
      const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  
      const filteredResorts = skiResorts.filter((resort) => {
        return resort.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
  
      for (const resort of skiResorts) {
        try {
          const response = await axios.get(apiUrl, {
            params: {
              lat: resort.latitude,
              lon: resort.longitude,
              appid: apiKey,
              cnt: 1, // Retrieve a single forecast data point
              units: 'imperial', 
            },
          });
  
          console.log('Weather Response:', response.data);
  
          const temperature = response.data.list[0].main.temp;
          const weatherConditionCodes = response.data.list[0].weather.map((weather) => weather.id);
  
          const isSpringConditions = temperature >= 50 && temperature <= 70;
          const isPowderConditions = weatherConditionCodes.includes(600) || weatherConditionCodes.includes(601);
  
          if (searchQuery.toLowerCase() === 'spring' && isSpringConditions) {
            filteredResorts.push(resort);
          } else if (searchQuery.toLowerCase() === 'powder' && isPowderConditions) {
            filteredResorts.push(resort);
          }
        } catch (error) {
          console.log(`Error fetching weather for ${resort.name}: ${error.message}`);
        }
      }
  
      setSearchResults(filteredResorts);
    };
  
    return (
      <div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
  
        <h3>Search Results:</h3>
        <ul>
          {searchResults.map((resort) => (
            <li key={resort.id}>
              {resort.name} 
              {resort.powderConditions ? ' - Powder Conditions' : ''}
              {resort.springConditions ? ' - Spring Conditions' : ''}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SearchConditions;