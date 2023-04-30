import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import { KEY } from "../../localkey";
import { TOKEN } from "../../maptoken";
import "mapbox-gl/dist/mapbox-gl.css";

const box = "127,21,-67,52,10";

const WeatherMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 39.8283,
    longitude: -98.5795,
    zoom: 3,
  });
  const [map, setMap] = useState("");

  async function fetchMap() {
    try {
      const zoom = 4;
      const lat = 40;
      const lon = -111;
      const url = `https://api.tomorrow.io/v4/map/tile/${zoom}/${lat}/${lon}/precipitationIntensity/now.png?apikey=${KEY}`;

      let response = await axios.get(url, {
        headers: {
          accept: "text/plain",
        },
      });
      console.log(response.data);
      setMap(response.config.url);
    } catch (error) {
      console.log(error.message.data);
    }
  }
  useEffect(() => {
    fetchMap();
  }, []);
  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapboxApiAccessToken={TOKEN}
      onViewportChange={setViewport}
    >
      {map && (
       <Source
       id="weather-data"
       type="image"
       url={map}
       coordinates={[  [-124.848974, 24.396308],
        [-66.885444, 24.396308],
        [-66.885444, 49.384358],
        [-124.848974, 49.384358]
      ]}
     >
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
