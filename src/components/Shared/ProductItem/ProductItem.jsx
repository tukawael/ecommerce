import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart, AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import { tokenContext } from '../../../Context/TokenContext';

export default function ProductItem({ product, addProductToCart, loading }) {
  const { imageCover, title, category, price, ratingsAverage, id } = product;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  let { token } = useContext(tokenContext);
  const headers = { token };

  // Load wishlist from local storage on mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      const wishlistItems = JSON.parse(storedWishlist);
      setIsWishlisted(wishlistItems.some((item) => item.id === id));
    }
  }, [id]);

  async function checkWishlist() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers });

      const wishlistItems = data.data || data.wishlist || [];
      setIsWishlisted(wishlistItems.some((item) => item.id === id));

      // Store in local storage
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  useEffect(() => {
    checkWishlist();
  }, [id]);

  async function toggleWishlist() {
    setWishlistLoading(true);
    try {
      if (isWishlisted) {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers });

        const updatedWishlist = JSON.parse(localStorage.getItem("wishlist")).filter((item) => item.id !== id);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        setIsWishlisted(false);
        toast.info("Removed from Wishlist!", { position: "bottom-right", theme: "dark" });
      } else {
        await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId: id }, { headers });

        const updatedWishlist = [...JSON.parse(localStorage.getItem("wishlist") || "[]"), { id }];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        setIsWishlisted(true);
        toast.success("Added to Wishlist!", { position: "bottom-right", theme: "dark" });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Something went wrong!", { position: "bottom-right", theme: "dark" });
    }
    setWishlistLoading(false);
  }

  return (
    <div className='w-full px-2 mb-5 md:w-1/3 lg:w-1/4 sm:w-1/2'>
      <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 transform hover:scale-105 relative">
        
        {/* Heart Icon */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 text-xl text-red-500"
          disabled={wishlistLoading}
        >
          {wishlistLoading ? <AiOutlineLoading3Quarters className="animate-spin" /> : isWishlisted ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>

        <Link to={`/productDetails/${id}/${category._id}`} className="block">
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img src={imageCover} className="w-full h-full object-cover" alt={title} />
          </div>
          <span className='text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block mt-2'>{category.name}</span>
          <h2 className='text-lg font-semibold mt-2 text-gray-800'>{title.split(" ").splice(0, 2).join(" ")}</h2>
          <div className="flex justify-between items-center my-2 text-gray-700">
            <p className="text-xl font-bold">{price} EGP</p>
            <p className="flex items-center text-yellow-500 font-semibold">
              <i className='fa fa-star mr-1'></i>
              {ratingsAverage}
            </p>
          </div>
        </Link>

        <button
          onClick={() => addProductToCart(id)}
          className={`mt-3 w-full p-3 rounded-md text-white text-lg flex items-center justify-center transition ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 transition-all duration-300'
          }`}
          disabled={loading}
        >
          {loading ? <AiOutlineLoading3Quarters className="animate-spin mr-2" /> : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
