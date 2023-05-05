import React, { useState, useEffect, useRef } from "react";
import { GoogleMapsApiKEY } from "../../googlemapsapikey";
import { GoogleMap, useJsApiLoader, Marker,InfoWindow } from '@react-google-maps/api';
import axios from "axios";
import { Link } from "react-router-dom";
import CurrentWeather from "../CurrentWeather/CurrentWeather";

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 39.8283,
  lng: -98.5795
};

function GoogleMapSkiResorts() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GoogleMapsApiKEY
  })

  const [map, setMap] = React.useState(null)
  const [activeMarker, setActiveMarker] = useState(null)
  const [skiResorts, setSkiResorts]= useState([])

  
    async function fetchSkiResorts(){
        let response = await axios.get(`http://127.0.0.1:8000/api/ski_resorts/all/`);
        console.log(response.data)
        setSkiResorts (response.data);
        
    }
    useEffect(()=>{
        fetchSkiResorts(skiResorts)
    },[]);
    
  

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleMarkerClick = (marker) => {
    setActiveMarker(marker);
  };

  const handleInfoWindowClose = () => {
    setActiveMarker(null);
  };

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {skiResorts.map((skiResort) => (
          <Marker
            key={skiResort.id}
            position={{ lat: Number(skiResort.latitude), lng: Number(skiResort.longitude) }}
            title={skiResort.name}
            onClick={()=> handleMarkerClick(skiResort)}  
                    >
                    {activeMarker?.id === skiResort.id && (
                        <InfoWindow onCloseClick={handleInfoWindowClose}>
                          <div>
                            <h3>{skiResort.name}</h3>
                            <p>{skiResort.city}, {skiResort.state}</p>
                            <p>Region: {skiResort.region}</p>
                            <Link to={`/currentweather/${skiResort.latitude}, ${skiResort.longitude}`} >
                                Current Forecast
                            </Link>
                                
                          </div>
                        </InfoWindow>
                      )}
                      </Marker>
        ))}
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(GoogleMapSkiResorts)