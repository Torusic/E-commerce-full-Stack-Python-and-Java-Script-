import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext"
function CartPage(){
    const BASE_URL=import.meta.env.VITE_DJANGO_BASE_URL
    const{ cartItems,total, removeFromCart, updateQuantity }=useCart()
    return(
        <div className="pt-20 min-h-screen text-xs bg-gray-800 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
            {cartItems.length===0?(
                    <p className="text-center text-gray-600">Your cart is empty</p>
                ):(
                    <div className="max-w-4xl mx-auto bg-gray-900 p-3 rounded-lg shadow-md">
                        { cartItems.map((item)=>(
                                <div key={item.id} className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        {
                                            item.product_image && (
                                                <img 
                                                src={`${BASE_URL}${item.product_image}`}
                                                 alt={item.name} 
                                                 className="w-20 h-20 object-cover  rounded"
                                                 />
                                          )
                                        }
                                    </div>
                                    <div>
                                        <h2 className="text-md text-gray-500 font-semibold">{item.product_name}</h2>
                                        <p className="text-green-600 text-sm">$ {item.product_price}</p>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 bg-gray-800 shadow-md rounded">
                                        <button onClick={()=>updateQuantity(
                                            item.id,
                                            item.quantity-1
                                        )}
                                        className="bg-red-500 px-3 py-1 text-white rounded">
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={()=>
                                        updateQuantity(
                                                                                    
                                            item.id,
                                            item.quantity+1
                                        )}
                                         className="bg-green-500 px-3 text-white py-1 rounded"
                                        >
                                            +
                                        </button>
                                        <button 
                                        onClick={()=>removeFromCart(item.id)}
                                        className="text-red-500 ">
                                            Remove 🗑️
                                        </button>
                                    </div>
                                </div> 
                            ))
                        }
                        <div className="border-t-green-500 border-t pt-4 mt-4 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-400">Total:</h2>
                            <p className="text-xl font-semibold text-white" > ${total.toFixed(2)}</p>
                            <Link to={'/checkout'} className="bg-blue-600 text-white p-2"> Proceede to Checkout</Link>
                        </div>
                    </div>
                )}
        </div>
    )}
export default CartPage