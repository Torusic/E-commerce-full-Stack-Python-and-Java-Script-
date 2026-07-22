import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToken } from '../utils/auth'


function Login() {
    const BASE_URL=import.meta.env.VITE_DJANGO_BASE_URL
    const[form,setForm]=useState({
        username:"",
        password:""
    })

    const [msg,setMsg]=useState("")
    const navigate=useNavigate()

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setMsg("")
        try {
            const res=await fetch(`${BASE_URL}/api/token/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(form)

            })
            const data= await res.json()
            if(res.ok){
                saveToken(data)
                setMsg("Logging successful. Redirecting...")
                setTimeout(()=>{
                    navigate('/')
                },800)
            }else{
                setMsg("Login failed")
            }
           
            
        } catch (error) {
            setMsg("An error Occured")
            
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center p-6'>
        <div className='max-w-md w-full bg-white p-6 rounded shadow'>
            <h2 className='text-2xl font-bold mb-4'>Login</h2>
            <form onSubmit={handleSubmit} className='space-y-3' action="">

                <input 
                type="text" 
                name='username'
                onChange={handleChange}
                value={form.username}
                placeholder='username'
                required

                className='w-full p-2 border rounded'
                />
                <input 
                type="password" 
                name='password'
                onChange={handleChange}
                value={form.password}
                placeholder='password'
                required

                className='w-full p-2 border rounded'
                />

                <button className='w-full bg-blue-600 text-white py-2 rounded'>
                    Login
              </button>
            </form>
            {msg && (
                <p className='mt-3 text-sm'>{msg}</p>
            )

            }

            <div className='mt-4 text-sm'>
                Don't have an account ? {""}
                <a href="/signup" className='text-blue-600 hover:underline'>
                Signup
                </a>
            </div>

        </div>

    </div>
  )
}

export default Login