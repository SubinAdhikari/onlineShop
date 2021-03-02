import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import CategoryPageCard from '../customComponents/categoryPage/CategoryPageCard';
import {realData} from '../Datas/ProductData';
import Pagination from '../customComponents/commonComponents/Pagination';
import axios from 'axios'
import ProductNotAvailable from '../customComponents/commonComponents/ProductNotAvailable';
import LoadingSpinner from '../customComponents/commonComponents/LoadingSpinner';


const CategoryPage = () =>{
    const location = useLocation();
    const [loading,setLoading]=useState(true)

    // const [categoryName,setCategoryName]=useState();
    const [productData,setProductData]= useState();

    
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/product/${location.state}`)
        .then((response)=>{
            setProductData(response.data)
            setLoading(false)
        })
        .catch((err)=>{
            console.log(err)
            setLoading(false)
        })

    },[location.state])


    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

//   // Get current product
  const indexOfLastProduct = currentPage * postsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - postsPerPage;
  const currentProduct = productData ? productData.slice(indexOfFirstProduct, indexOfLastProduct) : realData.slice(indexOfFirstProduct, indexOfLastProduct);
//     // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // FILTER Handler
    const [searchProduct, setSearchProduct] = useState("");

    const searchProductHandler = (event) => {
        setSearchProduct(event.target.value);
      };

    const filterHandler =
        productData &&
        productData.filter((product) => {
        return (
            product.productName.toLowerCase().indexOf(searchProduct.toLowerCase()) !== -1
        );
    });


    return(
        <>
        {
            productData && productData.length !== 0
            ?
            <>
            <div className="container-fluid categoryHeroSection mb-4">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-12 d-flex flex-column justify-content-center align-items-center  InnerDiv">
                    <span className="heroTitle">{location.state}</span>
                </div>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row">
                <div className="col-12 mb-4 filterMainDiv d-flex justify-content-lg-between align-items-center ">
                    <div className="col-lg-3 col-md-3 col-12  inputMainDiv p-0">
                        <input className="px-2" type="text" name="searchProduct" placeholder="Search Here..." value={searchProduct} onChange={searchProductHandler}/>
                        <i className="fa fa-search"></i>
                    </div>
                </div>
            </div>
        </div>

        <div className="container-fluid categoryPageMain">
            <div className="row">
                <div className="col-lg-12 col-md-12 col-12 d-flex  p-0 rowMain ">
                    <div className="col-lg-12 col-md-12 col-12 productCardMain d-flex flex-wrap p-0 mt-lg-0 mt-2">
                        {
                            searchProduct
                            ?
                                filterHandler.length >0 
                                ?
                                <CategoryPageCard products={filterHandler}/>
                                :
                                <ProductNotAvailable/>
                            :
                            <CategoryPageCard products={currentProduct}/>
                        }
                    </div>
                </div>
            </div>
        </div>
        <Pagination
            postsPerPage={postsPerPage}
            totalPosts={productData.length}
            paginate={paginate}
        />
            </>
            :
            loading
            ?
            <LoadingSpinner/>
            :
            <ProductNotAvailable/>
        }
        
        </>
    )
}
export default CategoryPage;