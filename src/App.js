import React from 'react';
import CartContextProvider from './components/context/CartContext/CartContextProvider';
import LoginContext from './components/context/HeaderContext/LoginContext';
import SignUpContext from './components/context/HeaderContext/SignUpContext';
import Footer from './components/includes/Footer';
import Header from './components/includes/Header';
import { BrowserRouter} from 'react-router-dom';
import DealsOfTheDayContextProvider from './components/context/APIContext/DealsOfTheDayContextProvider';
import FurnitorsBestSellerContextProvider from './components/context/APIContext/FurnitorsBestSellerContextProvider';
import OfferContextProvider from './components/context/OfferContext/OfferContextProvider';


const App = () =>{
  return(
    <LoginContext>
      <SignUpContext>
        <CartContextProvider>
          <DealsOfTheDayContextProvider>
            <FurnitorsBestSellerContextProvider>
              <OfferContextProvider>
                <BrowserRouter>
                  <Header/>
                  <Footer/>
                </BrowserRouter>
              </OfferContextProvider>
            </FurnitorsBestSellerContextProvider>
            </DealsOfTheDayContextProvider>
        </CartContextProvider>
      </SignUpContext>
    </LoginContext>
  )
}
export default App;