import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },
  // CUSTOMS

  // 1.Carousal
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Carousal',
    // route: '/buttons',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Carousal List',
        to: '/carousal_list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Carousal',
        to: '/add_Carousal',
      },
    ],
  },
  // 1.Carousal Ends


  // 1.Offer
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Offer',
    // route: '/buttons',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Offer List',
        to: '/offer_list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Offer',
        to: '/add_offer',
      },
    ],
  },
  // 1.Offer Ends

  // 1.Admin
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Admin',
    // route: '/buttons',
    icon: 'cil-cursor',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Admin List',
        to: '/admin_list',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Admin',
        to: '/add_admin',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Edit Admin',
        to: '/edit_admin',
      },
    ],
  },
  // 1.Admin Ends

    // 2.user
    {
      _tag: 'CSidebarNavDropdown',
      name: 'User',
      // route: '/buttons',
      icon: 'cil-cursor',
      _children: [
        {
          _tag: 'CSidebarNavItem',
          name: 'User List',
          to: '/user_list',
        },
      ],
    },
    // 2.user Ends

        // 3.category
        {
          _tag: 'CSidebarNavDropdown',
          name: 'Category',
          // route: '/buttons',
          icon: 'cil-cursor',
          _children: [
            {
              _tag: 'CSidebarNavItem',
              name: 'Category List',
              to: '/category_list',
            },
            {
              _tag: 'CSidebarNavItem',
              name: 'Add category',
              to: '/add_category',
            },
            {
              _tag: 'CSidebarNavItem',
              name: 'Add Sub Category',
              to: '/add_subCategory',
            },
          ],
        },
        // 3.category Ends

             // 4.product
             {
              _tag: 'CSidebarNavDropdown',
              name: 'Product',
              // route: '/buttons',
              icon: 'cil-cursor',
              _children: [
                {
                  _tag: 'CSidebarNavItem',
                  name: 'Product List',
                  to: '/product_list',
                },
                {
                  _tag: 'CSidebarNavItem',
                  name: 'Add Product',
                  to: '/add_product',
                },
              ],
            },
            // 4.product Ends

       // 5.orders
       {
        _tag: 'CSidebarNavDropdown',
        name: 'Orders',
        // route: '/buttons',
        icon: 'cil-cursor',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Orders List',
            to: '/orders_list',
          },
          {
            _tag: 'CSidebarNavItem',
            name: 'Packed List',
            to: '/packed_product_list',
          },
        ],
      },
      // 5.orders Ends

      // 6.Delivered
      {
        _tag: 'CSidebarNavDropdown',
        name: 'Delivered',
        // route: '/buttons',
        icon: 'cil-cursor',
        _children: [
          {
            _tag: 'CSidebarNavItem',
            name: 'Delivered List',
            to: '/delivered_list',
          },
        ],
      },
      // 6.Delivered Ends

  // CUSTOMS ENDS
 
]

export default _nav
