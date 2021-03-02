import React from 'react';

import {
    CToast,
    CToastBody,
    CToastHeader,
    CToaster,
  } from '@coreui/react'

const ToastMessage = ({bgColor,heading,message}) =>{
    return(
        <>
         <CToaster position="bottom-right">
            <CToast show={true}>
              <CToastHeader style={{background:bgColor,color:'white'}}>{heading}</CToastHeader>
                <CToastBody style={{background:bgColor,color:'white'}}>{message}</CToastBody>
            </CToast>
        </CToaster>
        </>
    )
}
export default ToastMessage;