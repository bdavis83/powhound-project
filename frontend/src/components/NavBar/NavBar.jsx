import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SearchBar from "../SearchBar/SearchBar";
import WeatherByZip from "../WeatherByZipCode/WeatherByZipCode";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul className="navLinks">
        <li className="brand">
          <Link
            to="/powhoundhome"
            style={{ textDecoration: "none", color: "white" }}
          >
            <b>POWhound</b>
          </Link>
        </li>
        
        <li>
          <Link
            to="/resortmap/"
            style={{ textDecoration: "none", color: "white" }}
          >
            <p>Resorts on the Map</p>
          </Link>
        </li>
        <li>
          <Link to="/favorites/"
          style={{ textDecoration: "none", color: "white" }}>Favorites</Link>
        </li>

        <WeatherByZip />

        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
