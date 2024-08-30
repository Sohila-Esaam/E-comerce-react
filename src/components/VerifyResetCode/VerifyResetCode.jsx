import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function VerifyResetCode() {

    let [resetCode, setCode] = useState(null);
    let [message, setMessage] = useState(null);
    let [errorr, seterrorr] = useState(null);
    let navigate = useNavigate()

    async function verifyCode(){
        let codeInput = {
            resetCode
        }
        console.log(codeInput);
        try {
            let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, codeInput);
            console.log(data);
            setMessage(data.status);
            navigate('/resetPassword')

        } catch (error) {
            console.log(error);
            seterrorr(error.response.data.message)
        }
    }
  return (
    <>
      <section className='w-full md:w-[80%] mx-auto'>
        <h3 className='font-bold text-xl'>Verify Reset Code</h3>
        <div className="mt-10 flex flex-col justify-center items-center w-[50%] mx-auto">

            <div className="relative z-0 w-full mb-5 group">
                <input onChange={(e)=> setCode(e.target.value)}  type="text" typeof='numeric' name="resetCode" id="formCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                <label htmlFor="formCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Verify Reset Code</label>
            </div>
            <button className='btn my-4' onClick={verifyCode}>Send</button>

            {message? <div className="p-4 mb-4 w-full text-center text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
               {message} 
            </div> : ''}

            {errorr? <div className="p-4 mb-4 w-full text-center text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {errorr}
              </div> : ''}
        </div>
      </section>
    </>
  )
}
