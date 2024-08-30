import React, { useEffect, useState } from 'react'
import style from './Footer.module.css'
import amazon from '../../assets/amazon.svg'
import masterCard from '../../assets/MasterCard_Logo.svg.webp'
import paypal from '../../assets/paypal.png'
import googlePlay from '../../assets/google-play.png'
import appStore from '../../assets/app-store.png'

export default function Footer() {
   
  return (
    <>
      <footer className='bg-gray-100'>
        <div className="w-[90%] mx-auto py-9">
          <h2 className='text-2xl'>Get the FreshCart app</h2>
          <p className='text-gray-500'>we will send you a link, open it on your phone to download the app.</p>

          <div className="md:flex md:items-center my-7">
              <div className="md:w-3/4">
                  <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="Email" />
              </div>
              <div className="md:w-1/4 my-4 md:my-0 grid justify-items-center">
                  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800&quot;">
                      Share App Link
                  </button>
              </div>
          </div>

          <hr className='border-[1px]' />

          <div className="md:flex md:items-center md:space-x-14 my-7">
              <div className="md:w-1/2 flex items-center space-x-3">
                  <p className='md:text-xl mb-2'>Payment Partners</p>
                      <img src={amazon} className='w-[70px]' alt="amazon-logo" />
                      <img src={masterCard} className='w-[50px]' alt="masterCard-logo" />
                      <img src={paypal} className='w-[70px]' alt="paypal-logo" />
              </div>

              <div className="md:w-1/2 flex items-center space-x-3 mt-4 md:m-0">
                  <p className='md:text-xl md:mb-1'>Get deliveries with FreshCart</p>
                      <img src={googlePlay} className='w-[90px]' alt="gooleplay-logo" />
                      <img src={appStore} className='w-[90px]' alt="masterCard-logo" />
              </div>
          </div>         

          <hr className='border-[1px]' />

        </div>
      </footer>
    </>
  )
}
