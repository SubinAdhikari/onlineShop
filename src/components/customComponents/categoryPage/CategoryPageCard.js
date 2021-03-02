import React,{useState,useContext} from 'react';
import { useHistory } from 'react-router-dom';
// import img from '../../../assets/productImage/product6.jpg';
import LazyLoad from 'react-lazyload';






const CategoryPageCard = ({products}) =>{
    const history = useHistory();

    return(
        <>
        {products.map((product, index) => (
        <div key={index} className="col-lg-2 col-md-2 col-6 d-flex justify-content-center align-items-center categoryPageCardMain p-1"
        onClick={()=>history.push({
                    pathname:`../product/${product.productName}`,
                    state: product
                            })} 
        >
            <div className="innerCard d-flex flex-column align-items-center p-0">
                <div className="imageMainDiv d-flex justify-content-center align-items-center">
                <LazyLoad>
                    <img
                    src={`http://localhost:5000/${product.imgName}`}
                    className="img-fluid"
                    alt={product.imgName}
                    loading="lazy"
                    />
                </LazyLoad>
                </div>
                <div className="descDivMain d-flex flex-column justify-content-center align-items-center w-100 p-2">
                    <span className="productHeading">
                        {/* {product.name.substring(0, 10)}... */}
                        {product.productName}
                    </span>
                    <span className="price">${product.productSellingPrice}</span>
                </div>
            </div>
        </div>
        ))
        }
        </>
    )
}
export default CategoryPageCard