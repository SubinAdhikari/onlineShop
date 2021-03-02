import React from 'react';
import Spinner from 'react-bootstrap/Spinner'

const LoadingSpinner = () =>{
    return(
        <>
        <div className="container-fluid my-5">
            <div className="row">
                <div className="col-12 d-flex justify-content-center align-items-center">
                <Spinner animation="border" role="status">
                </Spinner>
                </div>
            </div>
        </div>
        </>
    )
}
export default LoadingSpinner;