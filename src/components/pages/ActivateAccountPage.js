import React,{useState,useEffect} from 'react';
import LoadingSpinner from '../customComponents/commonComponents/LoadingSpinner';
import success from '../../assets/success.png';
import failed from '../../assets/failed.png'
import {useParams} from 'react-router-dom';
import axios from 'axios'


const ActivateAccountPage = () =>{

    const token = useParams();
    const [successMsg,setSuccessMsg]=useState(false);
    const [failedMsg,setFailedMsg]=useState(false);
    const [messageResponse,setMessageResponse] = useState('');


    useEffect(async ()=>{
        await axios({
            method:'POST',
            url: `${process.env.REACT_APP_BACKEND_BASE_URL}/register/activate`,
            data: token,
        })
        .then(response =>{
            console.log(response)
            if(response.data.errorMessage){
                setMessageResponse(response.data.errorMessage.errors)
                setFailedMsg(true);
            }else{
                setSuccessMsg(true);
            }
        })
          .catch(err =>{
              console.log(err)
          })
    },[])

    return(
        <>
        {
            successMsg === false && failedMsg === false
            ?
            <LoadingSpinner/>
            :
            successMsg === true 
            ?
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                        <img src={success} className="img-fluid mb-3" style={{width:'100px', height:'100px'}}/>
                        <span className="text-center" style={{fontSize:'20px', color:'green', fontWeight:'bold'}}>Activated Succesfully. Proceed to login...</span>
                    </div>
                </div>
            </div>
            :
            failedMsg === true
            ?
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                        <img src={failed} className="img-fluid  mb-3" style={{width:'100px', height:'100px'}}/>
                        <span className="text-center" style={{fontSize:'20px', color:'red', fontWeight:'bold'}}>{messageResponse}.Please Register again...</span>
                    </div>
                </div>
            </div>            :
            ('')
        }
        </>
    )
}
export default ActivateAccountPage;