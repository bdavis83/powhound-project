import React, { useRef, useEffect, useState } from 'react';
import { TOKEN } from "../../maptoken";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import './Map.css'
import useFetchSkiResorts from '../../hooks/useFetchSkiResorts';

mapboxgl.accessToken = 'pk.eyJ1IjoiYmRhdmlzODMiLCJhIjoiY2xoMWQ0MHM0MHo1dzNzc2FkZHZ1MmZ2aiJ9.drQoSY9jG04ycoYebONqnw';

export default function Map({skiResort}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-100);
  const [lat, setLat] = useState(40);
  const [zoom, setZoom] = useState(3);
  const skiResorts = useFetchSkiResorts()

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    
    
      const features = skiResorts.map((skiResort) => ({
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [skiResort.longitude, skiResort.latitude]
        },
        'properties': {
          'title': `${skiResort.name}`,
          'description': `${skiResort.city}, ${skiResort.state}, ${skiResort.region}`
        }
      }));
      console.log(features);
    
  }, []);
  

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
