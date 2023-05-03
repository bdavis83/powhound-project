import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchSkiResorts = () => {
  const [skiResorts, setSkiResorts] = useState([]);

  useEffect(() => {
    async function fetchSkiResorts() {
      try {
        let response = await axios.get(`http://127.0.0.1:8000/api/ski_resorts/all/`);
        console.log(response.data);
        setSkiResorts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchSkiResorts();
  }, []);

  return skiResorts;
};

export default useFetchSkiResorts;
