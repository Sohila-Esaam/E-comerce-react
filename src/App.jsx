import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import About from './components/About/About'
import Products from './components/Products/Products'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Brands from './components/Brands/Brands'
import NotFound from './components/NotFound/NotFound'
import Categories from './components/Categories/Categories'
import Cart from './components/Cart/Cart'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CartContextProvider } from './Context/CartContext'
import Payment from './components/Payment/Payment'
import AllOrders from './components/AllOrders/AllOrders'
import CategoryDetails from './components/CategoryDetails/CategoryDetails'
import BrandDetails from './components/BrandDetails/BrandDetails'
import WishList from './components/WishList/WishList'
import WishListContextProvider from './Context/WishListContext'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import VerifyResetCode from './components/VerifyResetCode/VerifyResetCode'
import ResetPassword from './components/ResetPassword/ResetPassword'


const query = new QueryClient()


let routes = createBrowserRouter([
    {path: '/' , element: <Layout /> , children: [
      {path: '/home' , element: <ProtectedRoute><Home /></ProtectedRoute>},
      {path: '/about' , element: <ProtectedRoute><About /></ProtectedRoute>},
      {path: '/products' , element: <ProtectedRoute><Products /></ProtectedRoute>},
      {path: '/productDetails/:id/:category' , element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
      {path: '/brands' , element: <ProtectedRoute><Brands /></ProtectedRoute>},
      {path: '/brandDetails/:id' , element: <ProtectedRoute><BrandDetails /></ProtectedRoute>},
      {path: '/cart' , element: <ProtectedRoute><Cart /></ProtectedRoute>},
      {path: '/categories' , element: <ProtectedRoute><Categories /></ProtectedRoute>},
      {path: '/categoryDetails/:id' , element: <ProtectedRoute><CategoryDetails /></ProtectedRoute>},
      {path: '/payment' , element: <ProtectedRoute><Payment /></ProtectedRoute>},
      {path: '/allorders' , element: <ProtectedRoute><AllOrders /></ProtectedRoute>},
      {path: '/wishlist' , element: <ProtectedRoute><WishList /></ProtectedRoute>},
      {path: '/forgetPassword' , element: <ForgetPassword />},
      {path: '/verifyResetCode' , element: <VerifyResetCode />},
      {path: '/resetPassword' , element: <ResetPassword />},
      {path: '/register' , element: <Register />},
      {index: true , element: <Login /> },
      {path: '*' , element: <NotFound />},
    ]}
  ])

function App() {
  
  return (
    <>
    <QueryClientProvider client={query}>
      <Toaster />
      <UserContextProvider>
        <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider  router={routes}></RouterProvider>
          </WishListContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
