import React,{useState,createContext, useEffect} from 'react';
import axios from 'axios';

export const FurnitorsBestSellerContext = createContext();

const FurnitorsBestSellerContextProvider = (props) =>{
    const [furnitorsBestSellersState,setFurnitorsBestSellersState]=useState();

    useEffect(()=>{
        getFurnitorsBestSellers();
    },[])

    const getFurnitorsBestSellers = async () =>{
        await axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_BASE_URL}/categories/Furniture Bestsellers`
          })
          .then((response)=>{
            setFurnitorsBestSellersState(response.data)
          })
          .catch((err)=>{
            console.log(err)
          })
    }

    return(
        <FurnitorsBestSellerContext.Provider value={{furnitorsBestSellersState,setFurnitorsBestSellersState}}>
            {props.children}
        </FurnitorsBestSellerContext.Provider>
    )
}

export default FurnitorsBestSellerContextProvider;