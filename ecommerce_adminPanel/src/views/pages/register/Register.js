import React,{useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ToastMessage from 'src/views/customComponents/ToastMessage'
import axios from 'axios'

const Register = () => {
  const [state,setState]=useState({
        fullName:'',
        email:'',
        password:'',
        contactNo:'',
        address:'',
  })
  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage]=useState('');

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
    // console.log(state)
    await axios({
      method:'post',
      url:`${process.env.REACT_APP_BACKEND_BASE_URL}/admin`,
      data:state
    })
    .then((response)=>{
      // console.log(response)
      if(response.data.validationError){
        setErrorMessage(response.data.validationError.message);
        setTimeout(()=>{
          setErrorMessage(false)
          },5000)
      }else{
      setSuccessMessage('Registred Successfully')
      setTimeout(()=>{
      setSuccessMessage(false)
      },5000)
      }
      setState({
        fullName:'',
        email:'',
        password:'',
        contactNo:'',
        address:'',
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Full Name" autoComplete="Full Name" name="fullName" value={state.fullName} onChange={changeHandler} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="email" placeholder="Email" autoComplete="email" name="email" value={state.email} onChange={changeHandler}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password" name="password" value={state.password} onChange={changeHandler}/>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Contact Number" autoComplete="contactNo" name="contactNo" value={state.contactNo} onChange={changeHandler}/>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Address" autoComplete="addrress" name="address" value={state.address} onChange={changeHandler}/>
                  </CInputGroup>
                  <CButton color="success" block onClick={submitHandler}>Create Account</CButton>
                </CForm>
              </CCardBody>
              {/* <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter> */}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
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

export default Register
