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




const AddProduct = () =>{
  const history = useHistory();
  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage]=useState('');
  const [state,setState]=useState({
    categoryName:'',
    subCategoryName:'',
    productName:'',
    productCostPrice:'',
    productSellingPrice:'',
    description:'',
    imgName:'',
    totalInventry:''
  })
  const [categoryList,setCategoryList] = useState();
  const [subCategoryList,setSubCategoryList]=useState([]);
  const [categorySlug,setCategorySlug]=useState();


  useEffect(()=>{
    getCategory();
    getSubCategory();
    // getSubCategory();
    // getCategorySlug();
  },[state])

  const getCategory = async () =>{
    await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/categories`)
    .then((response)=>{
        setCategoryList(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  const changeHandler = (e) =>{
    const {name,value} = e.target;
    setState((prevValue)=>{
      return{
        ...prevValue,
        [name]:value
      }
    })
  }

  const getSubCategory = async () =>{
    await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/categories/${state.categoryName}`)
    .then((response)=>{
      setSubCategoryList(response.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  

  // const getCategorySlug = async () =>{
  //   await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/categories/${state.categoryName}`)
  //   .then((response)=>{
  //     setCategorySlug(response.data[0].categorySlug)
  //     // console.log(response.data[0].categorySlug)
  //   })
  //   .catch((err)=>{
  //       console.log(err)
  //   })
  // }



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
      url:`${process.env.REACT_APP_BACKEND_BASE_URL}/product`,
      data:state
    })
    .then((response)=>{
      if(response.data.validationError){
        setErrorMessage(response.data.validationError.message);
        setTimeout(()=>{
          setErrorMessage(false)
          },5000)
      }else{
      setSuccessMessage('Product Added Successfully')
      setTimeout(()=>{
      setSuccessMessage(false)
      history.push('/')
      },5000)
      }
      setState({
        categoryName:'',
        subCategoryName:'',
        productName:'',
        productCostPrice:'',
        productSellingPrice:'',
        description:'',
        imgName:'',
        totalInventry:''
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
              Normal
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
              


                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">Category</CLabel>
                    <CSelect custom id="ccmonth" name="categoryName" value={state.categoryName} onChange={changeHandler}>
                      <option value="">Choose Category</option>
                      {
                          categoryList
                          ?
                          categoryList.map((data,index)=>{
                              return(
                                <option key={index} value={data.categoryName}>{data.categoryName}</option>
                                )
                          })
                          :
                          <option value="">No Data</option>
                      }
                    </CSelect>
                  </CFormGroup>

                      
                        {/* <CFormGroup>
                          <CLabel htmlFor="nf-name">Category Slug</CLabel>
                          <CInput type="text" id="nf-categorySlug" name="categorySlug" value={categorySlug}  readOnly/>
                        </CFormGroup> */}
                        
                  



                  <CFormGroup>
                    <CLabel htmlFor="ccmonth">Sub Category</CLabel>
                    <CSelect custom id="ccmonth" name="subCategoryName" value={state.subCategoryName} onChange={changeHandler}>
                      <option value="">Choose Sub Category</option>
                      {
                          subCategoryList
                          ?
                          subCategoryList.map((data,index)=>(
                            // console.log(data.dropdown)
                              
                              
                                data.dropdown.length !== 0
                                ?
                                <>
                                  {
                                    data.dropdown.map((item,index)=>(
                                      <option key={index} value={item.subCategoryName}>{item.subCategoryName}</option>
                                    ))
                                  }
                                {/* <option key={index} value={data.dropdown[0].subCategoryName}>{data.dropdown[0].subCategoryName}</option> */}
                                </>
                                :
                                <option>Sub Category Not Available</option>
                                
                  
                          ))
                          :
                          <option value="">No Data</option>
                      }
                    </CSelect>
                  </CFormGroup>


                  
                        {/* <CFormGroup>
                          <CLabel htmlFor="nf-name">Sub Category Slug</CLabel>
                          <CInput type="text" id="nf-subSlug" name="subCategorySlug" value={subCategorySlug}  readOnly/>
                        </CFormGroup> */}
                       

                  <CFormGroup>
                  <CLabel htmlFor="nf-name">Product Name</CLabel>
                  <CInput type="text" id="nf-name" name="productName" value={state.productName} onChange={changeHandler} placeholder="Enter Prdouct Name.." autoComplete="off"/>
                </CFormGroup>

                <CFormGroup>
                  <CLabel htmlFor="nf-name">Product Cost Price</CLabel>
                  <CInput type="text" id="nf-cp" name="productCostPrice" value={state.productCostPrice} onChange={changeHandler} placeholder="Enter Prdouct Cost Price.." autoComplete="off"/>
                </CFormGroup>

                <CFormGroup>
                  <CLabel htmlFor="nf-name">Product Selling Price</CLabel>
                  <CInput type="text" id="nf-cp" name="productSellingPrice" value={state.productSellingPrice} onChange={changeHandler} placeholder="Enter Prdouct Selling Price.." autoComplete="off"/>
                </CFormGroup>

                <CFormGroup>
                  <CLabel htmlFor="nf-name">Description</CLabel>
                  <CInput type="text" id="nf-cp" name="description" value={state.description} onChange={changeHandler} placeholder="Enter Prdouct description.." autoComplete="off"/>
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
                  <CLabel htmlFor="nf-name">Total Inventory</CLabel>
                  <CInput type="text" id="nf-cp" name="totalInventry" value={state.totalInventry} onChange={changeHandler} placeholder="Enter Total Inventory.." autoComplete="off"/>
                </CFormGroup>


                


                {/* <CFormGroup>
                  <CLabel htmlFor="nf-email">Email</CLabel>
                  <CInput type="email" id="nf-email" name="nf-email" placeholder="Enter Email.." autoComplete="email"/>
                  <CFormText className="help-block">Please enter your email</CFormText>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="nf-password">Password</CLabel>
                  <CInput type="password" id="nf-password" name="nf-password" placeholder="Enter Password.." autoComplete="current-password"/>
                  <CFormText className="help-block">Please enter your password</CFormText>
                </CFormGroup> */}
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
export default AddProduct