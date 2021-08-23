import React from 'react'
import './style.css'
export default function Product({ product }) {
  return (
    // check quantity 
    <div className='product'>
      <p className='price'>${product.price}</p>
      <img className='img' src={product.img} alt='product' />
      <p className='name'>{product.name}</p>
      <p className='number'>Num:{product.index}</p>
      <p className='quantity'>Qty:{product.quantity}</p>
    </div>
  )
}
