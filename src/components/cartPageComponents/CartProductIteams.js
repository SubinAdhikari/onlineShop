import React, { useEffect, useState,useContext } from 'react';


const CartProductIteams = ({u_id,data}) =>{

    const [totalDataInCart,setTotalDataInCart]=useState();
    var productCartQuantity = data.quantity;


    useEffect(()=>{
        // const data = JSON.parse(localStorage.getItem('CartData'));
        // setTotalDataInCart(data);
        getItemFromLS();
    },[])

    const getItemFromLS = () =>{
        const data = JSON.parse(localStorage.getItem('CartData'));
        setTotalDataInCart(data);
    }

    const removeFromCart =  (u_id) =>{
        // console.log(totalDataInCart.length);
     const remainingData =  totalDataInCart.filter((value,index)=>{
                                      return  index !== u_id
                                })
        localStorage.setItem('CartData',JSON.stringify(remainingData))

        if(totalDataInCart.length === 1){
            localStorage.removeItem('CartData');
        }
        
        window.location.href='/cart'
                 
    }

    const quantityIncrement = (u_id) =>{
        productCartQuantity = productCartQuantity + 1;

        const productData = JSON.parse(localStorage.getItem('CartData'));
        // console.log(productData);
        // console.log(productData[u_id])
        productData[u_id].quantity = productCartQuantity;
        localStorage.setItem('CartData',JSON.stringify(productData))
        window.location.href='/cart'
    }
    const quantityDecrement = (u_id) =>{
        if(productCartQuantity > 1){
        productCartQuantity = productCartQuantity - 1;
        const productData = JSON.parse(localStorage.getItem('CartData'));
        productData[u_id].quantity = productCartQuantity;
        localStorage.setItem('CartData',JSON.stringify(productData))
        window.location.href='/cart'
                                 }
    }

    return(
        <>
        <div className="col-12 d-flex p-0  cartProductIteamsMainDiv p-2">
            <div className="col-lg-3 col-md-3 col-12 p-0 cartProductIteamsImageDiv d-flex justify-content-center align-items-center">
                <img
                // src={require(`../../assets/productImage/${data.imgName}`).default}
                src={`http://localhost:5000/${data.imgName}`}
                className="img-fluid"
                alt="Img_name"
                loading="lazy"
                />
            </div>
            <div className="col-lg-9 col-md-9 col-12  p-0 cartProductIteamsDescDiv d-flex flex-column">
                <div className=" d-flex flex-column mt-2  px-2">
                    <span className="productName">{data.productName}</span>
                    <span className="sellerName text-uppercase">Seller Name</span>
                    <span className="price">{data.productSellingPrice}</span>
                </div>

                <div className="removeButton">
                    <i className="fa fa-times fa-2x"
                     onClick={()=>removeFromCart(u_id)}
                     ></i>
                </div>

                <div className="footerMain col-12  px-2 d-flex  align-items-center">
                    <div className="iconDiv d-flex justify-content-center align-items-center mr-2" onClick={()=>quantityDecrement(u_id)}>-</div>
                    <div>{productCartQuantity}</div>
                    <div className="iconDiv d-flex justify-content-center align-items-center ml-2" onClick={()=>quantityIncrement(u_id)}>+</div>
                </div>
            </div>
        </div>
        </>
    )
}
export default CartProductIteams;