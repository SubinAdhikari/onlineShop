import React, { useState,useEffect } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'
var jwt = require('jsonwebtoken');


const TheHeaderDropdown = () => {
  const history = useHistory();
  const [redirectState,setRedirectState]=useState(false);
  const [state,setState]=useState({
    _id:'',
    email:'',
    fullName:'',
    password:'',
    contactNo:'',
    address:''
  })

  useEffect(()=>{
    // if(!localStorage.getItem('AdminToken')){
    //  history.push('/login')
    // }
    const getToken = localStorage.getItem('AdminToken')
    jwt.verify(getToken, process.env.REACT_APP_JWT_TOKEN , function(err, decoded) {
      if(err){
        localStorage.removeItem('AdminToken');
        history.push('/login')
          return;
      }else{
          const {_id,fullName,email,password,contactNo,address} = decoded;
          setState({
            _id,
            email,
            fullName,
            password,
            contactNo,
            address
          })
      }
    });
  },[redirectState])

  const logOutHandler = () =>{
    localStorage.removeItem('AdminToken');
    setRedirectState(true);
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
      <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2"/>{state.email}
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2"/>Edit Profile
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={logOutHandler}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
