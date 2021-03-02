import React from 'react';
import sell from '../../assets/iconsAndLogo/sell.svg';
import adv from '../../assets/iconsAndLogo/adv.svg';
import gift from '../../assets/iconsAndLogo/gift.svg';
import help from '../../assets/iconsAndLogo/help.svg';



const Footer = () =>{
    return(
        <>
        <div className="container-fluid mt-5">
            <div className="row footerMainRow1 p-lg-5 px-2 py-4">
                {/* ABOUT US */}
                <div className="col-lg-2 col-md-2 col-6 d-flex flex-column mb-lg-0 mb-3">
                        <span className="text-uppercase heading mb-2">About</span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Contact Us</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">About Us</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Careers Us</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Stories</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Press</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Wholesale</a></span>
                </div>
                {/* ABOUT US */}

                {/* Help US */}
                <div className="col-lg-2 col-md-2 col-6 d-flex flex-column mb-lg-0 mb-3  ">
                        <span className="text-uppercase heading mb-2">Help</span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Payment</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Shipping</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Cancellation & Retuen</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">FAQ</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Report infringment</a></span>
                </div>
                {/* Help US */}

                {/* Policy US */}
                <div className="col-lg-2 col-md-2 col-6 d-flex flex-column mb-lg-0 mb-3  ">
                        <span className="text-uppercase heading mb-2">Policy</span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Return policy</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">terms of use</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Security</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">privacy</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">sitemap</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">EPR compliance</a></span>
                </div>
                {/* Policy US */}

                {/* Social US */}
                <div className="col-lg-2 col-md-2 col-6 d-flex flex-column mb-lg-0 mb-3  ">
                        <span className="text-uppercase heading mb-2">Social</span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Facebook</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Twitter</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Youtube</a></span>
                </div>
                {/* Social US */}

                {/* Mail US */}
                <div className="col-lg-2 col-md-2 col-6 d-flex flex-column mb-lg-0 mb-3  ">
                        <span className="text-uppercase heading mb-2">Mail</span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Kathmandu, 44600</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Kapan, Nepal</a></span>
                </div>
                {/* Mail US */}

                {/* Mail US */}
                <div className="col-lg-2 col-md-2 col-6 d-flex flex-column mb-lg-0 mb-3  ">
                        <span className="text-uppercase heading mb-2">Registered Office Address</span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Kathmandu, 44600</a></span>
                        <span className="text-capitalize footerlink"><a href="javascript:void(0)">Kapan, Nepal</a></span>
                        <span className="text-capitalize footerlink">Telephone: <a href="javascript:void(0)">12345678</a></span>
                </div>
                {/* Mail US */}
            </div>
            <div className="row d-flex justify-content-center align-items-center footerMainRow2 px-5 py-4">
                <div className="col-lg-2 col-md-2 col-6 d-flex justify-content-center align-items-center  mb-lg-0 mb-3 p-0">
                    <img src={sell} className="img-fluid mr-2" />
                    <span>
                        <a href="javascript:void(0)">Sell on FlipKart</a>
                    </span>
                </div>
                <div className="col-lg-2 col-md-2 col-6 d-flex justify-content-center align-items-center mb-lg-0 mb-3  p-0">
                    <img src={adv} className="img-fluid mr-2" />
                    <span>
                    <a href="javascript:void(0)">Advertise</a>
                    </span>
                </div>
                <div className="col-lg-2 col-md-2 col-6 d-flex justify-content-center align-items-center mb-lg-0 mb-3  p-0">
                    <img src={gift} className="img-fluid mr-2" />
                    <span>
                    <a href="javascript:void(0)">Gift Cards</a>
                    </span>
                </div>
                <div className="col-lg-2 col-md-2 col-6 d-flex justify-content-center align-items-center mb-lg-0 mb-3  p-0">
                    <img src={help} className="img-fluid mr-2" />
                    <span>
                    <a href="javascript:void(0)">Help Center</a>
                    </span>
                </div>
                <div className="col-lg-2 col-md-2 col-6 d-flex justify-content-center align-items-center mb-lg-0 mb-3  p-0">
                    <span>&copy; {new Date().getFullYear()} FlipKar.com</span>
                </div>
            </div>
        </div>
        </>
    )
}
export default Footer;