import React, { useContext } from 'react'
import style from './Products.module.css'
import { counterContext } from '../../Context/CounterContext'
import RecentProduct from '../Home/components/RecentProduct/RecentProduct';
export default function Products() {
  
  return (
    <div className='my-10 mt-20 p-5'>
      <RecentProduct />
    </div>
  )
}
