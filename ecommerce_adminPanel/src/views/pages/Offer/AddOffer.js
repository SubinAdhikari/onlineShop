import React, { useState,useEffect } from 'react';
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
  import axios from 'axios'
  import ToastMessage from '../../customComponents/ToastMessage'
  import { useHistory } from 'react-router-dom';




const AddOffer = () =>{
  const history = useHistory();
  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage]=useState('');
  const [state,setState]=useState({
    desc:'',
    imgName:'',
    placement:'',
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


  const uploadImageHandler = async (e) =>{
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("imageName", file);
    try {
        const res = await axios.post(
          `http://localhost:5000/uploads`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const image_New_Name = res.data
        
        setState((prevValue)=>{
            return{
                ...prevValue,
                imgName:image_New_Name
            }
        })

      } catch (error) {
        console.error(error);
      }
  }


  const submitHandler = async () =>{
    await axios({
      method:'post',
      url:`${process.env.REACT_APP_BACKEND_BASE_URL}/offers`,
      data:state
    })
    .then((response)=>{
      if(response.data.validationError){
        setErrorMessage(response.data.validationError.message);
        setTimeout(()=>{
          setErrorMessage(false)
          },5000)
      }else{
      setSuccessMessage('offers Added Successfully')
      setTimeout(()=>{
      setSuccessMessage(false)
      history.push('/')
      },5000)
      }
      setState({
        desc:'',
        imgName:'',
        placement:'',
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
              Add Carousal
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
              
                <CFormGroup>
                  <CLabel htmlFor="nf-name">Description</CLabel>
                  <CInput type="text" id="nf-name" name="desc" value={state.desc} onChange={changeHandler} placeholder="Enter Image Description.." autoComplete="off"/>
                </CFormGroup>

                <CFormGroup>
                  <CLabel htmlFor="nf-name">Image Name</CLabel>
                  <CInput type="text" id="nf-cp" name="imgName" value={state.imgName} readOnly/>
                </CFormGroup>

                <CFormGroup>
                  <CLabel htmlFor="nf-email">Image</CLabel>
                  <CInput
                    type="file"
                    onChange={uploadImageHandler}
                    accept="image/*"
                  />
                </CFormGroup>

                <CFormGroup>
                    <CLabel htmlFor="ccmonth">Placement</CLabel>
                    <CSelect custom id="ccmonth" name="placement" value={state.placement} onChange={changeHandler}>
                        <option value="">Choose Placement</option>
                        <option  value="slider_ads">Slider Advertisment</option>
                        <option  value="row_1">Row First</option> 
                        <option  value="row_2">Row Second</option>                           
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
export default AddOffer