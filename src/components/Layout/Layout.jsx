import React, { useEffect, useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
   
  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto my-14 py-10">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
