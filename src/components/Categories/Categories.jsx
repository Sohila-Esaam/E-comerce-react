import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { FallingLines } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

export default function Categories() {

  async function getAllCategories(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let {isFetching, isLoading, data, isError, error} = useQuery({
    queryKey : ['allCategories'],
    queryFn : getAllCategories,
  })

  console.log(data);

  if(isLoading){
    return <div className="h-screen bg-green-400 flex flex-wrap justify-center items-center">
              <FallingLines
                  color="#fff"
                  width="100"
                  visible={true}
                  ariaLabel="falling-circles-loading"
              />         
          </div>
  }

  if(isError){
    return <div className="h-screen bg-green-400 flex flex-wrap justify-center items-center">
          <h3>{error}</h3>
      </div>
  }
  
   
  return (
    <>
      <div className="grid md:grid-cols-4">
        {data?.data.data.map((category, idx)=> 
          <Link to={`/categoryDetails/${category._id}`}>
               <div key={idx} className="product p-2 my-3 mx-2">
                  <img src={category.image} className="w-full h-[300px]" alt={category.name} />
                  <h3 className="font-mono mt-3 text-center">  {category.name}</h3>
              </div>
          </Link>
        )}
      </div>
    </>
  )
}
