import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveToken } from '../utils/auth.js'

function SignUp() {
    const BASE_URL=import.meta.env.VITE_DJANGO_BASE_URL
    const[form,setForm]=useState({
        username:"",
        email:"",
        password:"",
        password2:""

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
            const res=await fetch(`${BASE_URL}/api/register/`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(form)

            })
            const data= await res.json()
            if(res.ok){
                saveToken(data)
                setMsg("Registered successful. Redirecting...")
                setTimeout(()=>{
                    navigate('/login')
                },800)
            }else{
                setMsg("Sign Up failed")
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
                type="text" 
                name='email'
                onChange={handleChange}
                value={form.email}
                placeholder='email'
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
                <input 
                type="password" 
                name='password2'
                onChange={handleChange}
                value={form.password2}
                placeholder='confirm password'
                required

                className='w-full p-2 border rounded'
                />

                <button className='w-full bg-blue-600 text-white py-2 rounded'>
                   Sign Up
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

export default SignUp