import React, { use, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'
import { authFetch } from '../utils/auth'

function CheckoutPage() {
    const BASE_URL=import.meta.env.VITE_DJANGO_BASE_URL
    const navigate=useNavigate()
    const{clearCart}=useCart()

    const[form,setForm]=useState(
        {
            name:"",
            address:"",
            phone:"",
            payment_method:"COD"
        }
    )
    const[loading,setLoading]=useState(false)
    const[message,setMessage]=useState(null)
    const[error,setError]=useState(null)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        setMessage("")
        setError("")
        try {
            const res=await authFetch(`${BASE_URL}/api/orders/create/`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(form)
            })
            const data=res.json()
            if(res.ok){
                setMessage('Order placed successfully')
                fetch(`${BASE_URL}/api/cart/`)
                clearCart()
                setTimeout(()=>{
                    navigate('/')
                },2000)
            }
            else{
                setError('Failed to place order. Please trye again...')
            }
            
        } catch (error) {
            setMessage("An error occured. Try again")
            
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <div className='min-h-screen bg-gray-100 flex px-2 justify-center items-center py-6'>
        <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md'>
            <h1 className='text-3xl font-bold text-center mb-6'>Checkout</h1>

            <form onSubmit={handleSubmit} className='space-x-4 text-xs space-y-2' action="">
                <input
                 type="text" 
                 name='name'
                 placeholder='Full name'
                 value={form.name}
                 onChange={(e)=>setForm({...form,name:e.target.value})}
                 required
                 className='w-full border-2 border-gray-200 rounded-lg p-2'
                />

                <textarea
                type="text" 
                 name='address'
                 placeholder='Full Address'
                 value={form.address}
                 onChange={(e)=>setForm({...form,address:e.target.value})}
                 required
                 className='w-full border-2 border-gray-200 rounded-lg p-2'
                />

                 <input
                 type="tel" 
                 name='phone'
                 placeholder='Phone'
                 value={form.phone}
                 onChange={(e)=>setForm({...form,phone:e.target.value})}
                 required
                 className='w-full border-2 border-gray-200 rounded-lg p-2'
                />

                <select 
                name="payment_method" 
                value={form.payment_method}
                onChange={(e)=>setForm({...form,payment_method:e.target.value})}
                className='w-full border-2 border-gray-200 rounded-lg p-2'

                >
                    <option value="COD">Cash on Delivery</option>
                    <option value="CreditCard">OnlinePayment</option>
                </select>

                <button type='submit'
                disabled={loading}
                className='w-full bg-blue-500 transition duration-300 text-white py-2 rounded-lg hover:bg-blue-600'
                
                >
                    {loading ?"Processing...":"Place Order"}

                </button>
                {
                    message && (
                        <p className='text-center text-green-500 bg-green-100 p-2 font-semibold mt-4'>{message}</p>
                    )
                    
                }
                {
                    error && (
                        <p className='text-center text-red-500  bg-red-100 p-2 rounded-lg font-semibold mt-4'>{error}</p>
                    )

                }
            </form>


        </div>

    </div>
  )
}

export default CheckoutPage