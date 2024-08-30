import React, { useContext, useEffect, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
  //to use userContext
  let {setUserLogin} = useContext(UserContext)

  let [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate()

  let [formError , useFormError] = useState('')

  function handleLogin(formValues){
    setIsLoading(true);
    console.log('login');
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
    .then( (response)=>{
        setIsLoading(false);
        console.log(response);
        navigate('/home');
        localStorage.setItem('userToken', response.data.token)
        setUserLogin(response.data.token)
    })
    .catch( (errorResponse)=>{
        setIsLoading(false);
        console.log(errorResponse);
        useFormError(errorResponse?.response?.data.message)
    })
  }

  let formValidation = yup.object().shape({
    email : yup.string().email('invalid email').required('email is required'),
    password : yup.string().required('password is required'),
  })
   
  let formik = useFormik({
    initialValues : {
      email : '',
      password : '',
    },
    onSubmit : handleLogin,
    validationSchema : formValidation
  })

  return (
    <>
      <div className='max-w-sm mx-auto'>

        <h1 className='text-2xl font-bold text-green-600 mb-3'> Login Now </h1>

        {formError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formError}
          </div> : null}

       <form onSubmit={formik.handleSubmit}>

        <div className="relative z-0 w-full mb-5 group">
          <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} name="email" id="formName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="formName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>

       {formik.errors.email && formik.touched.email ?  
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div> : null}

        <div className="relative z-0 w-full mb-5 group">
          <input type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} name="password" id="formPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="formPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>

        {formik.errors.password && formik.touched.password ? 
             <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.password}
            </div> : null}

        <div className="flex items-center space-x-2">
          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {isLoading? <i className='fa-solid fa-spinner fa-spin'></i> : 'login'}
            </button>

            <p className='text-sm'>didn't have account yet? <Link to={'/register'} className='font-bold'>Register Now</Link> </p>
        </div>
            <p className='text-sm mt-5'><Link to={'/forgetPassword'} className='font-bold'>Forget password? </Link> </p>

      </form>

      </div>
    </>
  )
}
