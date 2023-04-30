import React from 'react';
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactMapGL from "react-map-gl";
import { KEY } from "../../localkey";
import { TOKEN } from '../../maptoken';

const box = "127,21,-67,52,10";

const WeatherMap = () => {
  const [map, setMap] = useState("");

  async function fetchMap() {
    try {
        const zoom = 4;
        const lat = 40;
        const lon = -111
        const url = `https://api.tomorrow.io/v4/map/tile/${zoom}/${lat}/${lon}/precipitationIntensity/now.png?apikey=${KEY}`

        let response = await axios.get(url,
            {headers: {
                'accept' : 'text/plain'
            }});
      console.log(response.data);
      setMap(response.config.url);
    } catch (error) {
      console.log(error.message.data);
    }
  }
  useEffect(()=>{
    fetchMap()
  },[]);
  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken={TOKEN}
      onViewportChange={setViewport}
    >
      {weatherData && (
        <Source id="weather-data" type="image" url={weatherData}>
          <Layer
            id="weather-layer"
            type="raster"
            paint={{ "raster-opacity": 0.7 }}
          />
        </Source>
      )}
    </ReactMapGL>
  );
};
  


export default WeatherMap;
