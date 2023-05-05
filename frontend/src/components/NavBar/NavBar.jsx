import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import SearchBar from "../SearchBar/SearchBar";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul className="navLinks">
        <li className="brand">
          <Link to="/powhoundhome" style={{ textDecoration: "none", color: "white" }}>
            <b>POWhound</b>
          </Link></li>
          <li>
            <Link to="/" style = {{textDecoration: "none", color: "white"}}>
            <p>IKON Pass Resorts</p>
          </Link></li>
          <li><Link to="/" style = {{textDecoration: "none", color: "white"}}>
            <p>Epic Pass Resorts</p>
          </Link></li>
          <li><Link to="/" style = {{textDecoration: "none", color: "white"}}>
            <p>Mountain Collective Pass Resorts</p>
          </Link></li>
          <li><Link to="/" style = {{textDecoration: "none", color: "white"}}>
            <p>Independent</p>
          </Link></li>
          <SearchBar/>
          
        
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
