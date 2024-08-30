import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner';

export default function Brands() {

  async function getAllBrands(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let {data, isLoading, isError, error, isFetching} = useQuery({
    queryKey : ['allBrands'],
    queryFn : getAllBrands
  })

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
        {data?.data.data.map((brand, idx)=> 
          <Link to={`/brandDetails/${brand._id}`}>
            <div key={idx} className='product p-2 my-3 mx-2'>
              <img src={brand.image} className='w-full h-[300px]' alt={brand.name} />
              <h3 className="font-mono my-3 text-main text-xl text-center">  {brand.name}</h3>
            </div>
          </Link>
        )}
      </div>
    </>
  )
}
