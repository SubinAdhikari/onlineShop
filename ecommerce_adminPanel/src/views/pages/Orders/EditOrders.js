import React, { useEffect, useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CForm,
    CFormGroup,
    CFormText,
    CInput,
    CLabel,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';


const EditOrders = () =>{
  const history = useHistory();

  const location = useLocation();

  const [data,setData]=useState();

  useEffect(()=>{
    console.log(location.state)
    setData(location.state);
  },[])

var totalAmount = 0;


const packedHandler = () =>{
  addToPackedDB();
  removeFromOrderDB();
}

const addToPackedDB = async () =>{
  await axios({
    method:'post',
    url:`${process.env.REACT_APP_BACKEND_BASE_URL}/productPackage`,
    data:data.orderData
  })
  .then((response)=>{
    console.log(response)
  })
  .catch((err)=>{
    console.log(err)
  })
}
const removeFromOrderDB = async () =>{
await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/orders/${data._id}`)
    .then((response)=>{
      history.push('/orders_list')
    })
    .catch((err)=>{
      console.log(err)
    })
}


    return(
        <>
        <div className="d-flex justify-content-center align-items-center">
        <CCard className="col-lg-8 col-md-8 col-12">
            <CCardHeader className="d-flex justify-content-lg-between align-items-center">
              <span>Order Details</span>
              <CButton type="submit" size="sm" color="primary" onClick={() => window.print()}><CIcon name="cil-scrubber"/>Print</CButton> 
              <CButton type="submit" size="sm" color="primary" onClick={packedHandler}><CIcon name="cil-scrubber"/>Packed</CButton> 
            </CCardHeader>
            <CCardBody>
              <CForm>
              <span className="font-weight-bold" style={{fontSize:'18px'}}>Product Details</span>
              <hr style={{borderBottom:'2px black solid'}} className="mb-4"/>
                {
                  data                   
                  ?
                  data.orderData.map((value,index)=>{
                    
                    
                    return(
                <CFormGroup>
                  <table style={{border:'1px black solid'}} className="col-12">
                  {
                      value.quantity && value.productSellingPrice
                      ?
                      <div style={{display:'none'}}>{totalAmount = totalAmount + value.quantity * value.productSellingPrice}</div>
                      :
                      ('')
                    }
                  {
                    value.imgName
                    ?
                    <tr className="font-weight-bold" style={{border:'1px black solid'}}> 
                    <td style={{fontSize:'18px',border:'1px black solid'}}>Product Image</td>
                    <td>
                    <img src={`http://localhost:5000/${value.imgName}`} style={{width:'100px',height:'100px'}} className="mt-2"/>
                    </td>
                    </tr>
                    : 
                    ('')
                  }
                  {
                    value._id
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>Product Id</td>
                      <td>
                      <CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value._id}</CFormText>
                      </td>
                    </tr>
                    : 
                    ('')
                  }
                  {
                    value.categoryName
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>Category Name</td>
                      <td>
                      <CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value.categoryName}</CFormText>
                      </td>
                    </tr>
                    : 
                    ('')
                  }
                  {
                    value.productName
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>Product Name</td>
                      <td>
                      <CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value.productName}</CFormText>
                      </td>
                    </tr>
                    : 
                    ('')
                  }
                  
                  {
                    value.productSellingPrice
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>Price Per Unit</td>
                      <td>
                      <CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value.productSellingPrice}</CFormText>
                      </td>
                    </tr>
                    : 
                    ('')
                  }
                  {
                    value.quantity
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>Quantity</td>
                      <td>
                      <CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value.quantity}</CFormText>
                      </td>
                    </tr>
                    : 
                    ('')
                  }
                  </table>                  
                </CFormGroup>
                    )
                  })
                  :
                  ('')
                }
                  <hr style={{borderTop:'2px black solid'}}/>
                <span className="font-weight-bold" style={{fontSize:'18px'}}>Delivery Address</span>
                {
                  data
                  ?
                  data.orderData.map((value,index)=>{
                    return(
                <CFormGroup>
                  <table style={{border:'1px black solid'}} className="col-12">
                  {
                    value.user_id
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>User ID</td>
                      <td><CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value.user_id}</CFormText></td>
                    </tr>
                    : 
                    ('')
                  }
                  {
                    value.user_fullName
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>User Full Name</td>
                      <td><CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value.user_fullName}</CFormText></td>
                    </tr>
                    : 
                    ('')
                  } 
                  {
                    value.user_email
                    ?
                    <tr style={{border:'1px black solid'}}>
                    <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>User Email</td>
                    <td><CFormText className="font-weight-bold"  style={{fontSize:'18px'}}>{value.user_email}</CFormText></td>
                    </tr>
                    : 
                    ('')
                  }
                  {
                    value.user_mobileNo
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>User Mobile Number</td>
                      <td><CFormText  className="font-weight-bold" style={{fontSize:'18px'}}>{value.user_mobileNo}</CFormText></td>
                    </tr>
                    : 
                    ('')
                  }
                  {
                    value.provinceNo
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>Province No</td>
                      <td><CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value.provinceNo}</CFormText></td>
                    </tr>
                    : 
                    ('')
                  }
                  {
                    value.municipilityName
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>Municipility Name</td>
                      <td><CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value.municipilityName}</CFormText></td>
                    </tr>
                    : 
                    ('')
                  }
                  {
                    value.wardNo
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>Ward Number</td>
                      <td><CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value.wardNo}</CFormText></td>
                    </tr>
                    : 
                    ('')
                  }
                  {
                    value.nearByPlace
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>Near By Place</td>
                      <td><CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value.nearByPlace}</CFormText></td>
                    </tr>
                    : 
                    ('')
                  }
                  {
                    value.street
                    ?
                    <tr style={{border:'1px black solid'}}>
                      <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>Street</td>
                    <td><CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{value.street}</CFormText></td>
                    </tr>
                    : 
                    ('')
                  }
                  </table>              
                </CFormGroup>
                    )
                  })
                  :
                  ('')
                }
                
                <hr style={{borderTop:'2px black solid'}}/>
                <table style={{border:'1px black solid'}} className="col-12">
                  <tr style={{border:'1px black solid'}}>
                    <td className="font-weight-bold" style={{fontSize:'18px',border:'1px black solid'}}>Total Amount</td>
                    <td><CFormText className="font-weight-bold" style={{fontSize:'18px'}}>{totalAmount}</CFormText></td>
                  </tr>
                </table>
                <hr style={{borderTop:'2px black solid'}}/>


              </CForm>
            </CCardBody>
          </CCard>
          </div>
        </>
    )
}
export default EditOrders