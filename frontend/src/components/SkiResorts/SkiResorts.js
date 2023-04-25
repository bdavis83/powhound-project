import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplaySkiResorts = (props) => {
    const [skiResorts, setSkiResorts] = useState([])
        
        async function fetchSkiResorts () {
            try {
                let response = await axios.get (`http://127.0.0.1:8000/api/ski_resorts/all/`)
                console.log (response.data)
                setSkiResorts(response.data)
            } catch (error) {console.log (error.message)
            }
        }
        useEffect(()=>{
            fetchSkiResorts(skiResorts);
        },[]);

    return ( 
        <div className='skiResorts'>
            <div>
                {skiResorts && skiResorts.map((skiResort, index)=>{
                    return (
                        <div className='skiResorts-container'>
                            <div key={index}>Name: {skiResort.name}</div>
                            
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default DisplaySkiResorts;