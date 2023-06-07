import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const FavoritesPage = () => {
  const [user, token] = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/favorites/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      setFavorites(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      <h1>My Favorites</h1>
      <Grid container spacing={3}>
        {favorites.map((favorite) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={favorite.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {favorite.ski_resort.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Location: {favorite.ski_resort.city},{" "}
                  {favorite.ski_resort.state}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Region: {favorite.ski_resort.region}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FavoritesPage;
