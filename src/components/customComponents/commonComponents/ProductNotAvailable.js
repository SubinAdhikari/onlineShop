import React from 'react';
import NA from '../../../assets/Product not found vector.svg';

const ProductNotAvailable = () =>{
    return(
        <>
        <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center productNotAvailableMainDiv">
                        <span className="mb-1 text-center">Sorry Product Not Available</span>
                        <img src={NA} className="img-fluid" loading="lazy"/>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductNotAvailable;