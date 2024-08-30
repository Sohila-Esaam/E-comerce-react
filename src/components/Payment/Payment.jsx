import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Payment() { 

    let {cartId, setNumOfCartItems, setProducts, setTotalPrice} = useContext(CartContext)

    let [city, setCity] = useState('');
    let [phone, setPhone] = useState('');
    let [details, setDetails] = useState('');

    async function payment(){
        let formValues = {
            shippingAddress : {
                city,
                phone,
                details,
            },
        }
        console.log(formValues);
        //cashPayment
          try {
              let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
                  formValues,
                  {headers :{
                    token : localStorage.getItem('userToken')
                  }}
              );
              console.log(data);
              toast.success('success cash payment');
              setNumOfCartItems(0);
              setProducts([]);
              setTotalPrice(0);
          } catch (error) {
              console.log(error , 'cash payment')
          }

    }

  async function onlinePayment() {
    let formValues = {
      shippingAddress : {
        city,
        phone,
        details
      }
    }
    console.log(formValues);
    
    //online payment
    try {
      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        formValues,
        {headers : {
          token : localStorage.getItem('userToken')
        }}
      )
      console.log(data);
      window.open(data.session.url);
    } catch (error) {
      console.log(error, 'online peyment');
    }
  }

  return (
    <>
      <section>
        <div className="w-full md:w-[50%] mx-auto">

                <h2 className='text-main text-2xl my-3'>shipping Address</h2>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" onChange={(e)=> setCity(e.target.value)} name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
                    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="tel" onChange={(e)=> setPhone(e.target.value)} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input type="text" onChange={(e)=> setDetails(e.target.value)} name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>
                    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
                </div>

                <button onClick={payment} className='btn-main me-5'>Cash Payment</button>
                <button onClick={onlinePayment} className='btn-main'>Online Payment</button>

        </div>
      </section>
    </>
  )
}
