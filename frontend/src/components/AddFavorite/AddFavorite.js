import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const AddFavorite = ({ skiResortId }) => {
  const [user, token] = useAuth();
  const [favorite, setFavorite] = useState();

  async function handleAddFavorite(event) {
    event.preventDefault();

    try {
      if (favorite) {
        await axios.delete(`http://127.0.0.1:8000/api/favorites/remove/${skiResortId}/`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
      } else {
        // Add favorite
        await axios.post(
          'http://127.0.0.1:8000/api/favorites/add/',
          {
            ski_resort_id: skiResortId
          },
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
      }
      setFavorite(!favorite); // Toggle the favorite state
    } catch (error) {
      console.log(error.message);
    }
  }

  const addButtonStyles = {
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: favorite ? 'lightblue' : 'lightgray',
  };

  const highlightedStyles = {
    backgroundColor: 'darkblue',
    color: 'white',
  };

  return (
    <div>
      {favorite ? (
        <button
          type="button"
          style={{
            ...addButtonStyles,
            ...highlightedStyles,
            marginTop: '1rem',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          }}
          onClick={handleAddFavorite}
        >
          Remove Favorite
        </button>
      ) : (
        <button
          type="button"
          style={{ ...addButtonStyles, marginTop: '1rem', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}
          onClick={handleAddFavorite}
        >
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default AddFavorite;
