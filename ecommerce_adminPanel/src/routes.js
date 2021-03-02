import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

// CUSTOMS

// 1. carousal
const CarousalList = React.lazy(() => import('./views/pages/Carousal/CarousalList'));
const AddCarousal = React.lazy(() => import('./views/pages/Carousal/AddCarousal'));

// 1. Offer
const OfferList = React.lazy(() => import('./views/pages/Offer/OffersList'));
const AddOffer = React.lazy(() => import('./views/pages/Offer/AddOffer'));

// 1.Admin
const AddAdmin = React.lazy(() => import('./views/pages/Admin/AddAdmin'));
const AdminList = React.lazy(() => import('./views/pages/Admin/AdminList'));
const EditAdmin = React.lazy(() => import('./views/pages/Admin/EditAdmin'));

// 2.User
const UserList = React.lazy(() => import('./views/pages/User/UserList'));

// 3. Category
const CategoryList = React.lazy(() => import('./views/pages/Category/CategoryList'));
const AddCategory = React.lazy(() => import('./views/pages/Category/AddCategory'));
const AddSubCategory = React.lazy(() => import('./views/pages/Category/AddSubCategory'));

// 4. Product
const ProductList = React.lazy(() => import('./views/pages/Product/ProductList'));
const AddProduct = React.lazy(() => import('./views/pages/Product/AddProduct'));

// 5. Orders
const OrderList = React.lazy(() => import('./views/pages/Orders/OrderList'));
const EditOrders = React.lazy(() => import('./views/pages/Orders/EditOrders'));
const PackedList = React.lazy(() => import('./views/pages/Orders/PackedProductList'));
const EditPackedProduct = React.lazy(() => import('./views/pages/Orders/EditPackedProduct'));

// 6. Delivered
const DeliveredProductList = React.lazy(() => import('./views/pages/Delivered/DeliveredList'));
const ViewDeliveredDetails = React.lazy(() => import('./views/pages/Delivered/ViewDeliveredDetails'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  // CUSTOMS

  //Carousal
  { path: '/carousal_list', exact: true, name: 'Carousal List', component: CarousalList },
  { path: '/add_Carousal', exact: true, name: 'Add Carousal', component: AddCarousal },

   //Offers
   { path: '/offer_list', exact: true, name: 'Offer List', component: OfferList },
   { path: '/add_offer', exact: true, name: 'Add Offer', component: AddOffer },


  // admin
  { path: '/add_admin', exact: true, name: 'Add Admin', component: AddAdmin },
  { path: '/admin_list', exact: true, name: 'Admin List', component: AdminList },
  { path: '/edit_admin', exact: true, name: 'Admin List', component: EditAdmin },

  // User
  { path: '/user_list', exact: true, name: 'User List', component: UserList },

  // Category
  { path: '/add_category', exact: true, name: 'Add Category', component: AddCategory },
  { path: '/category_list', exact: true, name: 'Category List', component: CategoryList },
  { path: '/add_subCategory', exact: true, name: 'Add Sub Category', component: AddSubCategory},


  // Product
  { path: '/add_product', exact: true, name: 'Add Product', component: AddProduct },
  { path: '/product_list', exact: true, name: 'Product List', component: ProductList },

  // Orders
  { path: '/orders_list', exact: true, name: 'Product List', component: OrderList },
  { path: '/edit_orders', exact: true, name: 'Edit Product', component: EditOrders },
  { path: '/packed_product_list', exact: true, name: 'Packed Product List', component: PackedList },
  { path: '/edit_packed_product', exact: true, name: 'Edit Packed Product', component: EditPackedProduct },

  // Delivered
  { path: '/delivered_list', exact: true, name: 'Delivered Product List', component: DeliveredProductList },
  { path: '/view_delivery_details', exact: true, name: 'Edit Product', component: ViewDeliveredDetails },


];

export default routes;
