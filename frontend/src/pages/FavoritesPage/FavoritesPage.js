import React, { useEffect, useState } from "react";
import useAuth from '../../hooks/useAuth';
import axios from "axios";

const FavoritesPage = () => {
    const [user, token] = useAuth()
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  async function fetchFavorites() {
    try {
        let favResponse = await axios.get('http://127.0.0.1:8000/api/favorites/', 
        {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
        setFavorites(favResponse.data)
    } catch (error) {
        console.log(error.message)
    }
}
useEffect(()=>{
    fetchFavorites(favorites)
},[]);

  return (
    <div>
      <h1>My Favorites</h1>
      {favorites.map((favorite) => (
        <div key={favorite.id}>{favorite.name}</div>
      ))}
    </div>
  );
};

export default FavoritesPage;