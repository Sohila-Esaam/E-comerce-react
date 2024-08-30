import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../../Context/WishListContext'
import { useQuery } from 'react-query'
import { FallingLines } from 'react-loader-spinner'
import useProducts from '../../Hooks/useProducts';
import toast from 'react-hot-toast';

export default function WishList() {

  let {dataList, getLoggedUserWishList, deleteProductFromWishlist, idList} = useContext(WishListContext);

  console.log(dataList);
  console.log(dataList?.data);

  function getUserWishList(){
    getLoggedUserWishList()
  }

  async function removeProduct(id){
   let x = await deleteProductFromWishlist(id);
   console.log(x);
   if(x){
    toast.success(x.message);
   }
  }

  useEffect(()=>{
    getUserWishList()
  }, [])
  
  return (
    <>
      <section className='py-10 bg-slate-100'>
        <div className="w-full md:w-[80%] mx-auto">
            <h2 className='text-3xl font-bold mb-6'>Your Wish List</h2>
            <h2 className='text-2xl font-semibold text-main mb-6 font-mono'>Count : {dataList?.count}</h2>
            {dataList?.data ? <div>
                {dataList?.data.map((data, idx)=> <div key={idx} className="flex items-center py-4 border-b-2">               
                       <div className="w-1/4">
                            <img src={data.imageCover} alt={data.title} />
                       </div>
                       <div className="w-3/4 p-5">
                            <h3 className='mb-2'>Title : {data.title}</h3>
                            <h3 className='mb-2'>Description : {data.description}</h3>
                            <h3 className='mb-2'>Price : {data.price}</h3>
                            <h3 className='mb-2'>Ratings Average : {data.ratingsAverage}</h3>
                            <h3 className='mb-2'>Category Name : {data.category.name}</h3>
                            <h3 className='mb-5'>Brand Name : {data.brand.name}</h3>
                            <h3 className='mb-5'>id : {data.id}</h3>
                            <div className="flex">
                               
                                <i onClick={()=>{removeProduct(data.id)}} className='fa-regular fa-trash-can text-main cursor-pointer'></i>
                                <p className='m-0 ms-2 text-sm text-main'>Remove</p>
                            </div>
                       </div>            
                </div>)}
            </div> : ''}
          
        </div>
      </section>
    </>
  )
}
