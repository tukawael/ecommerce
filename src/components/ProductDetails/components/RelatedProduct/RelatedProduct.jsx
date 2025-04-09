import React, { useEffect, useState } from 'react'
import style from './RelatedProduct.module.css'
import axios from 'axios';
import ProductItem from '../../../Shared/ProductItem/ProductItem';
export default function RelatedProduct(props) {
  const [RelatedProducts , setRelatedProducts] = useState([]);
  let {categoryId} = props;
  console.log(categoryId);
  
  function getProduct() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        // console.log(data);
        let res =data.data.filter(product => product.category._id == categoryId)
        console.log(res);
        setRelatedProducts(res);
        
      })
      .catch(err => {
        console.log(err);

      })
  }
  useEffect(() => {
    getProduct()
  }, [])

  return (
    <div className='flex flex-wrap gap-y-3 mv-8'>
          {RelatedProducts.map(prod => <ProductItem product = {prod}/> )}
        </div>
  )
}
