import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom';

export default function Cart() {

  let {updateCartProduct, clearCartItems, deleteProduct, getLoggedUserCart, products, totalPrice} = useContext(CartContext);

  console.log(products, "cart page");
  

  async function getCartItems(){
    let x = await getLoggedUserCart();
    console.log(x);
  }

  useEffect(()=>{
    getCartItems()
  }, [])

  async function removeProduct(productId){
    let x = await deleteProduct(productId);
    console.log(x);
  }

  async function clearCart() {
    let x = await clearCartItems();
    console.log(x);
  }

  return (
    <>
      <section className='bg-slate-100 p-5'>
            <div className="items flex items-center justify-between">
              <div>
                <h3 className='text-2xl font-light'>Shop Cart :</h3>
                <h3 className='text-main font-mono my-2'>Total Cart Price : {totalPrice} EGP</h3>
              </div>
              <div>
                <button onClick={clearCart} className='btn-main'>Clear Cart</button>
              </div>
            </div>

            {products?.map((product)=> 
              <div key={product.product.id} className="flex flex-wrap items-center py-3 border-b-2"> 

                <div className="w-1/6 p-5">
                    <img src={product.product.imageCover} className='w-full' alt={product.product.title} />
                </div>

                <div className="w-4/6 p-5">
                  <h2 className='mb-3 text-1xl'>{product.product.title}</h2>
                  <h2 className='mb-3 text-1xl text-main'>Price : {product.price}</h2>
                  <div className="flex items-center">
                     <i onClick={()=>{removeProduct(product.product.id)}} className="fa-regular fa-trash-can text-main cursor-pointer"></i>
                     <p className='ms-2 text-sm'>Remove</p>
                  </div>
                </div>

                <div className="w-1/6 p-5">
                  <div className="flex items-center justify-center">
                      <button
                        onClick={()=>{updateCartProduct(product.product.id, product.count+1)}}
                        className='border border-green-400 px-1'>+</button>
                      <p className='mx-3'>{product.count}</p>
                      <button 
                        onClick={()=>{updateCartProduct(product.product.id, product.count-1)}}
                        className='border border-green-400 px-1'>-</button>
                  </div>
                </div>

              </div>
            )}

            <button className='m-5'><Link className='btn-main mt-6' to={'/payment'}>payment</Link></button>

      </section>
    </>
  )
}
