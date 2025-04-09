import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AiFillHeart, AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { tokenContext } from "../../Context/TokenContext";
import ClipLoader from "react-spinners/ClipLoader";

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  let { token } = useContext(tokenContext);
  const headers = { token };

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });

        // Ensure correct data structure handling
        const wishlistItems = data.data || data.wishlist || []; 
        setWishlist(wishlistItems);

        // Store in local storage
        localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchWishlist();
  }, []);

  async function removeFromWishlist(id) {
    setRemovingId(id);
    try {
      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers });

      const updatedWishlist = wishlist.filter((item) => item.id !== id);
      setWishlist(updatedWishlist);

      // Update local storage
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      toast.info("Removed from Wishlist!", { position: "bottom-right", theme: "dark" });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item!", { position: "bottom-right", theme: "dark" });
    } finally {
      setRemovingId(null);
    }
  }

  return (
    <div className="my-10 mt-20 p-5 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-green-600 mb-8">Your Wishlist</h2>

      {/* Loader for fetching data */}
      {loading ? (
        <div className="flex justify-center py-10">
          <ClipLoader color="#0AAD0A" size={50} />
        </div>
      ) : wishlist.length === 0 ? (
        <p className="text-center text-2xl">💔 Your Wishlist is empty!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition">
              <img src={product.imageCover} className="w-full h-48 object-cover rounded-lg" alt={product.title} />
              <h3 className="text-lg font-semibold mt-3">{product.title}</h3>
              <p className="text-gray-600">{product.price} EGP</p>

              <button
                onClick={() => removeFromWishlist(product.id)}
                className="text-red-600 mt-3 flex items-center gap-1 hover:text-red-800 transition"
                disabled={removingId === product.id}
              >
                {removingId === product.id ? <ClipLoader size={20} color="red" /> : <AiFillHeart />}
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
