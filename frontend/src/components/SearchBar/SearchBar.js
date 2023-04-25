import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { IconButton, InputAdornment} from '@mui/material';
import { Search } from '@mui/icons-material'
import './SearchBar.css'



const SearchBar = (props) => {
    const [search, setSearch] = useState('')

    function handleSubmit(event){
        event.preventDefault();
        props.fetchVideos(search)
        
    }

    return (
        <TextField
          placeholder="Search"
          sx={{backgroundColor: 'white'}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton  onClick={handleSubmit}>
                  <Search sx={{color: "steelblue"}} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
    }

 
export default SearchBar;