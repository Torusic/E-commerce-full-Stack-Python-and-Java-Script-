import React from 'react'
import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom';
import { clearTokens, getAccessToken } from '../utils/auth';

function Navbar() {
  const {cartItems}=useCart();
  const navigate=useNavigate()

  const cartCount=cartItems.reduce((total,item)=>total + item.quantity, 0)
  const isLoggedIn=!!getAccessToken()
  const handleLogout=()=>{
    clearTokens()
    navigate('/login')
  }
  return (
    <nav className='bg-white  shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50'>
        <Link to={'/'} className='text-2xl font-bold text-gray-800'>
        Simon Cart 
        </Link>
        <div className='flex items-center gap-6'>
           {
                isLoggedIn ? (
                    <button onClick={handleLogout}>Logout</button>
                ) : (
                    <>
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/signup'}>Sign Up</Link>
                    </>
                )
            }

        </div>

        <Link to='/cart' className='relative text-gray-800 hover:text-gray-600 font-medium'>
        Cart 🛒
        {
            cartCount>0 && (
                <span className='absolute -top-2 -right-3  bg-red-600 text-white text-xs font-bold rounded-full h-5 w-7 justify-center items-center px-2 '>
                    {cartCount}
                </span>
            )
        }
        </Link>

    </nav>
  )
}

export default Navbar 