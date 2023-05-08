import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const AddFavorite = ({skiResortId, onAddFavorite, isFavorite}) => {
    const [ user, token] = useAuth()
    const [favorite, setFavorite] = useState();
        
    async function handleAddFavorite (event) {
        event.preventDefault();
            try {
                const response = await axios.post(
                  'http://127.0.0.1:8000/api/favorites/add/',
                  {
                    ski_resort_id: skiResortId,
                    
                  },
                  {
                    headers: {
                      Authorization: 'Bearer ' + token,
                    },
                  }
                );
                console.log(response);
                onAddFavorite(skiResortId)
                
              } catch (error) {
                console.log(error.message);
              }
        }
    

        return (
            <div>
              {isFavorite ? (
                <button type="button" style={{ backgroundColor: 'lightblue' }} disabled>
                  Added to Favorites
                </button>
              ) : (
                <button type="button" onClick={handleAddFavorite}>
                  Add to Favorites
                </button>
              )}
            </div>
          );
}
 
export default AddFavorite;