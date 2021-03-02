import React, { useState } from 'react';
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
    CSelect,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import ToastMessage from '../../customComponents/ToastMessage'
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const AddCategory = () =>{
  const history = useHistory();
  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage]=useState('');

  const [state,setState]=useState({
        categoryName:'',
        categorySlug:'',
        status:'active',
  })

  const changeHandler = (e) =>{
    const {name,value} = e.target;

    setState((prevValue)=>{
      return{
        ...prevValue,
        [name]:value
      }
    })
  }

  const submitHandler = async () =>{
    // console.log(state);
    await axios({
      method:'post',
      url:`${process.env.REACT_APP_BACKEND_BASE_URL}/categories`,
      data:state
    })
    .then((response)=>{
      if(response.data.validationError){
        setErrorMessage(response.data.validationError.message);
        setTimeout(()=>{
          setErrorMessage(false)
          },5000)
      }else{
      setSuccessMessage('Category Added Successfully')
      setTimeout(()=>{
      setSuccessMessage(false)
      history.push('/category_list')
      },5000)
      }
      setState({
        categoryName:'',
        categorySlug:'',
        status:'active',
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

    return(
        <>
        <div className="d-flex justify-content-center align-items-center">
        <CCard className="col-lg-8 col-md-8 col-12">
            <CCardHeader>
              Add Category
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                  <CLabel htmlFor="nf-category">Category Name</CLabel>
                  <CInput type="text" id="nf-category" name="categoryName" value={state.categoryName} onChange={changeHandler} placeholder="Enter Category Name.."/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-categorySlug">Category Slug</CLabel>
                  <CInput type="text" id="nf-categorySlug" name="categorySlug" value={state.categorySlug} onChange={changeHandler} placeholder="Enter Category Slug.."/>
                </CFormGroup>
                {/* <CFormGroup>
                  <CLabel htmlFor="nf-subCategoryName">SubCategory Name</CLabel>
                  <CInput type="text" id="nf-subCategoryName" name="subCategoryName" value={state.subCategoryName} onChange={changeHandler} placeholder="Enter Category Name.."/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-subCategorySlug">SubCategory Slug</CLabel>
                  <CInput type="text" id="nf-subCategorySlug" name="subCategorySlug" value={state.subCategorySlug} onChange={changeHandler} placeholder="Enter SubCategory Slug.."/>
                </CFormGroup> */}
                <CFormGroup>
                    <CLabel htmlFor="ccmonth">Status</CLabel>
                    <CSelect custom id="ccmonth" name="status" value={state.status} onChange={changeHandler}>
                      <option value="active">Active</option>
                      <option value="disable">Disable</option>
                    </CSelect>
                  </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={submitHandler}><CIcon name="cil-scrubber"/> Submit</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          </div>

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
export default AddCategory