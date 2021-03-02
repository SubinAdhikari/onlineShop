import React, { useEffect, useState } from 'react';
import {Tab,Row,Col,Nav} from 'react-bootstrap';
import img from '../../assets/images/SubinAdhikari.jpg';
import PersonalInfo from '../profilePageComponents/PersonalInfo';
var jwt = require('jsonwebtoken');


const ProfilePage = () =>{
    const [userState,setUserState]=useState({
        id:'',
        email:'',
        fullName:'',
        mobileNo:'',
        password:''
    })
    useEffect(()=>{
        if(!localStorage.getItem('AccessToken')){
            window.location.href='/'
        }else{
        const accessToken = localStorage.getItem('AccessToken');
        jwt.verify(accessToken, process.env.REACT_APP_JWT_KEY , function(err, decoded) {
            if(err){
               localStorage.removeItem('AccessToken');
               return;
            }else{
                const {_id,email,fullName,mobileNo,password} = decoded;
                setUserState({
                    id:_id,
                    email,
                    fullName,
                    mobileNo,
                    password,
                });
            }
          });
        }
    },[])
    return(
        <>
        <div className="container-fluid">
            <div className="row d-flex justify-content-center align-items-center p-2">
                <div className="col-lg-12 col-md-12 col-12 profilePageMainDiv">
                <Tab.Container id="left-tabs-example" defaultActiveKey="personalInfo">
                    <Row>
                        <Col sm={3} className="d-flex flex-column justify-content-center align-items-center">
                            <div className="profileImage d-flex justify-content-center align-items-center mt-2">
                                <img
                                src={img}
                                className="img-fluid"
                                loading="lazy"
                                />
                            </div>
                        <Nav variant="pills" className="flex-column mt-2">
                            <Nav.Item>
                            <Nav.Link eventKey="personalInfo" >Personal Info</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="myOrders" >My Orders</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9} className="pt-2 d-flex align-items-center">
                        <Tab.Content className="w-100">
                            <Tab.Pane eventKey="personalInfo">
                                <PersonalInfo data={userState}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="myOrders">
                            <span>My Orders</span>
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
                </div>
            </div>
        </div>
        </>
    )
}
export default ProfilePage;