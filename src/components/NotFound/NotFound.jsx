import React, { useEffect, useState } from 'react'
import style from './NotFound.module.css'
import errorImg from '../../assets/error.svg'

export default function NotFound() {
   
  return (
    <>
      <div className="w-full md:w-[80%] mx-auto">
        <div className="flex items-center justify-center">
            <img src={errorImg} className='w-[60%]' alt="error image" />
        </div>
      </div>
    </>
  )
}
