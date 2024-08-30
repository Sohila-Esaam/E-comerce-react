import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import {NavLink, useNavigate} from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'

export default function Navbar() {

  let {userLogin, setUserLogin} = useContext(UserContext);

  let { numOfCartItems } = useContext(CartContext);

  let navigate = useNavigate();

  //function logout
  function logout(){
    localStorage.removeItem('userToken');
    setUserLogin(null);
    navigate('/');
  }
  
  
   
  return (
    <>
      <nav className='px-7 z-50 mx-auto py-2 bg-gray-100 flex flex-col items-center justify-between lg:flex-row static lg:fixed top-0 left-0 right-0'>

        <div className='flex items-center flex-col lg:flex-row space-x-4'>
          <img src={logo} className='w-[110]' alt="logo image" />
          <ul className='flex items-center flex-col lg:flex-row lg:space-x-5'>
            {userLogin !== null ? 
                <>
                  <li className='py-2'><NavLink className='text-md text-slate-900' to={'/home'}>Home</NavLink></li>
                  <li className='py-2'><NavLink className='relative text-md text-slate-900' to={'/cart'}>Cart
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-400 border-2 border-white rounded-full -top-5 -end-4 dark:border-gray-900">
                      {numOfCartItems}</div>
                  </NavLink></li>
                  <li className='py-2'><NavLink className='text-md text-slate-900' to={'/products'}>Products</NavLink></li>
                  <li className='py-2'><NavLink className='text-md text-slate-900' to={'/categories'}>Categories</NavLink></li>
                  <li className='py-2'><NavLink className='text-md text-slate-900' to={'/brands'}>Brands</NavLink></li>
                  <li className='py-2'><NavLink className='text-md text-slate-900' to={'/wishlist'}>WishList</NavLink></li>
                </>
              : null
            }
          </ul>
          
        </div>

        <div className='flex items-center flex-col lg:flex-row space-x-3'>
          <ul className='flex items-center space-x-1 lg:space-x-3'>
              <li><i className="fa-brands fa-instagram "></i></li>
              <li><i className="fa-brands fa-facebook"></i></li>
              <li><i className="fa-brands fa-tiktok"></i></li>
              <li><i className="fa-brands fa-twitter"></i></li>
              <li><i className="fa-brands fa-linkedin-in"></i></li>
              <li><i className="fa-brands fa-youtube"></i></li>
            </ul>
            <ul className='flex items-center flex-col lg:flex-row lg:space-x-2'>
              {userLogin === null ? 
                <>
                  <li className='py-2'><NavLink className='text-md text-slate-900' to={'/register'}>Register</NavLink></li>
                  <li className='py-2'><NavLink className='text-md text-slate-900' to={'/'}>SignIn</NavLink></li>
                </>
                : 
                <li className='cursor-pointer' onClick={logout}><span className='text-md text-slate-900'>logOut</span></li>
              }
            
          </ul>

        </div>

      </nav>
    </>
  )
}
