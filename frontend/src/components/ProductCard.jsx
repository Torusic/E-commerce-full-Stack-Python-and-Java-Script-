import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({product}) {
    const BASE_URL=import.meta.env.VITE_DJANGO_BASE_URL
  return (
    
    <Link to={`/product/${product.id}`}>
    
    <div className='bg-gray-100 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform  cursor-pointer'>

        <img 
        src={`${BASE_URL}${product.image}` }
        alt={product.name}
        className='w-full h-56 object-cover rounded-t-lg  mb-4'
        />
        <div className='p-3'>
        <h2 className='text-lg font-semibold text-gray-800 truncate'>{product.name}</h2>
        <p className='text-gray-600 font-medium'> $ {product.price}</p>

        </div>

        

    </div>
    </Link>
  )
}

export default ProductCard