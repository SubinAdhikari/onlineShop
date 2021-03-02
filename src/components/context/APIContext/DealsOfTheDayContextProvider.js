import React,{useState,createContext, useEffect} from 'react';
import axios from 'axios';

export const DealsOfTheDayContext = createContext();

const DealsOfTheDayContextProvider = (props) =>{
    const [dealsOfTheWeekState,setDealsOfTheWeekState]=useState();

    useEffect(()=>{
        getCategoryDealsOfTheWeek();
    },[])

    const getCategoryDealsOfTheWeek = async () =>{
        await axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_BASE_URL}/categories/Deals of the Day`
          })
          .then((response)=>{
            setDealsOfTheWeekState(response.data)
          })
          .catch((err)=>{
            console.log(err)
          })
    }

    return(
        <DealsOfTheDayContext.Provider value={{dealsOfTheWeekState,setDealsOfTheWeekState}}>
            {props.children}
        </DealsOfTheDayContext.Provider>
    )
}

export default DealsOfTheDayContextProvider;