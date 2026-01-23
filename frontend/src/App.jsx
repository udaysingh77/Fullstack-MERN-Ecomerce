import React from 'react'
import { createBrowserRouter, RouterProvider  } from "react-router-dom"
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const router = createBrowserRouter([
  {
    path:"/",
    element:<><Navbar></Navbar><Home></Home></>
  }
])
const App = () => {
  return (
    <>
      <RouterProvider router={router}>
        <Home></Home>
        <Signup></Signup>
        <Login></Login>
      </RouterProvider>
    </>
  )
}

export default App