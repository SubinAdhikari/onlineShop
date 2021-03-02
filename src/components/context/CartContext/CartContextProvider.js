import React,{useState,createContext, useEffect} from 'react';

export const CartContext = createContext();

const CartContextProvider = (props) =>{
    const [cartData,setCartData]=useState('0');

    useEffect(()=>{
        if(localStorage.getItem('CartData')){
            const data = JSON.parse(localStorage.getItem('CartData'));
            // console.log(`Cart Length is : ${data.length}`)
            setCartData(data.length);
        }else{
            setCartData('0')
        }
    })
    return(
        <CartContext.Provider value={{cartData,setCartData}}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;