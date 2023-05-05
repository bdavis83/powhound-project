import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Card, CardContent, Typography, Grid, Checkbox } from '@mui/material'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const DisplaySkiResorts = (props) => {
    const [user, token]=useAuth()
    const [skiResorts, setSkiResorts] = useState([])

    const [favorites, setFavorites] = useState ([]);
        
        async function fetchSkiResorts () {
            try {
                let response = await axios.get (`http://127.0.0.1:8000/api/ski_resorts/all/`)
                console.log (response.data)
                setSkiResorts(response.data)
            } catch (error) {console.log (error.message)
            }
        }

        async function fetchFavorites() {
            try {
                let favResponse = await axios.get('http://127.0.0.1:8000/api/favorites/')
                setFavorites(favResponse.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        useEffect(()=>{
            fetchSkiResorts(skiResorts);
            fetchFavorites(favorites)
        },[]);

        const addToFavorites = async (skiResort) => {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/favorites/', {
                    ski_resort_id: skiResort.id, 
                });
                console.log(response.data);
                fetchFavorites();
            } catch (error) {
                console.log(error.message);
            }
        };
    
        const isFavorite = (skiResort) => {
            return favorites.some(favorite => favorite.ski_resort.id === skiResort.id)
        }

        return ( 
            <Grid container spacing={2}>
                {skiResorts && skiResorts.map((skiResort, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                       
                        <Card sx={{ backgroundColor: 'white', boxShadow: 1, borderRadius: '0.5rem', }}>
                            <CardContent>
                            <Link to={`/currentweather/${skiResort.latitude}, ${skiResort.longitude}`}>
                            
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                    {skiResort.name}
                                </Typography>
                                </Link>
                                <Typography variant="body2" sx={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
                                    {skiResort.city}, {skiResort.state} ({skiResort.region})
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                                    Latitude: {skiResort.latitude}
                                </Typography>
                                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                                    Longitude: {skiResort.longitude}
                                </Typography>
                                <div>
                                <Checkbox checked={isFavorite(skiResort)} onChange={() => addToFavorites(skiResort)} />
                                <span>Add to Favorites</span>
                                </div>
                            </CardContent>
                        </Card>
                        
                    </Grid>
                ))}
            </Grid>
     );
}
 
export default DisplaySkiResorts;