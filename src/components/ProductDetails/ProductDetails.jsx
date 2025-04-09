import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProduct from './components/RelatedProduct/RelatedProduct';
import Slider from 'react-slick';
import Loader from '../Shared/Loader/Loader';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function ProductDetails() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id, categoryId } = useParams();
  const { addToCart } = useContext(cartContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };

  async function addProductToCart(id) {
    setLoading(true);
    let data = await addToCart(id);
    if (data.status === 'success') {
      toast.success("Product added Successfully!", { position: "bottom-right", theme: "dark" });
    }
    setLoading(false);
  }

  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setDetails(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);
  return (
    <>
      {details ? (
        <div className="main-layout  flex  items-center py-16 px-6 bg-gray-100 rounded-lg shadow-lg">
          {/* Left - Image Slider */}
          <div className='w-4/12 p-5' >
            <Slider {...settings} className="rounded-lg ">
              {details?.images.map((src, index) => (
                <img key={index} src={src} className="rounded-lg w-full h-96 object-cover" alt="" />
              ))}
            </Slider>
            
          </div>

          {/* Right - Product Details */}
          <div className='w-8/12 '>
            <h1 className="text-4xl font-bold text-gray-800">{details?.title}</h1>
            <p className="text-gray-600 text-lg">{details?.description}</p>
            <span className="text-sm bg-green-200 text-green-800 px-3 py-1 rounded-full">{details?.category?.name}</span>

            <div className="flex justify-between items-center my-4">
              <p className="text-3xl font-semibold text-gray-900">{details?.price} EGP</p>
              <p className="flex items-center text-yellow-500 font-semibold">
                <i className='fa fa-star mr-1'></i>
                {details?.ratingsAverage}
              </p>
            </div>

            <button
              onClick={() => addProductToCart(details.id)}
              className={`bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md w-full p-3 text-lg flex items-center justify-center transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? <AiOutlineLoading3Quarters className="animate-spin mr-2" /> : "Add to Cart"}
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}

      {/* Related Products */}
      <h2 className='text-4xl font-bold mt-12'>Related Products</h2>
      <RelatedProduct categoryId={categoryId} />
    </>
  );
}
