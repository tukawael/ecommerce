import React from 'react'
import style from './Loader.module.css'
import loader from '../../../assets/finalProject assets/images/146-trolley.gif'
export default function Loader() {
  return (
    <div className='flex justify-center'>
      <img src= {loader} alt="" />
    </div>
  )
}
