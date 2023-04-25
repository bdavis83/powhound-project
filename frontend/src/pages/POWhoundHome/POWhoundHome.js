import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import SkiResorts from '../../components/SkiResorts/SkiResorts';
import axios from 'axios';
import DisplaySkiResorts from '../../components/SkiResorts/SkiResorts';


const POWhoundHome = () => {
    const [user, token] = useAuth();
    const [favoriteLocations, setFavoriteLocations] = useState ([])

    useEffect(()=> {
        const fetchFavoriteLocations = async ()=> {
            try {
                let response = await axios.get('http://127.0.0.1:8000/api/favorites/', 
                {headers: {
                    Authorization: "Bearer " + token,
                },});
                setFavoriteLocations(response.data);
            } catch (error){
                console.log(error.response.data)
            }
        };
        fetchFavoriteLocations();
    }, [token]);



    return ( 
        <div className='container'>
            <h3>{user.username}'s Stash</h3>
            <SkiResorts displaySkiResorts = {DisplaySkiResorts}/>
            
            {/* {favoriteLocations && 
                favoriteLocations.map((favorites)=>(
                    <p key={favorites.id}>
                        {favorites.ski_resort}
                    </p>
                ))} */}
        </div>
     );
}
 
export default POWhoundHome;