import React, { useEffect, useState } from 'react'
import style from './MainSlider.module.css'
import mainSlider1 from '../../assets/slider-image-3.jpeg'
import mainSlider2 from '../../assets/slider-image-2.jpeg'
import mainSlider3 from '../../assets/slider-image-1.jpeg'
import slider1 from '../../assets/slider-2.jpeg'
import slider2 from '../../assets/grocery-banner-2.jpeg'
import Slider from "react-slick";

export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay: true,
  };
   
  return (
    <>
      <div className="row">
        <div className="w-3/4">
          <Slider {...settings}>
          <img src={mainSlider1} className='w-full h-[400px]' alt="mainSlider1" />
          <img src={mainSlider2} className='w-full h-[400px]' alt="mainSlider2" />
          <img src={mainSlider3} className='w-full h-[400px]' alt="mainSlider3" />
           </Slider>
        </div>


        <div className="w-1/4">
          <img src={slider1} className='w-full h-[200px]' alt="slider1" />
          <img src={slider2} className='w-full h-[200px]' alt="slider2" />
        </div>
      </div>
    </>
  )
}
