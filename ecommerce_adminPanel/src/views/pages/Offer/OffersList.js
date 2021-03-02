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



const fields = ['desc','imgName','placement','status']

const OffersList = () =>{
  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage]=useState('');

  const [productData,setProductData]=useState();

  useEffect(()=>{
    getProductList();
  },[])

  const getProductList = async () =>{
    await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/offers`)
    .then((response)=>{
      setProductData(response.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const deleteProduct = async (_id) =>{
    await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/offers/${_id}`)
    .then((response)=>{
        if(response.data){
        setSuccessMessage('Product Deleted Successfully.Rediricting please wait....')
        setTimeout(()=>{
        setSuccessMessage(false)
        window.location.href="/"
        },5000)
      }
    })
    .catch((err)=>{
      console.log(err);
      setErrorMessage('Error Deleting Product.Please Try again later..');
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
              Offers List Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={productData}
              fields={fields}
              tableFilter
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'status':
                  (item)=>(
                    <td>
                    <td>
                    <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Edit</CButton> 
                  </td>
                  <td>
                    <CButton type="reset" size="sm" color="danger" onClick={()=>deleteProduct(item._id)}><CIcon name="cil-ban" /> Delete</CButton>
                  </td>
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
export default OffersList;