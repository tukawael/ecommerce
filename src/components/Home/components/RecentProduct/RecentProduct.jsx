import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../../../Shared/ProductItem/ProductItem';
import Loader from '../../../Shared/Loader/Loader';
import { cartContext } from '../../../../Context/CartContext';
import { toast } from 'react-toastify';

export default function RecentProduct() {
  let [product, setProduct] = useState([]);
  let [loadingProducts, setLoadingProducts] = useState({}); // Track loading per product
  let { addToCart } = useContext(cartContext);

  function getProduct() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setProduct(data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function addProductToCart(id) {
    // Set loading state for this specific product
    setLoadingProducts(prevState => ({ ...prevState, [id]: true }));

    let data = await addToCart(id);
    if (data.status === 'success') {
      toast.success("Product added Successfully!", { position: "bottom-right", theme: "dark" });
    }

    // Reset loading state for this specific product
    setLoadingProducts(prevState => ({ ...prevState, [id]: false }));
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {product.length !== 0 ? (
        <div className='main-layout mb-8'>
          {product.map(prod => (
            <ProductItem
              key={prod.id}
              addProductToCart={addProductToCart}
              product={prod}
              loading={loadingProducts[prod.id] || false} // Pass loading state
            />
          ))}
        </div>
      ) : <Loader />}
    </>
  );
}
