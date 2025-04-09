import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../Context/CartContext';
import Loader from '../Shared/Loader/Loader';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTrashAlt } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';

export default function Card() {
  const { cartDetails, removeProduct, updateCount, getCart } = useContext(cartContext);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    getCart(); // Fetch cart on component mount
  }, []);

  async function deleteProduct(id) {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setLoadingId(id);
      let result = await removeProduct(id);
      setLoadingId(null);

      if (result.success) {
        toast.success("Item removed successfully!", { position: "top-right", autoClose: 2000 });
        getCart(); // Fetch updated cart
      } else {
        toast.error("Failed to remove item. Try again!", { position: "top-right", autoClose: 2000 });
      }
    }
  }

  async function updateItems(id, count) {
    if (count < 1) return;
    setLoadingId(id);
    await updateCount(id, count);
    setLoadingId(null);
    getCart(); // Fetch updated cart after quantity change
  }

  if (!cartDetails) {
    return <Loader />;
  }

  if (!cartDetails.data || cartDetails.data.products.length === 0) {
    return <h1 className="text-center text-3xl mt-80 p-5">🛒 Your Cart is Empty!</h1>;
  }

  return (
    <div className="my-10 mt-20 p-5 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">
          Total Items: <span className="text-green-600">{cartDetails.numOfCartItems}</span>
        </h2>
        <h2 className="text-2xl font-semibold">
          Total Price: <span className="text-green-600">{cartDetails.data.totalCartPrice} EGP</span>
        </h2>
      </div>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartDetails.data.products.map((product) => (
          <div key={product.product._id} className="flex items-center justify-between p-5 border rounded-lg shadow-sm bg-white hover:shadow-md transition">
            {/* Product Image */}
            <img src={product.product.imageCover} className="w-24 h-24 object-cover rounded-lg" alt={product.product.title} />

            {/* Product Details */}
            <div className="flex-1 mx-5">
              <h3 className="text-lg font-semibold">{product.product.title}</h3>
              <p className="text-gray-600">{product.price} EGP</p>
              <button
                onClick={() => deleteProduct(product.product._id)}
                className="text-red-600 flex items-center gap-1 mt-2 hover:text-red-800 transition"
                disabled={loadingId === product.product._id}
              >
                {loadingId === product.product._id ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <FaTrashAlt />
                )}
                Remove
              </button>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center">
              <button
                onClick={() => updateItems(product.product._id, product.count + 1)}
                className="border border-green-600 text-green-600 px-3 py-1 rounded-lg text-lg hover:bg-green-100 transition flex items-center justify-center"
                disabled={loadingId === product.product._id}
              >
                {loadingId === product.product._id ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  "+"
                )}
              </button>
              <span className="mx-3 font-semibold">{product.count}</span>
              <button
                onClick={() => updateItems(product.product._id, product.count - 1)}
                className="border border-green-600 text-green-600 px-3 py-1 rounded-lg text-lg hover:bg-green-100 transition flex items-center justify-center"
                disabled={loadingId === product.product._id}
              >
                {loadingId === product.product._id ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  "-"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Button */}
      <Link to={'/checkout'} className="block text-center bg-green-600 hover:bg-green-700 text-white font-medium py-3 mt-6 rounded-lg shadow-md transition">
        Proceed to Checkout
      </Link>
    </div>
  );
}
