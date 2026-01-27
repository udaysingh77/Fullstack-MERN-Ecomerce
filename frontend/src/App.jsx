import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar></Navbar>
        <Home></Home>
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Signup></Signup>
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login></Login>
      </>
    ),
  },
  {
    path: "/verify",
    element: (
      <>
        <Verify></Verify>
      </>
    ),
  },
  {
    path: "/verifyEmail/:token",
    element: (
      <>
        <VerifyEmail></VerifyEmail>
      </>
    ),
  },
]);
const App = () => {
  return (
    <>
      <RouterProvider router={router}>
        <Home></Home>
        <Signup></Signup>
        <Login></Login>
      </RouterProvider>
    </>
  );
};

export default App;
