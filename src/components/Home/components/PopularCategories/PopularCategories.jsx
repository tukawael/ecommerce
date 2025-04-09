import React, { useEffect, useState } from 'react'
import style from './PopularCategories.module.css'
import axios from 'axios'
import Slider from 'react-slick';
export default function PopularCategories() {
  const [categories, setCategories] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  async function getCategories() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      setCategories(data.data);
      console.log(data);

    }
    catch (error) {
      console.log(error);

    }
  }
   useEffect(() => {
    getCategories()
    },[])
  return (
    <div className='p-10'>
      <h2 className='mb-5 text-3xl'>Shop Popular Categories </h2>
      {/* <div className='w-4/12'> */}
        <Slider {...settings}>
          {categories.map(category => <div className=''>

            <img className={style.categoryImage} src={category.image} alt="" />
            <h4>{category.name}</h4>
          </div>
          )}
        </Slider>
      {/* </div> */}
    </div>
  )
}
