import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [isCallingApi, setIsCallingApi] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      rePassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, 'Min length is 3').max(15, 'Max length is 15').required('Required'),
      email: Yup.string().email('Invalid Email').required('Required'),
      phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid Phone').required('Required'),
      password: Yup.string()
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 'Must contain 8+ characters, an uppercase, lowercase, and a number')
        .required('Required'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        setIsCallingApi(true);
        setApiError(null);
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
        navigate('/login');
      } catch (error) {
        setApiError(error.response?.data?.message || 'An error occurred');
      } finally {
        setIsCallingApi(false);
      }
    }
  });

  return (
    <div className='my-10 mt-20 p-5'>
      <div className='flex justify-center items-center px-4'>
        <div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-lg'>
          <h1 className='text-2xl font-semibold text-green-700 text-center mb-6'>Register Now</h1>
          {apiError && <div className='text-red-600 bg-red-100 p-3 rounded-md mb-4'>{apiError}</div>}
          <form onSubmit={formik.handleSubmit} className='space-y-5'>
            {['name', 'email', 'phone', 'password', 'rePassword'].map((field, index) => (
              <div key={index}>
                <label className='block text-green-600 capitalize'>{field.replace('re', 'Confirm ')}</label>
                <input
                  type={field.includes('password') ? 'password' : 'text'}
                  name={field}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values[field]}
                  className='w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-400'
                />
                {formik.errors[field] && formik.touched[field] && (
                  <p className='text-red-600 text-sm mt-1'>{formik.errors[field]}</p>
                )}
              </div>
            ))}
            <button
              type='submit'
              className={`w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition ${isCallingApi ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isCallingApi}
            >
              {isCallingApi ? <ClipLoader size={20} color='#FFF' /> : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
