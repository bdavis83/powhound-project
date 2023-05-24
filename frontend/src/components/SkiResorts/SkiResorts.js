import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import AddFavorite from "../AddFavorite/AddFavorite";
import SearchConditions from "../SearchConditions/SearchConditions";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const DisplaySkiResorts = () => {
  const [user, token] = useAuth();
  const [skiResorts, setSkiResorts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  async function fetchSkiResorts() {
    try {
      let response = await axios.get(
        `http://127.0.0.1:8000/api/ski_resorts/all/`
      );

      setSkiResorts(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function fetchFavorites() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/favorites/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setFavorites(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const isFavorite = (skiResortId) => {
    return favorites.some((favorite) => favorite.ski_resort_id === skiResortId);
  };

  useEffect(() => {
    fetchSkiResorts();
    fetchFavorites();
  }, []);

  const addFavorite = async (skiResortId) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/favorites/add/",
        { ski_resort_id: skiResortId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeFavorite = async (favoriteId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/favorites/remove/${favoriteId}/`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setFavorites(favorites.filter((favorite) => favorite.id !== favoriteId));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <SearchConditions skiResorts={skiResorts} />

      <Grid container spacing={2}>
        {skiResorts.map((skiResort, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                backgroundColor: "rgba(70, 130, 180, 0.8)",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                borderRadius: "0.5rem",
                color: "white",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                  >
                    {skiResort.name}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: "1rem" }}>
                    {skiResort.city}, {skiResort.state} ({skiResort.region})
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "12px" }}>
                    Latitude: {skiResort.latitude}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "12px" }}>
                    Longitude: {skiResort.longitude}
                  </Typography>
                  <Link
                    to={`/currrentweather/${skiResort.latitude}, ${skiResort.longitude}`}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                    >
                      {skiResort.name} Current Weather
                    </Typography>
                  </Link>
                  <Link
                    to={`/weatherforecast/${skiResort.latitude},${skiResort.longitude}`}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", marginBottom: "0.5rem" }}
                    >
                      {skiResort.name} 7-Day Forecast
                    </Typography>
                  </Link>
                </div>

                <div>
                  <AddFavorite
                    skiResortId={skiResort.id}
                    onAddFavorite={addFavorite}
                    onRemoveFavorite={removeFavorite} // Pass the removeFavorite function to the component
                    isFavorite={isFavorite(skiResort.id)}
                    sx={{
                      marginTop: "1rem",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DisplaySkiResorts;
