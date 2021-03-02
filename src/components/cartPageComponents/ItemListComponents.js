import React,{useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import {CartContext} from '../context/CartContext/CartContextProvider';
import CartProductIteams from './CartProductIteams';
import {LContext} from '../context/HeaderContext/LoginContext';
import axios from 'axios';
import {Modal,Button,Form} from 'react-bootstrap'

var jwt = require('jsonwebtoken');



const ItemListComponents = () =>{
    const {show, setShow} = useContext(LContext)

    const [showAddressModel, setShowAddressModel] = useState(false);
    const handleClose = (e) => {
        e.preventDefault();
        setShowAddressModel(false)
    }
    const handleShow = () => setShowAddressModel(true);

    const history = useHistory();
    const {cartData,setCartData} = useContext(CartContext);

    const [cartList,setCartList] = useState();
    const [deliveryAddressState,setDeliveryAddress]=useState({
        provinceNo:'',
        municipilityName:'',
        wardNo:'',
        street:'',
        nearByPlace:''
    })

    const addressChangeHandler = (e) =>{
        const {name,value} = e.target;

        setDeliveryAddress((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }
        })

    }

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem('CartData'));
        setCartList(data);
        // console.log(data)
    },[])


    // CONFIRM MODEL STATE
    const [message,setMessage]=useState('');
    const [showConfirmModel, setShowConfirmModel] = useState(false);
    const handleConfirmClose = () => {
        setShowConfirmModel(false)
        window.location.href="/cart"
    }
    const handleConfirmShow = () => setShowConfirmModel(true);
    // CONFIRM MODEL STATE ENDS

    const checkOutHandler =  () =>{
        if(deliveryAddressState.provinceNo === '' || deliveryAddressState.municipilityName === '' || deliveryAddressState.wardNo === '' || deliveryAddressState.street === '' || deliveryAddressState.nearByPlace === ''){
            handleShow();
            return;
        }

        const localStorageData = localStorage.getItem('AccessToken');
        jwt.verify(localStorageData, process.env.REACT_APP_JWT_KEY , function(err, decoded) {
            if(err){
              localStorage.removeItem('AccessToken');
              setShow(true);
                return;
            }else{
                const { _id,email,fullName,mobileNo} = decoded;
                const getAllProductFromLocalStorage = JSON.parse(localStorage.getItem('CartData'));
                getAllProductFromLocalStorage.push({
                    "user_id":_id,
                    "user_email":email,
                    "user_fullName":fullName,
                    "user_mobileNo":mobileNo,
                    "provinceNo":deliveryAddressState.provinceNo,
                    "municipilityName":deliveryAddressState.municipilityName,
                    "wardNo":deliveryAddressState.wardNo,
                    "street":deliveryAddressState.street,
                    "nearByPlace":deliveryAddressState.nearByPlace
                })
                // console.log(getAllProductFromLocalStorage);
                 axios({
                    method:'post',
                    url:`${process.env.REACT_APP_BACKEND_BASE_URL}/orders/${email}`,
                    data: getAllProductFromLocalStorage
                })
                .then((response)=>{
                    // console.log(response)
                    setMessage('Your Order Has been placed.Thanks for shopping with us')
                    localStorage.removeItem('CartData')
                    handleConfirmShow();
                })
                .catch((err)=>{
                    // console.log(err)
                    setMessage('Sorry there seems a problem placing your order.Could you please try again')
                    handleConfirmShow();
                })
            }
          });
    }

    return(
        <>
        <div className="col-lg-8 col-md-8 col-12 d-flex flex-column   mt-2 h-auto">
            <div className="col-12 headingMainDiv d-flex  flex-column justify-content-center py-4 ">
                <div className="headingText">My Cart ({cartData})</div>
            </div>
            <div className="productListMainDiv  p-0">
                {
                    cartList
                    ?
                    cartList.map((value,index)=>{
                        return(
                            <CartProductIteams key={index} u_id={index} data={value}/>
                        )
                    })
                    :
                    <div className="emptyCartMain col-lg-12 col-12 d-flex flex-column justify-content-center align-items-center p-5">
                            <i className="fa fa-shopping-cart fa-5x mb-2" style={{color:'#CFD0D2'}} aria-hidden="true"></i>
                            <span className="emptyCartHeading mb-1">Cart is empty</span>
                            <span className="text-center subHeading">Looks like you have no items in shopping cart. Click <a href="/">here</a> to continue shopping</span>
                    </div>
                }

            </div>
            {
               cartData === '0'
               ?
               ('')
               :
               <div className="cartFooter  d-flex justify-content-end align-items-center py-4 px-2">
                    <div className="col-lg-3 col-6 d-flex justify-content-center align-items-center p-0 mr-1">
                        <div className="continueShopping w-100 d-flex justify-content-center align-items-center" onClick={()=>window.location.href='/'}>
                        Continue Shopping
                        </div>
                    </div>
                    <div className="col-lg-3 col-6 d-flex justify-content-center align-items-center p-0">
                        <div className="checkout w-100 d-flex justify-content-center align-items-center" onClick={checkOutHandler}>
                        CheckOut
                        </div>
                    </div>
                </div>
            }
            
        </div>


{/* Address Model */}
        <Modal show={showAddressModel} onHide={handleClose} centered>
        <div className="closeButton" onClick={handleClose}>
                <i className="fa fa-times fa-2x"></i>
            </div>
        <Modal.Body>
            <div className="container-fluid p-0">
                <div className="row p-0">
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                        <span className="mb-2" style={{fontSize:'25px',fontColor:'yellowgreen',fontWeight:'bold'}}>Enter Delivery Address</span>
                        <Form className="col-12 m-0 p-0">
                            <Form.Group>
                                <Form.Label>Provience Number</Form.Label>
                                <Form.Control type="text" name="provinceNo" value={deliveryAddressState.provinceNo} onChange={addressChangeHandler} autoComplete="off" placeholder="Enter Province Number" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Municiility/VDC Name</Form.Label>
                                <Form.Control type="text" name="municipilityName" value={deliveryAddressState.municipilityName} onChange={addressChangeHandler} autoComplete="off" placeholder="Enter VDC?Municipility Name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Municiility/VDC Number</Form.Label>
                                <Form.Control type="text" name="wardNo" value={deliveryAddressState.wardNo} onChange={addressChangeHandler} autoComplete="off" placeholder="Enter VDC?Municipility Number"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Street</Form.Label>
                                <Form.Control type="text" name="street" value={deliveryAddressState.street} onChange={addressChangeHandler} autoComplete="off" placeholder="Enter street Name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Near By Temple/School or college name</Form.Label>
                                <Form.Control type="text" name="nearByPlace" value={deliveryAddressState.nearByPlace} onChange={addressChangeHandler} autoComplete="off" placeholder="Enter nearBy Place Name"/>
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={handleClose}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
            {/* <input type="text" name="provinceNo" value={deliveryAddressState.provinceNo} onChange={addressChangeHandler} placeholder="Enter Province Number" />
            <input type="text" name="municipilityName" value={deliveryAddressState.municipilityName} onChange={addressChangeHandler} placeholder="Enter VDC?Municipility Name" />
            <input type="text" name="wardNo" value={deliveryAddressState.wardNo} onChange={addressChangeHandler} placeholder="Enter VDC?Municipility Number" />
            <input type="text" name="street" value={deliveryAddressState.street} onChange={addressChangeHandler} placeholder="Enter street Name" />
            <input type="text" name="nearByPlace" value={deliveryAddressState.nearByPlace} onChange={addressChangeHandler} placeholder="Enter nearBy Place Name" />   */}
               
        </Modal.Body>
      </Modal>
      {/* Address Model Close */}


      {/* Confirm Model */}
      <Modal show={showConfirmModel} onHide={handleConfirmClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                message
                ?
                message
                :
                ('')
            }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Confirm Model Close */}

        </>
    )
}
export default ItemListComponents;