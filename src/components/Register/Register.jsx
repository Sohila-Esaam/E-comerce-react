import React, { useContext, useEffect, useState } from 'react'
import style from './Register.module.css'
import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext';

export default function Register() {
  //to use userContext
  let {setUserLogin} = useContext(UserContext);

  let [isLoading, setIsLoading] = useState(false);

  let [errorMessage, useErrorMessage] = useState('');
  let navigate = useNavigate();

  function handleRegister(formValues){
    setIsLoading(true);
    console.log(formValues);

    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, formValues)
    .then((response)=>{
      setIsLoading(false);
      toast.success('Successfully!');
      console.log(response);

      //context
      // localStorage.setItem('userToken', response.data.token);
      // setUserLogin(response.data.token);

      navigate('/');
    })
    .catch((errorResponse)=>{
      console.log(errorResponse);
      useErrorMessage(errorResponse.response.data.message);
      toast.error(errorResponse.response.data.message);
      setIsLoading(false);
    })
  }

  let formValidations = yup.object().shape({
    name : yup.string().min(3,'minLength is 3 letters').max(10,'maxLength is 10 letters').required('name is required'),
    email: yup.string().email('invalid email').required('email.required'),
    phone: yup.string().matches(/^01[0125][0-9]{8}$/, 'phone must be egyption number').required('phone is required'),
    password: yup.string().matches(/^[A-Z][a-z1-9]{5,10}$/,'password must start with uppercase letter').required('password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], 'repassword and password not matches').required('rePasswird is required'),
  })

 let formik = useFormik({
  initialValues : {
    name : '',
    email : '',
    phone: '',
    password : '',
    rePassword: '',
  },
  onSubmit : handleRegister,
  validationSchema : formValidations
 })
   
  return (
    <>
     <div className='max-w-md mx-auto'>
      <h2 className='text-2xl font-bold text-green-600 mb-3'>Register Now</h2>

      {errorMessage? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {errorMessage}
        </div> : null}

        <form onSubmit={formik.handleSubmit}>

          <div className="relative z-0 w-full mb-5 group">
            <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name="name" id="formName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="formName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
          </div>

          {formik.errors?.name && formik.touched.name ? 
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.name}
          </div> : null}

          <div className="relative z-0 w-full mb-5 group">
            <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} name="email" id="formEmail" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="formEmail" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>

          {formik.errors.email && formik.touched.email ? 
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           {formik.errors.email}
          </div> : null}

          <div className="relative z-0 w-full mb-5 group">
            <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name="phone" id="formPhone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="formPhone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
          </div>

          {formik.errors.phone && formik.touched.phone ? 
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           {formik.errors.phone}
          </div> : null}

          <div className="relative z-0 w-full mb-5 group">
            <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} name="password" id="formPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="formPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>

          {formik.errors.password && formik.touched.password ? 
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           {formik.errors.password}
          </div> : null}

          <div className="relative z-0 w-full mb-5 group">
            <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} name="rePassword" id="formRePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />
            <label htmlFor="formRePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
          </div>

          {formik.errors.rePassword && formik.touched.rePassword ? 
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
           {formik.errors.rePassword}
          </div> : null}

          <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800&quot;">
            {isLoading? <i className='fa-solid fa-spinner fa-spin text-white'></i> : 'Register'}
            </button>

        </form>

     </div>
    </>
  )
}
