import React,{useState,useEffect} from 'react';
import {
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


const fields = ['fullName', 'email', 'password','contactNo','address','status']

const AdminList = () =>{

  const [adminData,setAdminData]=useState();

  useEffect(()=>{
    getAdminList();
  },[])

  const getAdminList = async () =>{
    await axios({
      method:'get',
      url:`${process.env.REACT_APP_BACKEND_BASE_URL}/admin`
    })
    .then((response)=>{
      setAdminData(response.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

    return(
        <>
        <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Admin List Table
            </CCardHeader>
            <CCardBody>
            <CDataTable
              items={adminData}
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
                    <>
                    <td>
                      <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Edit</CButton> 
                    </td>
                    <td>
                      <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Delete</CButton>
                    </td>
                    </>
                  )
              }}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
        </>
    )
}
export default AdminList;