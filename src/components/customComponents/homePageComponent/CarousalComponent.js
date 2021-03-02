import React,{useEffect,useState} from 'react';
import Carousel from 'react-bootstrap/Carousel'

import axios from 'axios';


const CarousalComponent = () =>{

  const [data,setData] = useState([]);

  useEffect(()=>{
    getAllData();
  },[])

  const getAllData = async () =>{
    await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/carousal`)
    .then((response)=>{
      setData(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

    return(
        <>
<Carousel>
{
  data 
  ?
  data.map((data,index)=>(
    <Carousel.Item key={index}>
    <img
      // src="https://via.placeholder.com/1600x400?text=1600*400"
      src={`http://localhost:5000/${data.imgName}`}
      alt={data.imgDesc}
      className="img-fluid d-block w-100"
    />
  </Carousel.Item>
  ))
  :
  ('')
}
  
</Carousel>
        </>
    )
}
export default CarousalComponent;