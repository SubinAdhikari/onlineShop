import React, { useContext, useEffect, useState } from 'react';
import NavBarComponent from '../customComponents/commonComponents/NavBarComponent';
import logo from '../../assets/iconsAndLogo/flipkart.png';

import {Modal,Button,Form} from 'react-bootstrap'

// context import
import {LContext} from '../context/HeaderContext/LoginContext';
import {SUContext} from '../context/HeaderContext/SignUpContext';
import {CartContext} from '../context/CartContext/CartContextProvider';

import Badge from 'react-bootstrap/Badge';

import axios from 'axios';
import { useHistory } from 'react-router-dom';
import BackToTop from '../customComponents/commonComponents/BackToTop';
var jwt = require('jsonwebtoken');


const Header = () =>{
    const history = useHistory();
    const [userName,setUserName]=useState('');

    useEffect(()=>{
        checkUserStatus();
    },[userName])

    const {show, setShow} = useContext(LContext);
    const {showSignUp,setShowSignUp} = useContext(SUContext);
    const {cartData,setCartData} = useContext(CartContext);


    // CHECK IF USER IS LOGGEDIN OR NOT
    const checkUserStatus = () =>{
        const getToken = localStorage.getItem('AccessToken')
        jwt.verify(getToken, process.env.REACT_APP_JWT_KEY , function(err, decoded) {
            if(err){
            //    console.log("NOT LOGGEDIN")
               localStorage.removeItem('AccessToken');
               setCartData('');
                return;
            }else{
                const {id,email,fullName,mobileNo} = decoded;
                // console.log(`LOGED IN EMAIL IS : ${email} FULL NAME IS : ${fullName}`)
                // console.log('LOGGED IN')
                setUserName(fullName);
            }
          });
    }
    // ENDS


// LOGIN STATE
    const [loginFormState,setLoginFromState] = useState({
        email:'',
        password:''
    });

    const loginChangeHandler = (e) =>{
        setLoginErrMsg('');
     const {name,value} = e.target;
     setLoginFromState((prevValue)=>{
         return{
             ...prevValue,
             [name]:value
         }
     })
    }

    const [loginErrorMsg,setLoginErrMsg]=useState('');

 const loginHandler = async () =>{
    await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/user/auth`,
        data: loginFormState
      })
            .then((response)=>{
                if(response.data.validationError){
                    setLoginErrMsg(response.data.validationError.message); 
                }else{
                    // console.log(response.data)
                    const {_id,email,fullName,mobileNo,password} = response.data
                     // ================== Create JWT Token =================
                    const token = jwt.sign({_id,email,fullName,mobileNo,password}, process.env.REACT_APP_JWT_KEY, {expiresIn:'1h'}); //expire in 7 days
                    // =================== SEND EMAIL ====================
                    localStorage.setItem('AccessToken',token);

                    setUserName(fullName);
                    handleClose();
                }
            })
            .catch((err)=>{
                console.log(err)
            })
 }

 const handleShow = () => setShow(true);

 const handleClose = () => {
     setLoginErrMsg('');
     setLoginFromState({
         email:'',
         password:''  
     })
     setShow(false)
 };
    // LOGIN STATE ENDS


   
    // SignUp STATE
    const [signupErrorMsg,setSignUpErrMsg]=useState('');
    const [signupSuccessMsg,setSignUpSuccessMsg]=useState('');

    const [signUpFormState,setSignUpFromState] = useState({
        fullName:'',
        email:'',
        mobileNo:'',
        password:''
    });

    const signUpChangeHandler = (e) =>{
     const {name,value} = e.target;
     setSignUpErrMsg('');
     setSignUpSuccessMsg('');
     setSignUpFromState((prevValue)=>{
         return{
             ...prevValue,
             [name]:value
         }
     })
    }



 const signUpHandler = async () =>{
    //  console.log(signUpFormState)
    await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND_BASE_URL}/register`,
        data: signUpFormState
      })
            .then((response)=>{
                if(response.data.validationError){
                    setSignUpErrMsg(response.data.validationError.message); 
                }else{
                    console.log(response.data)
                    setSignUpSuccessMsg('Registered Successfully. Proceeed to login')
                }
            })
            .catch((err)=>{
                console.log(err)
            })
}


const CloseSignUpModel = () =>{ 
    setSignUpFromState({
        fullName:'',
        email:'',
        mobileNo:'',
        password:''
    })
    setSignUpErrMsg('');
    setSignUpSuccessMsg('');
    setShowSignUp(false)
}

