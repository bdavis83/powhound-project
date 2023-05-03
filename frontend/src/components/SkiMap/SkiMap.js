import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapGL from 'react-map-gl';
import { Marker } from 'react-map-gl';

const Skimap = ({ DisplaySkiResorts }) => {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  const [resorts, setresorts] = useState(null);

  useEffect(() => {
    async function fetchresorts() {
      try {
        let response = await axios.get(`http://127.0.0.1:8000/api/ski_resorts/all/`);
        console.log(response.data);
        setresorts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchresorts();
  }, []);

  useEffect(() => {
    const geojson = {
      type: 'FeatureCollection',
      features: []
    };

    if (DisplaySkiResorts && DisplaySkiResorts.length > 0) {
      DisplaySkiResorts.forEach((resort) => {
        const feature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [resort.longitude, resort.latitude]
          },
          properties: {
            name: resort.name,
            city: resort.city,
            state: resort.state,
            region: resort.region
          }
        };
        geojson.features.push(feature);
      });
      setresorts(geojson);
    }
  }, [DisplaySkiResorts]);

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    >
      {resorts &&
        resorts.features.map((store, index) => (
          <Marker key={index} longitude={store.geometry.coordinates[0]} latitude={store.geometry.coordinates[1]}>
            <div>
              <img src="/marker.svg" alt="Marker" />
              <p>{store.properties.name}</p>
              <p>
                {store.properties.city}, {store.properties.state} ({store.properties.region})
              </p>
            </div>
          </Marker>
        ))}
    </MapGL>
  );
};

export default Skimap;

