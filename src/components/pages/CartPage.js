import React from 'react';
import { Helmet } from 'react-helmet';
import InvoiceComponent from '../cartPageComponents/InvoiceComponent';
import ItemListComponents from '../cartPageComponents/ItemListComponents';

const CartPage = () =>{
    return(
        <>
        <Helmet>
            <title>Shopping Cart | Flipkart.com</title>
        </Helmet>
       <div className="container-fluid">
           <div className="row">
                <ItemListComponents/>
                <InvoiceComponent/>
           </div>
        </div>    
        </>
    )
}
export default CartPage;