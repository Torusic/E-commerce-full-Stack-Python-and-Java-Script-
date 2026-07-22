import { Children, createContext,useContext,useEffect,useState } from "react";
import { authFetch } from "../utils/auth";

const CartContext=createContext();

export const CartProvider=({children})=>{
    const BASE_URL=import.meta.env.VITE_DJANGO_BASE_URL
    const[cartItems,setCartItems]=useState([])
    const[total,setTotal]=useState(0)

    const fetchCart=async()=>{
        try {
            const res=await authFetch(`${BASE_URL}/api/cart/`)
            if(!res.ok){
                throw new Error("Failed to fetch cart")
            }
            const data=await res.json()
            setCartItems(data.items || [])
            setTotal(data.total || 0)           
        } catch (error) {
            console.error("error fetching cart:::::: ",error)   
        }
    }

    useEffect(()=>{
        fetchCart()
    },[])

    const addToCart=async(productid)=>{
        try {
            await authFetch(`${BASE_URL}/api/cart/add/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({product_id:productid})
              }
            ) 
            fetchCart()
        } catch (error) {
            console.error("error adding to cart:::::: ",error)     
        }
    }

    const clearCart=()=>{
        setCartItems([])
        setTotal(0)
    }

    const removeFromCart=async(itemId)=>{
        try {
            await authFetch(`${BASE_URL}/api/cart/remove/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({item_id:itemId})
            })
             fetchCart()
        } catch (error) {
            console.error("error remove from cart:::::: ",error)
            
        }
    }

    const updateQuantity=async(itemId, quantity)=>{
            if (quantity < 1) {
                // Optionally remove item if quantity becomes 0
                await removeFromCart(itemId);
                return;
            }


        try {
            await authFetch(`${BASE_URL}/api/cart/update/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({item_id:itemId, quantity})
            })
             fetchCart()
        } catch (error) {
             console.error("error updating quantity:::::: ",error)  
            
        }

    }

    return(
    <CartContext.Provider
    value={{cartItems,total,addToCart,removeFromCart,updateQuantity,clearCart}}>
        {children}
    </CartContext.Provider>
)}
export const useCart=()=>useContext(CartContext)

