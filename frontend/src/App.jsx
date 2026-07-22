import React from 'react'
import ProductList from './pages/ProductList.jsx'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductDetails from './pages/ProductDetails.jsx'
import CartPage from './pages/CartPage.jsx'
import Navbar from './components/Navbar.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import Login from './pages/Login.jsx'
import PrivateRouter from './components/PrivateRouter.jsx'
import SignUp from './pages/SignUp.jsx'



function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<ProductList/>}/>
        <Route path='/product/:id' element={<ProductDetails/>} />
        <Route path='/cart' element={<CartPage/>}/>
        
        <Route element={<PrivateRouter/>}>
        
        <Route path='/checkout' element={<CheckoutPage/>}/>
        </Route>
      </Routes>
    </Router>

  )
}

export default App