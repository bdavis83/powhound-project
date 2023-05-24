import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { openWeatherKey } from "../../openweatherkey";

const PastWeather = ({ skiResort }) => {
  const [pastWeatherData, setPastWeatherData] = useState([]);
  const [latitude, longitude] = skiResort.split(",");

  const today = moment().unix();
  const oneDayAgo = moment().subtract(1, "day").unix();
  console.log(oneDayAgo);

  useEffect(() => {
    async function fecthData() {
      let response = await axios.get(
        `https://api.openweathermap.org/data/3.0/onecall/timemachine?lat=${latitude}&lon=${longitude.trim()}&units=imperial&dt=${oneDayAgo}&appid=${openWeatherKey}`
      );
      console.log(response.data);
      setPastWeatherData(response.data);
    }
    fecthData();
  }, [latitude, longitude]);

  if (!pastWeatherData.data) {
    return null;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid container spacing={3}>
        {pastWeatherData.data.map((data, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: "white",
              boxShadow: 1,
              borderRadius: "0.5rem",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="h2">
                Date: {moment.unix(data.dt).format("MM/DD/YYYY")}
              </Typography>
              <Typography variant="body2" component="p">
                Temperature: {data.temp}&deg;F
              </Typography>
              <Typography variant="body2" component="p">
                Weather: {data.weather.description}
              </Typography>
              <Typography variant="body2" component="p">
                Wind Speed: {data.wind_speed}
              </Typography>
              <Typography variant="body2" component="p">
                Wind Gust: {data.wind_gust}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default PastWeather;
