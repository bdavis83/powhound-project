import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import SkiResorts from "../../components/SkiResorts/SkiResorts";
import axios from "axios";
import DisplaySkiResorts from "../../components/SkiResorts/SkiResorts";
import Banner from "../../components/Banner/Banner";
import SearchConditions from "../../components/SearchConditions/SearchConditions";

const POWhoundHome = () => {
  const [user, token] = useAuth();
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  return (
    <div className="banner container" style={{ width: "100%" }}>
      <Banner />
      <div className="container">
        <div style={{ marginTop: "30px" }}>
          <h3>Resorts</h3>

          <SkiResorts displaySkiResorts={DisplaySkiResorts} />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default POWhoundHome;
