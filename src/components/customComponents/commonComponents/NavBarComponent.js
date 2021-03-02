import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, useHistory,withRouter } from 'react-router-dom';
import CartPage from '../../pages/CartPage';
import CategoryPage from '../../pages/CategoryPage';
import HomePage from '../../pages/HomePage';
import ProductPage from '../../pages/ProductPage';
import ProfilePage from '../../pages/ProfilePage';
import axios from 'axios';
import ActivateAccountPage from '../../pages/ActivateAccountPage';

const NavBarComponent = () =>{
    const history = useHistory()
    const [categoryState,setCategoryState]=useState();

    useEffect(()=>{
        getCategory();
    },[])

    const getCategory = async () =>{
        await axios({
            method:'get',
            url:`${process.env.REACT_APP_BACKEND_BASE_URL}/categories`
          })
          .then((response)=>{
            setCategoryState(response.data)
          })
          .catch((err)=>{
            console.log(err)
          })
    }


    const [classState,setClassState]=useState('collapse navbar-collapse');
    const [overlayClassState,setOverlayClassState]= useState('overlay')

    const hamburgerMenuClicked = () =>{
        classState === 'collapse navbar-collapse' ? setClassState('collapse navbar-collapse show') : setClassState('collapse navbar-collapse');
        overlayClassState === 'overlay' ? setOverlayClassState('openOverlay') : setOverlayClassState('overlay')
    }

    return(
        <>
        {/* <BrowserRouter> */}
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <button onClick={hamburgerMenuClicked} type="button" className="toggleButtonNavBar">
    <i className="fa fa-bars"></i>
  </button>

  <div className={classState} id="navbarSupportedContent">
      {
          categoryState
          ?
          categoryState.map((item,index)=>{
              return(
                <>
                {
                    item.status === 'active'
                    ?
                    <ul className="navbar-nav mr-auto" key={index}>
                    {
                    item.dropdown.length 
                    ?
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {item.categoryName}
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        {
                            item.dropdown.map((data,index)=>{
                                return(
                                    <div key={index} style={{cursor:'pointer'}}>
                                    <a className="dropdown-item" 
                                    onClick={()=>history.push({
                                        pathname:'/category',
                                        state: data.subCategoryName
                                    })}
                                    >{data.subCategoryName}</a>
                                    {/* <div className="dropdown-divider"></div> */}
                                    </div>
                                )
                            })
                        }
                        </div>
                        
                    </li>
                    :
                    <li className="nav-item">
                        <a className="nav-link" onClick={
                            ()=>history.push({
                                pathname:'/category',
                                state:item.categoryName 
                            })
                            }>{item.categoryName} 
                        </a>
                    </li>
                    }
                </ul>
                    :
                    ('')
                }
                </>
              )
          })
          :
          ('')
      }
  </div>
<div 
className={overlayClassState}
onClick={hamburgerMenuClicked}
></div>
</nav>


    <Route exact path="/" component={HomePage} />
    <Route exact path="/product/:productName" component={ProductPage} />
    <Route exact path="/cart" component={CartPage}/>
    <Route exact path="/category" component={CategoryPage}/>
    <Route exact path="/profile" component={ProfilePage}/>
    <Route exact path="/activate_account/:token" component={ActivateAccountPage}/>


{/* </BrowserRouter> */}
        </>
    )
}
export default withRouter(NavBarComponent);