import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

    let [email, setEmail] = useState('');
    let [newPassword, setNewPassword] = useState('');
    let navigate = useNavigate()

    async function resetPassword(){
        let values = {
            email,
            newPassword
        }
        console.log(values);
        
        try {
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
            console.log(data);
            console.log('okkkkkkkkkkkkkkkk');
            navigate('/')
    
        } catch (error) {
            console.log(error);           
        }
    }

  return (
    <>
      <section className='w-full md:w-[80%] mx-auto'>   

        <h3 className='font-bold text-xl'>Reset Password</h3>
        <div className="mt-10 flex flex-col justify-center items-center w-[50%] mx-auto">

            <div className="relative z-0 w-full mb-5 group">
                <input onChange={(e)=> setEmail(e.target.value)} type="email" name="email" id="formName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="formName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input onChange={(e)=>setNewPassword(e.target.value)} type="password" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Verify Reset Code</label>
            </div>
            <button className='btn my-4' onClick={resetPassword}>Send</button>

         </div>

      </section>
    </>
  )
}
