import React,{useState,useEffect} from 'react';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'


  import axios from 'axios';
  import ToastMessage from '../../customComponents/ToastMessage';


const fields = ['categoryName','categorySlug', 'status','action']

const CategoryList = () =>{

  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage]=useState('');
  
  const [categoryData,setCategoryData]=useState();

  useEffect(()=>{
    getCategoryList();
  },[])

  const getCategoryList = async () =>{
    await axios({
      method:'get',
      url:`${process.env.REACT_APP_BACKEND_BASE_URL}/categories`
    })
    .then((response)=>{
      setCategoryData(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const deleteCategoryHandler = async (id) =>{
    // alert(`ID is : ${id}`)
    await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/categories/${id}`)
    .then((response)=>{
      if(response.data){
        setSuccessMessage('Category Deleted Successfully.Rediricting please wait....')
        setTimeout(()=>{
        setSuccessMessage(false)
        window.location.href="/"
        },5000)
      }
    }).catch((err)=>{
      console.log(err);
      setErrorMessage('Error Deleting Category.Please Try again later..');
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
              Combined All Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={categoryData}
              fields={fields}
              tableFilter
              hover
              striped
              bordered
              size="sm"
              itemsPerPage={10}
              pagination
              scopedSlots = {{
                'action':
                  (item)=>(
                    <td>
                      <td>
                      <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Edit</CButton> 
                    </td>
                    <td>
                      <CButton type="reset" size="sm" color="danger" onClick={()=>deleteCategoryHandler(item._id)}><CIcon name="cil-ban" /> Delete</CButton>
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
export default CategoryList;