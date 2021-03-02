import React,{useState,useEffect} from 'react';
import {
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

const fields = ['fullName', 'email','mobileNo','password','status']

const UserList = () =>{
  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage]=useState('');


  const [userData,setUserData]=useState();

  useEffect(()=>{
    getUserList();
  },[])

  const getUserList = async () =>{
    await axios({
      method:'get',
      url:`${process.env.REACT_APP_BACKEND_BASE_URL}/user`
    })
    .then((response)=>{
      setUserData(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const deleteProduct = async (_id) =>{
    await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/${_id}`)
    .then((response)=>{
        if(response.data){
        setSuccessMessage('User Deleted Successfully.Rediricting please wait....')
        setTimeout(()=>{
        setSuccessMessage(false)
        window.location.href="/"
        },5000)
      }
    })
    .catch((err)=>{
      console.log(err);
      setErrorMessage('Error Deleting User.Please Try again later..');
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
              User List Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={userData}
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
                    <CButton type="reset" size="sm" color="danger" onClick={()=>deleteProduct(item._id)}><CIcon name="cil-ban" /> Delete</CButton>
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
export default UserList;