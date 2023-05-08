// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import POWhoundHome from "./pages/POWhoundHome/POWhoundHome";
import CurrentWeatherPage from "./pages/CurrentWeatherPage/CurrentWeatherPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import HistoricalWeatherPage from "./pages/HistoricalWeatherPage/HistoricalWeatherPage";
import GoogleMapSkiResorts from "./components/GoogleMapSkiResorts/GoogleMapSkiResorts";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import Banner from "./components/Banner/Banner";

function App() {
  return (
    <div>
      <Navbar />
     
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Powhoundhome" element = {<PrivateRoute><POWhoundHome/></PrivateRoute>} />
        <Route path="/currentweather/:id" element = {<CurrentWeatherPage />} />
        <Route path="/favorites/" element = {<FavoritesPage />}/>
        <Route path="/historicalWeather/:id" element = {<HistoricalWeatherPage />} />
        <Route path="/resortmap/" element = {<GoogleMapSkiResorts />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
