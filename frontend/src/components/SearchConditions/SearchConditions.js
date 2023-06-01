import React, { useState } from 'react';
import { openWeatherKey } from '../../openweatherkey';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchConditions = ({ skiResorts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const apiKey = openWeatherKey;
    const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

    const filteredResorts = [];

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
        const isSpringConditions = temperature >= 50 && temperature <= 70;

        if (searchQuery.toLowerCase() === 'spring' && isSpringConditions) {
          filteredResorts.push(resort);
        }
      } catch (error) {
        console.log(`Error fetching weather for ${resort.name}: ${error.message}`);
      }
    }

    setSearchResults(filteredResorts);
    console.log('Search Results:', filteredResorts);
    navigate('/displaysearchconditions/', { state: { searchResults: filteredResorts } });
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