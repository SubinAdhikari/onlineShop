import React,{useState,useEffect, useContext} from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import {OfferContext} from '../../context/OfferContext/OfferContextProvider';
import LazyLoad from 'react-lazyload';


const ProductTitleHeading = ({widthSize,headingTitle,adsImg,data}) =>{

    const {offerState,setOfferState} = useContext(OfferContext);

    // function enableScrolling(){
    //     window.onscroll=function(){};
    // }

    // const disableVerticleScroll = () =>{
    //     var x=window.scrollX;
    //     var y=window.scrollY;
    //     window.onscroll=function(){window.scrollTo(x, y);};
    //     setInterval(()=>{
    //         enableScrolling()
    //     },1000)
    // }
    const history = useHistory();
    const [loading,setLoading]=useState(true)

    const [productList,setProductList]=useState();

    useEffect(()=>{
        productOfCategory();
    },[])

    const productOfCategory = async () =>{
        await axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_BASE_URL}/product/${data.categoryName}`
          })
          .then((response)=>{
            setProductList(response.data)
            setLoading(false)
          })
          .catch((err)=>{
            console.log(err)
            setLoading(false)
          })
    }
    

    
var winX = null;
var winY = null;

window.addEventListener('scroll', function () {
    if (winX !== null && winY !== null) {
        window.scrollTo(winX, winY);
                setInterval(()=>{
                    enableWindowScroll()
        },1000)
    }
});

function disableVerticleScroll() {
    winX = window.scrollX;
    winY = window.scrollY;
}

function enableWindowScroll() {
    winX = null;
    winY = null;
}



    return(
        <>
        {
            productList
            ?
            <div className="container-fluid">
            <div className="row px-2">
                <div className={`col-lg-${widthSize} col-md-${widthSize} col-12 productTitleHeading mt-2`}>
                    <div className="row headingRow">
                        <div className="col-lg-12 col-md-12 col-12 p-2 d-flex align-items-center">
                            <span className="titleClass ml-3">{headingTitle}</span>
                            <div className="viewAllBtn d-flex justify-content-center align-items-center mr-3"
                            onClick={()=>{
                                history.push({
                                    pathname:'/category',
                                    state: headingTitle
                                })
                            }}
                            >View All</div>
                        </div>
                    </div>
                    <div className="row rowDiv align-items-center">
                            <a  href={`#${headingTitle}last`}  onClick={disableVerticleScroll} className="rightIcon text-decoration-none d-flex justify-content-center align-items-center">
                                <i className="fa fa-angle-right py-3 px-2"></i>
                            </a>
                        <div className="col-lg-12 col-md-12 col-12 p-2 d-flex align-items-center productSliderMainDiv">
                            <div id={`${headingTitle}first`}></div>
                            {
                                productList.map((value,index)=>{
                                    return(
                                        <ProductCard key={index} productData={value}/>
                                    )
                                })
                            }

                            <div id={`${headingTitle}last`}></div>
                        </div>

                            <a  href={`#${headingTitle}first`}  onClick={disableVerticleScroll}  className="leftIcon text-decoration-none d-flex justify-content-center align-items-center">
                                <i className="fa fa-angle-left py-3 px-2"></i>
                            </a>
                    </div>
                </div>
                {/* For Ads  if there is size available*/}
                {
                    // console.log(`${headingTitle} is of width : ${widthSize-12}`),
                    widthSize !== 12
                    ?
                        offerState
                        ?
                            offerState.map((data,index)=>(
                                data.placement === "slider_ads"
                                ?
                                <div key={index} className={`col-lg-${12-widthSize} col-md-${12-widthSize} col-12 d-flex justify-content-center align-items-center adsDiv py-2`}>
                                <LazyLoad>    
                                    <img
                                        // src={require(`../../../assets/adsImage/${adsImg}`).default}
                                        src={`http://localhost:5000/${data.imgName}`}
                                        className="img-fluid adImgClass"
                                        alt={adsImg}
                                        loading="lazy"
                                    />
                                </LazyLoad>
                                </div>
                                :
                                ('')
                                ))
                        :
                        ('')
                    
                    :
                    ('')
                }
                {/* For Ads */}
                
            </div>
        </div>

            :
            loading
            ?
            <LoadingSpinner/>
            :
            ('NOT FOUND')
        }
        
        </>
    )
}
export default ProductTitleHeading;