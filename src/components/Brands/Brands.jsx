import style from './Brands.module.css'
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from '../Shared/Loader/Loader';

export default function Brands() {
  const [brands, setBrands] = useState([]);

  async function getAllBrands() {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className='my-10  p-5'>

      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold text-green-600 text-center mb-8">
          All Brands
        </h2>

        {/* Brands Grid */}
        {brands.length !== 0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white border border-gray-200 rounded-lg shadow-md flex flex-col items-center p-6 transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-40 h-32 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-700">{brand.name}</h3>
            </div>
          ))}
        </div>) : <Loader />
        }
      </div>
    </div>
  );
}
