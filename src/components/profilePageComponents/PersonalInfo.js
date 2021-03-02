import axios from 'axios';
import React,{useEffect, useState} from 'react';
import {Form,Col,Row, Button} from 'react-bootstrap'

const PersonalInfo = ({data}) =>{
    const [notEditable,setNotEditable]=useState(true);

    const [state,setState]=useState({
        id:'',
        email:'',
        fullName:'',
        mobileNo:'',
        password:''
    }) 

     useEffect(()=>{
        setState({
            id:data.id,
            email:data.email,
            fullName:data.fullName,
            mobileNo:data.mobileNo,
            password:data.password
        })
    },[data])

    const changeHandler = (e) =>{
        const {name,value} = e.target;

        setState((prevValue)=>{
            return{
                ...prevValue,
                [name]:value
            }
        })

    }
    const [updateErrorMsg,setUpdateErrMsg]=useState('');
    const [updateSuccessMsg,setUpdateSuccessMsg]=useState('');

    const updateHandler = async () =>{
// alert(`Updated data are : Email is ${state.email}, fullName is ${state.fullName}, mobile is : ${state.mobileNo}, and password is :${state.password}`)
        await axios.patch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/${state.id}`,state)
        .then((response)=>{
            if(response.data.validationError){
                setUpdateErrMsg(response.data.validationError.message); 
            }else{
                setUpdateSuccessMsg('Updated Successfully');
                localStorage.removeItem('AccessToken');
                window.location.href="/"
                // console.log(response)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
}
    return(
        <>
        <Form>
            {
                updateErrorMsg
                ?
                <span style={{color:'red'}}>* {updateErrorMsg}</span>
                :
                updateSuccessMsg
                ?
                <span style={{color:'yellowgreen'}}>* {updateSuccessMsg}</span>
                :
                ('')
            }
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                Email
                </Form.Label>
                <Col sm="6">
                <Form.Control type="text" placeholder="Email" name="email" value={state.email} readOnly/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextFN">
                <Form.Label column sm="2">
                Full Name
                </Form.Label>
                <Col sm="6">
                <Form.Control type="text" name="fullName" value={state.fullName} onChange={changeHandler} readOnly={notEditable}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextMN">
                <Form.Label column sm="2">
                Mobile Number
                </Form.Label>
                <Col sm="6">
                <Form.Control type="text" placeholder="Mobile Number" name="mobileNo" value={state.mobileNo} onChange={changeHandler} readOnly={notEditable}/>
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextMN">
                <Form.Label column sm="2">
                Password
                </Form.Label>
                <Col sm="6">
                <Form.Control type="password" placeholder="Password" name="password" value={state.password} onChange={changeHandler} readOnly={notEditable}/>
                </Col>
            </Form.Group>
        </Form>
        {
         !notEditable
         ?
         <div className="col-12">
            <Button variant="success" className="mr-1"
            onClick={updateHandler}
            >Update
            </Button>

            <Button variant="danger"
            onClick={()=>window.location.href='/profile'}
            >Cancel
            </Button>
        </div>
         :
        <div className="col-12">
            <Button variant="primary"
            onClick={()=>setNotEditable(false)}
            >Edit</Button>
        </div>
        }
        </>
    )
}
export default PersonalInfo;