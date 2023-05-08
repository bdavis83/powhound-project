import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import SkiResorts from '../../components/SkiResorts/SkiResorts';
import axios from 'axios';
import DisplaySkiResorts from '../../components/SkiResorts/SkiResorts';
import Banner from '../../components/Banner/Banner';


const POWhoundHome = () => {
    const [user, token] = useAuth();
    const [favoriteLocations, setFavoriteLocations] = useState ([])

    // useEffect(()=> {
    //     const fetchFavoriteLocations = async ()=> {
    //         try {
    //             let response = await axios.get('http://127.0.0.1:8000/api/favorites/', 
    //             {headers: {
    //                 Authorization: "Bearer " + token,
    //             },});
    //             setFavoriteLocations(response.data);
    //         } catch (error){
    //             console.log(error.response.data)
    //         }
    //     };
    //     fetchFavoriteLocations();
    // }, [token]);



    return ( 
        
        <div className='banner container' style={{width: '100%'}}>
            <Banner />
            <div className='container'>
       
         <div style={{marginTop: '30px'}}>
            
            <h3>Resorts</h3>
            
            <SkiResorts displaySkiResorts = {DisplaySkiResorts}/>
            
            {/* {favoriteLocations && 
                favoriteLocations.map((favorites)=>(
                    <p key={favorites.id}>
                        {favorites.ski_resort}
                    </p>
                ))} */}
        </div>
        <div>
            
        </div>
        </div>
        </div>
     );
}
 
export default POWhoundHome;