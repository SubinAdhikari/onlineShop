import React,{useState,useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import axios from 'axios'
import ToastMessage from '../../customComponents/ToastMessage';
var jwt = require('jsonwebtoken');


const Login = () => {
  const history = useHistory();
  const [state,setState]=useState({
    email:'',
    password:''
  })
  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage]=useState('');
  const [redirectionState,setRedirectionState]=useState(false)

  useEffect(()=>{
    checkLocalStorage();
  },[redirectionState])

  const checkLocalStorage = () =>{
    // if(localStorage.getItem('AdminData')){
    //   history.push('/')
    // }
    const getToken = localStorage.getItem('AdminToken')
    jwt.verify(getToken, process.env.REACT_APP_JWT_TOKEN , function(err, decoded) {
      if(err){
         localStorage.removeItem('AdminToken');
          return;
      }else{
          // const {id,email,fullName,mobileNo} = decoded;
          history.push('/')
      }
    });

  }

  const changeHandler = (e) =>{
    const {name,value} = e.target;

    setState((prevValue)=>{
      setSuccessMessage('')
      setErrorMessage('')
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
      url:`${process.env.REACT_APP_BACKEND_BASE_URL}/admin/auth`,
      data:state
    })
    .then((response)=>{
      if(response.data.validationError){
        setErrorMessage(response.data.validationError.message);
        setTimeout(()=>{
          setErrorMessage(false)
          },5000)
      }else{
        const {_id,fullName,email,password,contactNo,address} = response.data
        var token = jwt.sign({_id,fullName,email,password,contactNo,address}, process.env.REACT_APP_JWT_TOKEN, { expiresIn: '1h' });
        localStorage.setItem('AdminToken',token)
        setRedirectionState(true)
        setSuccessMessage('Login Successful')
        setTimeout(()=>{
        setSuccessMessage(false)
        },5000)
      }
      setState({
        email:'',
        password:'',
      })
    }).catch((err)=>{
      console.log(err)
    })
  }
  return (
    <>
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Email" autoComplete="Email" name="email" value={state.email} onChange={changeHandler} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" name="password" value={state.password} onChange={changeHandler}/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" onClick={submitHandler}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
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

export default Login
