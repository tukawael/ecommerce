import React from 'react'
import style from './Home.module.css'
import RecentProduct from './components/RecentProduct/RecentProduct'
import PopularCategories from './components/PopularCategories/PopularCategories'
import StaticSlider from './components/StaticSlider/StaticSlider'
export default function Home() {
  return (
    <>
    <div className='container mx-auto px-5 py-10'>

      <StaticSlider />
      <PopularCategories />
      <RecentProduct />
    </div>
    </>
  )
}
