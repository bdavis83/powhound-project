import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import AddFavorite from '../AddFavorite/AddFavorite';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const DisplaySkiResorts = () => {
  const [user, token] = useAuth();
  const [skiResorts, setSkiResorts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  async function fetchSkiResorts() {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/ski_resorts/all/`);

      setSkiResorts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchFavorites() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/favorites/', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      setFavorites(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // Check if a ski resort is a favorite for the current user
  const isFavorite = (skiResortId) => {
    return favorites.some((favorite) => favorite.ski_resort_id === skiResortId);
  };

  useEffect(() => {
    fetchSkiResorts();
    fetchFavorites();
  }, []);

  const addFavorite = (skiResortId) => {
    // Update favorites list after adding a favorite
    setFavorites([...favorites, { ski_resort_id: skiResortId }]);
  };

  return (
    <Grid container spacing={2}>
    {skiResorts &&
      skiResorts.map((skiResort, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <Card
            sx={{
                backgroundColor: 'rgba(70, 130, 180, 0.8)',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
              borderRadius: '0.5rem',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <Link to ={`/currrentweather/${skiResort.latitude}, ${skiResort.longitude}`}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {skiResort.name} Current Weather
                  </Typography>
                </Link>
                <Link to={`/weatherforecast/${skiResort.latitude},${skiResort.longitude}`}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {skiResort.name}
                  </Typography>
                </Link>
                <Typography variant="body2" sx={{ marginBottom: '1rem' }}>
                  {skiResort.city}, {skiResort.state} ({skiResort.region})
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                  Latitude: {skiResort.latitude}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>
                  Longitude: {skiResort.longitude}
                </Typography>
              </div>

              <div>
                <AddFavorite
                  skiResortId={skiResort.id}
                  onAddFavorite={addFavorite}
                  isFavorite={isFavorite(skiResort.id)}
                  sx={{ marginTop: '1rem', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
  </Grid>

  );
};

export default DisplaySkiResorts;
