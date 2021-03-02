import React, { useEffect, useState,useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation,useHistory } from 'react-router-dom';
import ProductTitleHeading from '../customComponents/commonComponents/ProductTitleHeading';

// Context
import {CartContext} from '../context/CartContext/CartContextProvider';


// Context
import {DealsOfTheDayContext} from '../context/APIContext/DealsOfTheDayContextProvider';
import {FurnitorsBestSellerContext} from '../context/APIContext/FurnitorsBestSellerContextProvider';



const ProductPage = () =>{

    const {dealsOfTheWeekState,setDealsOfTheWeekState} = useContext(DealsOfTheDayContext);
    const {furnitorsBestSellersState,setFurnitorsBestSellersState} = useContext(FurnitorsBestSellerContext);

    const {cartData,setCartData} = useContext(CartContext);
    const history = useHistory();


    const location = useLocation();

    const [state,setState]= useState();

    useEffect(()=>{
        setState(location.state);
        console.log(location.state)
        scrollToTop();
    },[location.state])

    const scrollToTop = () =>{
        window.scrollTo(0,0);
    }


    const addToCartHandler = () =>{
        if(localStorage.getItem('CartData')){
            const prevData = JSON.parse(localStorage.getItem('CartData'))
            state.quantity = 1;
            prevData.push(state);
            localStorage.setItem('CartData',JSON.stringify(prevData));
        }else{
            state.quantity = 1;
        localStorage.setItem('CartData',JSON.stringify([state]));
                }

                setCartData(cartData+1);
                history.push('/cart')

    }

    return(
        <>
        {
            state
            ?
            <>
            <Helmet>
                <title>{state.name}</title>
            </Helmet>
            <div className="container-fluid productPageMainDiv">
                <div className="row">
                    <div className="imageMainDiv col-lg- 4 col-md-4 col-12  d-flex flex-column justify-content-center align-items-center">
                        <div className="imageDiv w-100 d-flex justify-content-center align-items-center">
                            <img
                            // src={require(`../../assets/productImage/${state.imgName}`).default}
                            src={`http://localhost:5000/${state.imgName}`}
                            className="img-fluid"
                            alt={state.imgName}
                            loading="lazy"
                            />
                        </div>
                        <div className="buttonDiv d-flex justify-content-center align-items-center py-2">
                            <div className="atc h-100 d-flex justify-content-center align-items-center mr-1 text-uppercase" onClick={addToCartHandler}>
                                <i className="fa fa-shopping-cart mr-2"></i>
                                Add To Cart
                            </div>
                            <div className="bn h-100 d-flex justify-content-center align-items-center text-uppercase" onClick={addToCartHandler}>
                                <i className="fa fa-bolt mr-2"></i>
                                Buy Now
                            </div>
                        </div>
                    </div>
                    <div className="descMainDiv col-lg-8 col-md-8 col-12 d-flex flex-column p-4">
                        <span className="text-capitalize descName">{state.productName}</span>
                        <span className="priceTitle">
                            Price: <span className="price">{state.productSellingPrice}</span>
                        </span>
                        <span className="mt-2 font-weight-bold">Product Description's</span>
                        <span>
                            {state.description}
                        </span>
                    </div>
                </div>
            </div>

             {/* SIMILAR PRODUCT */}
            

             {
         dealsOfTheWeekState
                ?
                dealsOfTheWeekState.map((data,index)=>{
                    return(
                            <>
                            {
                                data.status === 'disable'
                                ?
                                <ProductTitleHeading widthSize={12} headingTitle={data.categoryName} data={data}/>
                                :
                                ('')
                            }
                            </>
                    )
                })
                :
                ('')
            }

{
         furnitorsBestSellersState
                ?
                furnitorsBestSellersState.map((data,index)=>{
                    return(
                            <>
                            {
                                data.status === 'disable'
                                ?
                                <ProductTitleHeading widthSize={12} headingTitle={data.categoryName} data={data}/>
                                :
                                ('')
                            }
                            </>
                    )
                })
                :
                ('')
            }

            </>
            :
            <div>
                Sorry This product might have been removed.
            </div>
        }
                     {/* ENDS */}

        </>
    )
}
export default ProductPage;