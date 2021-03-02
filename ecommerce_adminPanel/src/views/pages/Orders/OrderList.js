import React, { useEffect, useState } from 'react';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton
  } from '@coreui/react'
import axios from 'axios';
import CIcon from '@coreui/icons-react'
import ToastMessage from '../../customComponents/ToastMessage';
import {useHistory } from 'react-router-dom';




const fields = ['_id','status']

const OrderList = () =>{
  const history = useHistory();
  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage]=useState('');

  const [orderState,setOrdersState]=useState();


  useEffect(()=>{
    getOrdersList();
  },[])

  const getOrdersList = async () =>{
    await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/orders`)
    .then((response)=>{
      setOrdersState(response.data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const deleteProduct = async (_id) =>{
    await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/orders/${_id}`)
    .then((response)=>{
        if(response.data){
        setSuccessMessage('Orders Deleted Successfully.Rediricting please wait....')
        setTimeout(()=>{
        setSuccessMessage(false)
        window.location.href="/"
        },2000)
      }
    })
    .catch((err)=>{
      console.log(err);
      setErrorMessage('Error Deleting Orders.Please Try again later..');
        setTimeout(()=>{
          setErrorMessage(false)
          },5000)
    })
  }



    return(
        <>
        <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Orders List Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={orderState}
              fields={fields}
              tableFilter
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'orderData':(item)=>(
                  <span>{JSON.stringify(item)}</span>
                ),
                'status':
                  (item)=>(
                    <td>
                    <td>
                    <CButton type="submit" size="sm" color="primary"
                    onClick={()=>history.push({
                      pathname:'/edit_orders',
                      state: item
                  })}
                    ><CIcon name="cil-scrubber"/>View</CButton> 
                  </td>
                  {/* <td>
                    <CButton type="reset" size="sm" color="danger" onClick={()=>deleteProduct(item._id)}><CIcon name="cil-ban" /> Delete</CButton>
                  </td> */}
                  </td>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {
      errorMessage
      ?
      <ToastMessage bgColor="#ca0b00" heading="Error Message" message={errorMessage}/>
      :
      successMessage 
      ?
      <ToastMessage bgColor="#26994D" heading="Success Message" message={successMessage}/>
      :
      ('')
    }

        </>
    )
}
export default OrderList;