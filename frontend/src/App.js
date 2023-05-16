// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import POWhoundHome from "./pages/POWhoundHome/POWhoundHome";
import CurrentWeatherPage from "./pages/CurrentWeatherPage/CurrentWeatherPage";
import WeatherForecastPage from "./pages/WeatherForecastPage/WeatherForecastPage";
import RegionalWeatherPage from "./pages/RegionalWeatherPage/RegionalWeatherPage";
import WeatherByZipPage from "./pages/WeatherByZipPage/WeatherByZipPage";
// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import HistoricalWeatherPage from "./pages/HistoricalWeatherPage/HistoricalWeatherPage";
import GoogleMapSkiResorts from "./components/GoogleMapSkiResorts/GoogleMapSkiResorts";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import ZipForecastPage from "./pages/ZipForecastPage/ZipForecastPage";



function App() {
  return (
    <div>
      <Navbar />
     
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <POWhoundHome />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Powhoundhome" element = {<PrivateRoute><POWhoundHome/></PrivateRoute>} />
        <Route path="/weatherforecast/:id" element = {<WeatherForecastPage />} />
        <Route path="/favorites/" element = {<FavoritesPage />}/>
        <Route path="/historicalWeather/:id" element = {<HistoricalWeatherPage />} />
        <Route path="/resortmap/" element = {<GoogleMapSkiResorts />} />
        <Route path="/currrentweather/:id" element = {<CurrentWeatherPage />} />
        <Route path="/regionalweather/" element={<RegionalWeatherPage />} />
        <Route path="/weatherbyzip/:id" element={<WeatherByZipPage />} />
        <Route path="/zipforecast/:id" element={<ZipForecastPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
