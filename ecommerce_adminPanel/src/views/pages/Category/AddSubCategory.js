import React, { useState, useEffect } from 'react';
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


const AddSubCategory = () =>{
  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage]=useState('');
  const [categoryList,setCategoryList]=useState('');

  useEffect(()=>{
    getAllCategories();
  },[])


  const getAllCategories = async () =>{
    await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/categories`)
    .then((response)=>{
        setCategoryList(response.data)
        // console.log(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const [state,setState]=useState({
        categoryName:'',
        subCategoryName:'',
        subCategorySlug:'',
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
      url:`${process.env.REACT_APP_BACKEND_BASE_URL}/subCategories`,
      data:state
    })
    .then((response)=>{
      if(response.data.validationError){
        setErrorMessage(response.data.validationError.message);
        setTimeout(()=>{
          setErrorMessage(false)
          },5000)
      }else{
      setSuccessMessage('Sub Category Added Successfully')
      setTimeout(()=>{
      setSuccessMessage(false)
      },5000)
      }
      setState({
        categoryName:'',
        subCategoryName:'',
        subCategorySlug:'',
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
                    <CLabel htmlFor="ccmonth">Category</CLabel>
                    <CSelect custom id="ccmonth" name="categoryName" value={state.categoryName} onChange={changeHandler}>
                      <option value="">Choose Category</option>
                      {
                          categoryList
                          ?
                          categoryList.map((data,index)=>{
                              return(
                                <option key={index} value={data.categoryName}>{data.categoryName}</option>
                                )
                          })
                          :
                          <option value="">No Data</option>
                      }
                    </CSelect>
                  </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-subCategoryName">SubCategory Name</CLabel>
                  <CInput type="text" id="nf-subCategoryName" name="subCategoryName" value={state.subCategoryName} onChange={changeHandler} placeholder="Enter Category Name.."/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-subCategorySlug">SubCategory Slug</CLabel>
                  <CInput type="text" id="nf-subCategorySlug" name="subCategorySlug" value={state.subCategorySlug} onChange={changeHandler} placeholder="Enter SubCategory Slug.."/>
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
export default AddSubCategory