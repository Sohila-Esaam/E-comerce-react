import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import AllProducts from '../AllProducts/AllProducts'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
   
  return (
    <>
      <MainSlider />
      <CategoriesSlider />
      <AllProducts />
    </>
  )
}
