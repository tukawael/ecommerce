import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import *  as Yup from 'yup';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { tokenContext } from '../../Context/TokenContext';

export default function Login() {

  let [isCallingApi, setIsCallingApi] = useState(false);
  let [apiError, setApiError] = useState(null);
  let { setToken } = useContext(tokenContext);

  let navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string().matches(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'), "Invalid Password").required("Required"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: callLogin
  })

  async function callLogin(values) {
    try {
      setIsCallingApi(true);
      setApiError(null);
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
      console.log(data);
      setIsCallingApi(false);
      localStorage.setItem("Token", data.token);
      setToken(data.token)
      navigate("/");
    }
    catch (error) {
      console.log(error, "Error");
      setApiError(error.response.data.message);
      console.log(error.response.data.message);
      setIsCallingApi(false);

    }
  }

  return (
    <>
      <div className='my-10 mt-20 p-5'>
      <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <h1 className="text-3xl font-semibold text-green-700 mb-6 text-center">Login to Your Account</h1>

      {/* API Error Message */}
      {apiError && (
        <div className="flex items-center p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-300">
          <span className="text-sm font-medium">{apiError}</span>
        </div>
      )}

      {/* Email Field */}
      <div className="relative mb-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-green-600 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          placeholder="Enter your email"
          required
        />
        {formik.errors.email && formik.touched.email && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="relative mb-5">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-green-600 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          placeholder="Enter your password"
          required
        />
        {formik.errors.password && formik.touched.password && (
          <p className="text-sm text-red-600 mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-2.5 rounded-lg text-white font-semibold transition-all ${
          isCallingApi
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-400"
        }`}
        disabled={isCallingApi}
      >
        {isCallingApi ? (
          <div className="flex items-center justify-center">
            <ClipLoader size={20} color="white" />
            <span className="ml-2">Logging in...</span>
          </div>
        ) : (
          "Login"
        )}
      </button>

      {/* Forgot Password */}
      {/* <div className="text-center mt-4">
        <Link to={'/forgetpassword'} className="text-sm text-green-600 hover:underline">
          Forgot your password?
        </Link>
      </div> */}
    </form>
      </div>

    </>)
}