const signUpModelOpenHandler = () =>{
    handleClose();
    setShowSignUp(true);
}
    // SignUp STATE ENDS





    const returnToLoginHandler = () =>{
        CloseSignUpModel();
        setShow(true);
    }

    const cartRedirectHandler = () =>{
        window.location.href = '/cart'
    }


    const logoutUserHandler = () =>{
        localStorage.removeItem('AccessToken');
        setUserName('');
        window.location.href="/"
    }

 

    return(
        <>
<nav className="navbar navbar-expand-lg navbar-light sticky-top">
    <div className="container">
  <a className="navbar-brand" href="/">
      <img src={logo} alt="logo" className="img-fluid" />
  </a>

{/* MOBILE VIEW */}
<div className="mobileView col-7">
    <div className="col-12 p-0 d-flex justify-content-center align-items-center">
            {
                userName === ''
                ?
                <div className="col-6 d-flex justify-content-center align-items-center" onClick={handleShow}>
                    <span style={{color:'white'}}>Login</span>
                </div>
                :
                ('')
            }
            {
                userName
                ?
                <li className="nav-item dropdown list-unstyled">
                    <a className="nav-link d-flex" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="mr-1 font-weight-bold" style={{color:'white',fontSize:'15px'}}>Profile</span>
                    <i className="fa fa-chevron-down" style={{color:'white',fontSize:'15px'}}></i>
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" onClick={()=>history.push('/profile')}>Profile</a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" onClick={logoutUserHandler}>LogOut</a>
                    </div>
                </li>
                :
                ('')
            }
        <div className="col-6 d-flex justify-content-center align-items-center" style={{color:'white'}} onClick={cartRedirectHandler}>
            <i className="fa fa-shopping-cart mr-2"></i>
            <span>Cart</span>
            {
                cartData !== '0'
                ?
                <Badge className="cartBadge" variant="light">{cartData}</Badge>
                :
                ('')
            }
        </div>
    </div>
</div>
{/* ==== Search Box ==== */}
<div className="mobileView col-12 p-0 mt-2">
    <div className="col-12 p-0">
        <input className="py-1 px-2" type="text" name="searchValue" placeholder="Search for products, brands and more" autoComplete="off" style={{height:'35px'}}/>
        <i className="fa fa-search mr-3 mt-2 searchBoxIcon"></i>
    </div>
</div>
{/* ==== Search Box ==== */}

{/* MOBILE VIEW ENDS */}
  

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <div className="searchBox col-lg-7 col-md-7 col-12 p-0">
        <input className="py-1 px-2" type="text" name="searchValue" placeholder="Search for products, brands and more" autoComplete="off"/>
        <i className="fa fa-search mr-3 mt-2"></i>
    </div>
    {
            userName
            ?
            <li className="nav-item dropdown list-unstyled">
                <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-1 font-weight-bold" style={{color:'white',fontSize:'15px'}}>{userName}</span>
                <i className="fa fa-chevron-down" style={{color:'white',fontSize:'15px'}}></i>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" onClick={()=>history.push('/profile')}>Profile</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" onClick={logoutUserHandler}>LogOut</a>
                </div>
            </li>
            :
            ('')
    }
    {
        userName === ''
        ?
        <div className="col-lg-2 col-md-2 col-12 d-flex justify-content-center align-items-center">
            <div className="loginButton text-uppercase d-flex justify-content-center align-items-center" onClick={handleShow}>
                Login
            </div>
        </div>
        :
        ('')
    }
 

    <div className="col-lg-1 col-md-1 col-12 p-0">
        <div className="moreBtn d-flex justify-content-center align-items-center">
            <li className="nav-item dropdown list-unstyled">
                <a className="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-1">More</span>
                <i className="fa fa-chevron-down"></i>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
        </div>
    </div>

    <div className="col-lg-1 col-md-1 col-12 p-0 ml-lg-4">
        <div className="cartButton d-flex justify-content-start align-items-center" onClick={cartRedirectHandler}>
            <i className="fa fa-shopping-cart mr-2"></i>
            <span>Cart</span>
            {
                cartData !== '0'
                ?
                <Badge className="cartBadge" variant="light">{cartData}</Badge>
                :
                ('')
            }
        </div>
    </div>


  </div>
  </div>
</nav>
        <NavBarComponent/>

        {/* Login Model Starts */}
        <Modal show={show} onHide={handleClose} centered size="lg">
            <div className="closeButton" onClick={handleClose}>
                <i className="fa fa-times fa-2x"></i>
            </div>
            <div className="loginModelMainDiv">
                <Modal.Body className="p-0">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-12 d-flex flex-column leftDivMain p-5">
                            <span className="loginHeader mb-3">Login</span>
                               <span className="loginDesc">Get access to your orders, Wishlists, and Recommendation</span>
                            </div>
                            <div className="col-lg-8 col-md-8 col-12  rightDivMain  d-flex justify-content-center align-items-center p-lg-5 p-2">
                                <Form className="col-12 d-flex flex-column align-items-center p-0">
                                    {
                                        loginErrorMsg
                                        ?
                                        <span style={{color:'red'}}>* {loginErrorMsg}</span>
                                        :
                                        ('')
                                    }
                                    
                                    <div className="col-lg-10 col-md-10 col-12 mt-1 mb-3">
                                        <input
                                        className="w-100"
                                        type="email"
                                        placeholder="Enter Email"
                                        onChange={loginChangeHandler}
                                        name="email"
                                        value={loginFormState.email}
                                        autoComplete="off"
                                        />
                                    </div>
                                    
                                    <div className="col-lg-10 col-md-10 col-12 mt-1">
                                        <input
                                        className="w-100"
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={loginChangeHandler}
                                        name="password"
                                        value={loginFormState.password}
                                        autoComplete="off"
                                        />
                                    </div>

                                    <Form.Text className="text-muted col-lg-10 col-md-10 col-12 mt-3">
                                    By continuing, you agree to Flipkart's <a href="javascript:void(0)">Terms of Use</a> and <a href="javascript:void(0)">Privacy Policy.</a>
                                    </Form.Text>

                                    <div className="loginButton col-lg-10 col-md-10 col-12 mt-3 mb-3 d-flex justify-content-center align-items-center" onClick={loginHandler} >
                                        Login
                                    </div>


                                    <span className="createAccountText col-lg-10 col-md-10 col-12 mt-3 d-flex justify-content-center align-items-center"
                                    onClick={signUpModelOpenHandler}
                                    >
                                    New to Flipkart ? Create an account.
                                    </span>

                                </Form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
        {/* Login Model Ends */}




        {/* SignUp Model Starts */}
        <Modal show={showSignUp} onHide={CloseSignUpModel} centered size="lg">
            <div className="closeButton" onClick={CloseSignUpModel}>
                <i className="fa fa-times fa-2x"></i>
            </div>
            <div className="loginModelMainDiv">
                <Modal.Body className="p-0">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-12 d-flex flex-column leftDivMain p-5">
                               <span className="loginHeader mb-3">Looks like you'r new here!</span>
                               <span className="loginDesc">Sign up to get started</span>
                            </div>
                            <div className="col-lg-8 col-md-8 col-12  rightDivMain  d-flex justify-content-center align-items-center p-lg-5 p-2">
                                <Form className="col-12 d-flex flex-column align-items-center p-0">
                                {
                                    signupErrorMsg
                                    ?
                                    <span style={{color:'red'}}>* {signupErrorMsg}</span>
                                    :
                                    signupSuccessMsg
                                    ?
                                    <span style={{color:'yellowgreen'}}>* {signupSuccessMsg}</span>
                                    :
                                    ('')
                                }
                                
                                    <div className="col-lg-10 col-md-10 col-12 mt-1">
                                        <input
                                        className="w-100"
                                        type="text"
                                        placeholder="Enter Full Name"
                                        name="fullName"
                                        value={signUpFormState.fullName}
                                        onChange={signUpChangeHandler}
                                        autoComplete="off"
                                        />
                                    </div>

                                
                                    <div className="col-lg-10 col-md-10 col-12 mt-1 mb-3">
                                        <input
                                        className="w-100"
                                        type="text"
                                        placeholder="Enter Email"
                                        name="email"
                                        value={signUpFormState.email}
                                        onChange={signUpChangeHandler}
                                        autoComplete="off"
                                        />
                                    </div>


                                    <div className="col-lg-10 col-md-10 col-12 mt-1">
                                        <input
                                        className="w-100"
                                        type="number"
                                        placeholder="Enter Mobile Number"
                                        value={signUpFormState.mobileNo}
                                        name="mobileNo"
                                        onChange={signUpChangeHandler}
                                        autoComplete="off"
                                        />
                                    </div>

                                
                                    <div className="col-lg-10 col-md-10 col-12 mt-1">
                                        <input
                                        className="w-100"
                                        type="password"
                                        placeholder="Enter Password"
                                        value={signUpFormState.password}
                                        name="password"
                                        onChange={signUpChangeHandler}
                                        autoComplete="off"
                                        />
                                    </div>


                                    <Form.Text className="text-muted col-lg-10 col-md-10 col-12 mt-3">
                                    By continuing, you agree to Flipkart's <a href="javascript:void(0)">Terms of Use</a> and <a href="javascript:void(0)">Privacy Policy.</a>
                                    </Form.Text>

                                    <div className="loginButton col-lg-10 col-md-10 col-12 mt-3 mb-3 d-flex justify-content-center align-items-center" onClick={signUpHandler}>
                                        Sign Up
                                    </div>

                                    <div className="ReturnTologinButton col-lg-10 col-md-10 col-12 mt-3 mb-3 d-flex justify-content-center align-items-center"
                                    onClick={returnToLoginHandler}
                                    >
                                        Existing User ? Log in
                                    </div>
                                    

                                </Form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </div>
        </Modal>
        {/* SignUp Model Ends */}

        {/* Back To TOP */}
        <BackToTop/>
        {/* Back To Top Ends */}
        </>
    )
}
export default Header;