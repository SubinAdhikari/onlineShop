import React, { useContext, useEffect,useState } from 'react';
import ProductTitleHeading from '../customComponents/commonComponents/ProductTitleHeading';
import CarousalComponent from '../customComponents/homePageComponent/CarousalComponent';
import OffersCard from '../customComponents/homePageComponent/OffersCard';
import axios from 'axios';
// Context
import {DealsOfTheDayContext} from '../context/APIContext/DealsOfTheDayContextProvider';
import {FurnitorsBestSellerContext} from '../context/APIContext/FurnitorsBestSellerContextProvider';
import {OfferContext} from '../context/OfferContext/OfferContextProvider'




const HomePage= () =>{
    const {dealsOfTheWeekState,setDealsOfTheWeekState} = useContext(DealsOfTheDayContext);
    const {furnitorsBestSellersState,setFurnitorsBestSellersState} = useContext(FurnitorsBestSellerContext);
    const {offerState,setOfferState} = useContext(OfferContext)

return(
    <>
    <CarousalComponent/>
    {
         dealsOfTheWeekState
         ?
         dealsOfTheWeekState.map((data,index)=>{
              return(
                    <>
                    {
                        data.status === 'disable'
                        ?
                        <ProductTitleHeading key={index} widthSize={10} headingTitle={data.categoryName} adsImg='ad1.jpg' data={data} />
                        :
                        ('')
                    }
                    </>
              )
          })
          :
          ('')
    }


    {/* If ProductTitleHeading widthSize is less than 12 then adsImage props is must */}
    {/* <ProductTitleHeading widthSize={10} headingTitle="Deals of the Day" adsImg='ad1.jpg' data={realData}/> */}
    {/* If ProductTitleHeading widthSize is less than 12 then adsImage props is must ENDS*/}

{/* Offer Card */}
    <div className="container-fluid my-2">
        <div className="row">
            {
                offerState
                ?
                    offerState.map((data,index)=>(
                        data.placement === 'row_1'
                        ?
                        <OffersCard key={index} imgName={data.imgName}/>
                        :
                        ('')
                    ))
                :
                ('')
            }
            {/* <OffersCard imgName={require(`../../assets/OffersCard/offer1.jpg`).default}/>
            <OffersCard imgName={require(`../../assets/OffersCard/offer2.jpg`).default}/>
            <OffersCard imgName={require(`../../assets/OffersCard/offer1.jpg`).default}/> */}
        </div> 
    </div>
{/* Offer Card Ends*/}


    {
         furnitorsBestSellersState
         ?
         furnitorsBestSellersState.map((data,index)=>{
              return(
                    <>
                    {
                        data.status === 'disable'
                        ?
                        <ProductTitleHeading key={index} widthSize={12} headingTitle={data.categoryName} data={data}/>
                        :
                        ('')
                    }
                    </>
              )
          })
          :
          ('')
    }

    {/* Offer Card */}
    <div className="container-fluid my-2">
        <div className="row">
        {
                offerState
                ?
                    offerState.map((data,index)=>(
                        data.placement === 'row_2'
                        ?
                        <OffersCard key={index} imgName={data.imgName}/>
                        :
                        ('')
                    ))
                :
                ('')
            }
            {/* <OffersCard imgName={require(`../../assets/OffersCard/offer2.jpg`).default}/>
            <OffersCard imgName={require(`../../assets/OffersCard/offer1.jpg`).default}/>
            <OffersCard imgName={require(`../../assets/OffersCard/offer2.jpg`).default}/> */}
        </div>
    </div>
{/* Offer Card Ends*/}



{/* <ProductTitleHeading widthSize={12} headingTitle="Top Offers On" data={realData}/>

<ProductTitleHeading widthSize={12} headingTitle="Trending Offers" data={realData}/>

<ProductTitleHeading widthSize={12} headingTitle="Home Makeover" data={realData}/>

<ProductTitleHeading widthSize={12} headingTitle="Top Products" data={realData}/> */}



    </>
)
}
export default HomePage;