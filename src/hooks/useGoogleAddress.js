import {useState, useEffect} from "react";
import axios from "axios";

// const useGoogleAddress = (address) => {
//     console.log(address);
//     const [map, setMap] = useState([]);
//     const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA_n35iz120oQH-fkRnf98uu6Y7PYHGIKQ`; 

//     useEffect(async () => {
//         const response = await axios(API);
//         setMap(response.data.results[0].geometry.location);
//     },[]);
//     return map;
// };


const getCoordinates = async (api) => {
    const response = await axios(api);
    console.log(response);
    return response
  }
  
  const useGoogleAddress = address => {
    const [map, setMap] = useState({});
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyA_n35iz120oQH-fkRnf98uu6Y7PYHGIKQ`;
    
    useEffect( async () => {
      const res = await getCoordinates(API);
      setMap(res.data.results[0].geometry.location);
    }, []);
  
    return map;
  }

export default useGoogleAddress;
