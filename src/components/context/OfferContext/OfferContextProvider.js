import React,{useState,createContext, useEffect} from 'react';
import axios from 'axios';

export const OfferContext = createContext();

const OfferContextProvider = (props) =>{
    const [offerState,setOfferState]=useState();

    useEffect(()=>{
        getAllOffers();
    },[])

    const getAllOffers = async () =>{
        await axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_BASE_URL}/offers`
          })
          .then((response)=>{
            setOfferState(response.data)
          })
          .catch((err)=>{
            console.log(err)
          })
    }

    return(
        <OfferContext.Provider value={{offerState,setOfferState}}>
            {props.children}
        </OfferContext.Provider>
    )
}

export default OfferContextProvider;