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
        <div>
        <Typography variant="h4" align="center">
          Weather For the Last 7 days
        </Typography>
        <PastWeather skiResort={skiResort} />
      </div>
     );
}
 
export default HistoricalWeatherPage;