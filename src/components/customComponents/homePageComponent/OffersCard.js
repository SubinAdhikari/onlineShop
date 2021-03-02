import React from 'react';
import LazyLoad from 'react-lazyload';


const OffersCard = ({imgName}) =>{
    return(
        <>
        {/* href="https://via.placeholder.com/400x200?text=400*200" */}
        <a  target="_blank" className="col-lg-4 col-md-4 col-12 offersCard d-flex justify-content-center align-items-center p-0">
            <div className="cardMain d-flex justify-content-center align-items-center p-0">
            <LazyLoad>
                <img
                // src="https://via.placeholder.com/400x200?text=400*200"
                src={`http://localhost:5000/${imgName}`}
                alt="Offers_img"
                className="img-fluid offerImage"
                loading="lazy"
                />
            </LazyLoad>
            </div>
        </a>
        </>
    )
}
export default OffersCard;