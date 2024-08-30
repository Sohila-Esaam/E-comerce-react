import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext';
import { jwtDecode } from 'jwt-decode';
import { FallingLines } from 'react-loader-spinner';

export default function AllOrders() {

  let {id} = jwtDecode(localStorage.getItem('userToken'));
  console.log(id);

  let [allOrders, setAllOrders] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  

  async function getAllOrders(){
    setIsLoading(true);
    try {
        let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
        console.log(data);
        setAllOrders(data);
        setIsLoading(false);
    } catch (error) {
        console.log(error);
        setIsLoading(false);
    }
  }
  
  useEffect(()=>{
    getAllOrders()
  }, [])

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


  return (
    <>
      <section className='py-10 bg-slate-100'>
          <div className="w-full md:w-[80%] mx-auto">
              <h2 className='text-2xl font-semibold text-main mb-3 font-mono'>All Orders :</h2>
             
                  <div>
                        {allOrders? allOrders.map((order, idx)=> <div className="flex justify-center my-6">
                          <div className='border-b-2 p-3' key={idx}>
                            <h3 className='font-mono text-main'>Total Order Price : {order.totalOrderPrice}</h3>
                            <h3 className='font-mono my-4'>payment Method Type : {order.paymentMethodType}</h3>

                            <div  className='flex flex-wrap gap-y-4 items-center'> 
                                {order.cartItems.map((item, idx) =>
                                    <div key={idx} className="w-1/4">
                                      <img src={item.product.imageCover} className='w-[90%]' alt={item.product.title} />
                                      <p className='my-2'>{item.product.title}</p>
                                      <p className='my-2'>count : {item.count}</p>
                                      <p className='font-mono text-main'>price :{item.price}</p>
                                    </div>
                                )}
                            </div>

                          </div>
                          <div className='my-4'>
                            <p className='font-mono text-main'>ordered at : {order.createdAt}</p>
                          </div>
                        </div> ) : ''}
                  </div>

          </div>
      </section>
    </>
  )
}
