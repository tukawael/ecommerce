import React, { useContext, useState } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik';
import *  as Yup from 'yup';
import { ClipLoader } from 'react-spinners';
import { cartContext } from '../../Context/CartContext';

export default function Checkout() {

  let [isCallingApi, setIsCallingApi] = useState(false);
  let [apiError, setApiError] = useState(null);
  let [isOnline, setIsOnline] = useState(false);
let {cashOnDelievry ,onlinePayment} = useContext(cartContext)

  const initialValues = {
    details: '',
    phone: '',
    city: ''
  }
  const validationSchema = Yup.object().shape({
    details: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callPayment
  })

  async function callPayment(values) {
    try {
      setIsCallingApi(true);
      console.log(values);
      if(isOnline){
        let x = await onlinePayment(values)
        console.log(x);
        window.location.href = x.session.url
      }else{
        let x = await cashOnDelievry(values)
        console.log(x);
      }
    }
    catch (error) {
      console.log(error, "Error");
      setIsCallingApi(false);
    }
  }

  return (
    <>
<div className='my-[150px] p-5'>

      <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto my-6">
        <h1 className='text-4xl text-gray-600  mb-7'>Shipping Info: </h1>

        {apiError ? <div className="flex items-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <div>
            {apiError}
          </div>
        </div> : ""}


        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="details" onBlur={formik.handleBlur} value={formik.values.details} onChange={formik.handleChange} id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer" placeholder=" " required />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
          {formik.errors.details && formik.touched.details ? <div className="flex items-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <div>
              {formik.errors.details}
            </div>
          </div> : ""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="tel" name="phone" onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer" placeholder=" " required />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
          {formik.errors.phone && formik.touched.phone ? <div className="flex items-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <div>
              {formik.errors.phone}
            </div>
          </div> : ""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="city" onBlur={formik.handleBlur} value={formik.values.city} onChange={formik.handleChange} id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-[#0AAD0A] peer" placeholder=" " required />
          <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0AAD0A] peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
          {formik.errors.city && formik.touched.city ? <div className="flex items-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <div>
              {formik.errors.city}
            </div>
          </div> : ""}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input type="checkbox"  value={'online'}  onChange={()=>setIsOnline(true)}/>
          <label htmlFor="" className='mx-3'>Online</label>
        </div>




        {isCallingApi == true ? <div className='flex justify-end'>
          <ClipLoader color='#0AAD0A' />
        </div> : <button type="submit" className="text-white bg-[#0AAD0A] hover:bg-[#0aad0ade]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-auto block dark:bg-[#0AAD0A] dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pay Now</button>
        }

      </form>
</div>

    </>)
}
