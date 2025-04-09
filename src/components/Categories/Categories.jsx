import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Shared/Loader/Loader";

export default function Categories() {
  const [allCategories, setAllCategories] = useState([]);

  async function getAllCategory() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setAllCategories(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <div  className='my-10 p-5'>
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Browse Categories
        </h2>

        {/* Categories Grid */}
        {allCategories !=0 ? (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCategories.map((category) => (
            <div
              key={category._id}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:border hover:border-green-500 "
            >
              {/* Image with Hover Effect */}
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-40 object-cover transition-opacity duration-300 hover:opacity-80"
                />
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
              </div>

              {/* Category Name */}
              <h3 className="mt-3 text-xl font-semibold text-gray-700 text-center transition-all duration-300 opacity-80 hover:opacity-100">
                {category.name}
              </h3>
            </div>
          ))}
        </div> ): <Loader />}
        
      </div>
    </div>
  );
}
