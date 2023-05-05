import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HistoricalWeather from '../../components/HistoricalWeather/HistoricalWeather';
import { Typography } from '@mui/material';
import PastWeather from '../../components/PastWeather/PastWeather';

const HistoricalWeatherPage = (props) => {
    const {id} = useParams()
        const [skiResort, setSkiResort] = useState(id)
        console.log(id)

        useEffect (()=>{
            setSkiResort(id)
        }, [id])

    return ( 
<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginBottom: '50px' }}>
        <Typography variant="h4" align="center">
          Weather For the Last 24 hours
        </Typography>
        <div style={{ marginTop: '50px' }}>
    <PastWeather skiResort={skiResort} />
  </div>
      </div>
     );
}
 
export default HistoricalWeatherPage;