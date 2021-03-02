import React,{useContext, useState,useEffect} from 'react';
import {CartContext} from '../context/CartContext/CartContextProvider';


const InvoiceComponent = () =>{
    const {cartData,setCartData} = useContext(CartContext);
    const [state,setState]=useState();
    var totalPrice = 0;
    useEffect(()=>{
       const cartDataList = JSON.parse(localStorage.getItem('CartData')); 
       setState(cartDataList);
    },[localStorage.getItem('CartData')])

    const getTotalPrice = () =>{
        state
        ?
        state.map((data,index)=>{
            totalPrice = totalPrice + data.quantity * data.productSellingPrice
        })
        :
        totalPrice = 0
    }
    getTotalPrice();
    return(
        <>
        {
            cartData !== '0'
            ?
            <div className="col-lg-4 col-md-4 col-12 invoiceMain">
            <div className="col-12 mt-2 p-0 invoiceInnerDiv mb-5">
                <div className="col-12 text-uppercase py-2 header">
                    Price details
                </div>
                {   state 
                    ?
                    state.map((data,index)=>{
                        return(
                            <div key={index} className="col-12  py-2 priceItem">{`${data.productName} (${data.quantity} Items)`}
                                <span>${data.quantity * data.productSellingPrice}</span>
                            </div>
                        )
                    })
                    :
                    ('')
                }
                {/* <div className="col-12  py-2 priceItem">
                    Price ({cartData} Item)
                    <span>$99</span>
                </div> */}
                {/* <div className="col-12  py-2 priceItem">
                    Discount
                    <span style={{color:'green'}}>-$99</span>
                </div>
                <div className="col-12  py-2 priceItem">
                    Delivery Charge
                    <span>$99</span>
                </div> */}
            
                <div className="col-12 py-2 totalAmount">
                    Total Amount
                    <span>${totalPrice}</span>
                </div>
            </div>
        </div>
            :
            ('')

        }
        </>
    )
}
export default InvoiceComponent;