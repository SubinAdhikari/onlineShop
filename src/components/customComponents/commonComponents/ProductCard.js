import React from 'react';
import { useHistory } from 'react-router-dom';
import LazyLoad from 'react-lazyload';


const ProductCard = ({productData}) =>{
    const history = useHistory();

    return(
        <>
        <div onClick={
            ()=>history.push({
                    pathname:`../product/${productData.productName}`,
                    state: productData
                            })} 
        className="col-lg-2 col-md-2 col-6 d-flex flex-column justify-content-center align-items-center productCardMainDiv p-0 mr-2" >
            <div className="imageDiv d-flex justify-content-center align-items-center w-100">
            <LazyLoad>
                <img
                // src={require(`../../../assets/productImage/${productData.imgName}`).default}
                src={`http://localhost:5000/${productData.imgName}`}
                className="img-fluid"
                // className="img-thumbnail"
                alt={productData.imgName}
                loading="lazy"
                />
            </LazyLoad>
            </div>
            <div className="descDiv d-flex flex-column justify-content-center align-items-center w-100">
                <span className="productName">{productData.productName}</span>
                <span className="productPrice">${productData.productSellingPrice}</span>
                {/* <span className="productSubName">{productData.subname}</span> */}
            </div>
        </div>
        </>
    )
}
export default ProductCard