import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const Favorites = ({ skiResorts, onToggleFavorite }) => {
  const [favorites, setFavorites] = useState([]);
  const [user, token] = useAuth();

  const handleCheckboxChange = async (event, skiResort) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setFavorites([...favorites, skiResort]);
    } else {
      setFavorites(favorites.filter((favorite) => favorite.id !== skiResort.id));
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/favorites/add/',
        { ski_resort_id: skiResort.id },
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Grid container spacing={2}>
      {skiResorts.map((skiResort) => (
        <Grid item key={skiResort.id} xs={12} sm={6} md={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={favorites.some((favorite) => favorite.id === skiResort.id)}
                onChange={(event) => {
                  handleCheckboxChange(event, skiResort);
                  onToggleFavorite(skiResort, event.target.checked);
                }}
              />
            }
            label={skiResort.name}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Favorites;
