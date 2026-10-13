import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'


function ProductList() {
    const[products,setProducts]=useState([])
    const BASE_URL=import.meta.env.VITE_DJANGO_BASE_URL
    const[loading,setLoading]=useState(true)
    const[error,setError]=useState(null)

    

    useEffect(()=>{
        fetch(`${BASE_URL}/api/products/`)
        .then((response)=>{
            if(!response.ok){
                throw new Error("Failed to fetch products")
            }
            return response.json()
        }).then((data)=>{
            setProducts(data)
            setLoading(false)  
        }).catch((error)=>{
            setError(error.message)
            setLoading(true)
        })

    },[])

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Error: {error}</div>
    }
  return (
    <div className='min-h-screen mt-9 bg-gray-100'>


        <h1 className='text-3xl font-bold text-center py-9 bg-white '>Product List</h1>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6'>
            {products.length>0 ?(
                products.map((product)=>(
                    <ProductCard key={product.id} product={product}/>
                ))
            ):
            (
                <p className='text-center col-span-full text-gray-500'>No products available</p>

            )}
        </div>
    </div>
  )
}

export default ProductList