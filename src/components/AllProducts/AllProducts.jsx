import React, { useContext, useEffect, useState } from 'react'
import style from './AllProducts.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';

export default function AllProducts() {

  let [allProducts, useAllProducts] = useState([]);

  let {data, isError, error, isLoading, isFetching} = useProducts()

  console.log(data);
  
  // if(isLoading){
  //   return <div className="h-screen bg-green-400 flex flex-wrap justify-center items-center">
  //         <FallingLines
  //             color="#fff"
  //             width="100"
  //             visible={true}
  //             ariaLabel="falling-circles-loading"
  //         />         
  //     </div>
  // }

  if(isError){
    return <div className="h-screen bg-green-400 flex flex-wrap justify-center items-center">
          <h3>{error}</h3>
      </div>
  }
  
  let { addProductToCart } = useContext(CartContext);
  
  let {AddProductToWishlist, getLoggedUserWishList, dataList} = useContext(WishListContext);

  

  async function addToWishList(productId){
    let data = await AddProductToWishlist(productId);
    console.log(data);
    if(data){
      
      toast.success(data.message)
    }else{
     
      toast.error('error')
    }
  }
   
  useEffect(()=>{
    getLoggedUserWishList();
  },[])

  return (
    <>
     <div className="grid md:grid-cols-6">
          {data?.data.data.map((product)=> 
              <div key={product.id} className='product p-2 my-3 mx-2 relative'>

                <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                  <img src={product.imageCover} className='w-full' alt={product.title} />
                  <span className='text-green-600 mt-2 d-block font-light'>{product.category.name}</span>
                  <h3 className='text-lg text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>

                  <div className="flex items-center justify-between">
                    <span>{product.price} EGP</span>
                    <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                  </div>

                </Link>

                <button className='bg-main p-1 rounded-md absolute top-1 right-1 cursor-pointer'>
                    <i onClick={() => AddProductToWishlist(product.id)} className={`fa-solid fa-heart ${dataList?.some((item)=> item.id === product.id)? 'text-red-500' : 'text-white'} `}></i>
                  </button>

                  <button onClick={()=>{addProductToCart(product.id)}} className='btn my-3'>Add To Cart</button>
              </div>
              )}
     </div>
          
    </>
  )
}
