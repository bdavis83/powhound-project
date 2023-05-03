import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, CardContent, Typography, Grid } from '@mui/material'
import { Link } from 'react-router-dom';

const DisplaySkiResorts = (props) => {
    const [skiResorts, setSkiResorts] = useState([])
        
        async function fetchSkiResorts () {
            try {
                let response = await axios.get (`http://127.0.0.1:8000/api/ski_resorts/all/`)
                console.log (response.data)
                setSkiResorts(response.data)
            } catch (error) {console.log (error.message)
            }
        }
        useEffect(()=>{
            fetchSkiResorts(skiResorts);
        },[]);

        return ( 
            <Grid container spacing={2}>
                {skiResorts && skiResorts.map((skiResort, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Link to={`/currentweather/${skiResort.latitude}, ${skiResort.longitude}`}>
                        <Card sx={{ backgroundColor: 'white', boxShadow: 1, borderRadius: '0.5rem', }}>
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    {skiResort.name}
                                </Typography>
                                <Typography variant="body2" sx={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                                    {skiResort.city}, {skiResort.state} ({skiResort.region})
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                                    Latitude: {skiResort.latitude}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                                    Longitude: {skiResort.longitude}
                                </Typography>
                            </CardContent>
                        </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
     );
}
 
export default DisplaySkiResorts;