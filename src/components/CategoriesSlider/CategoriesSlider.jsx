import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import Slider from "react-slick";
import axios from 'axios';

export default function CategoriesSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 3,
    autoplay: true,
  };

  let [categories, setCategories] = useState([]);

  function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=>{
      console.log(data.data);
      setCategories(data.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    getCategories();
  },[])

  return (
    <>
     <div className='my-10'>
      <h4 className='text-green-400 mb-5 font-semibold'>Shop Popular Categories</h4>
      <Slider {...settings}>
            {categories.map((category)=> <div key={category._id}>
              <img className='category-slider w-full' src={category.image} alt={category.name} />
              <h3 className='text-green-400 mt-3'>{category.name}</h3>
            </div>)}
        </Slider>
     </div>
    </>
  )
}
