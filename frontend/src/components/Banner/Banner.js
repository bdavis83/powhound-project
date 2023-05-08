import React from 'react';
import { Box } from '@mui/material';
import IMG_1102 from '../../assets/IMG_1102.jpeg'

const Banner = () => {
  return (
    <Box>
      <img
        src={IMG_1102}
        alt="Banner Image"
        style={{ width: '100%', maxHeight: '300px' }}
      />
    </Box>
  );
};

export default Banner;