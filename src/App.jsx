import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductScreen from "./pages/productScreen";
import CategoriesScreen from "./pages/CategoriesScreen";
import AddProduct from "./pages/AddProduct";
import ProductEditScreen from "./pages/ProductEditScreen";

import Authentication from "./pages/Auth/Authentication";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import AdminLogin from "./pages/AdminAuth/AdminLogin";

import Home from "./pages/User/Home";
import Catalog from "./pages/User/Catalog";
import Details from "./pages/User/Details";

import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios"
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()
  const userLocalStorage = localStorage.getItem("userDataEmmerce")
  const userKeepLogin = () => {
    console.log(userLocalStorage)
    Axios.post(`http://localhost:9990/users/auth`, {}, {
      headers: {
        'Authorization': `Bearer ${userLocalStorage}`
      }
    })
      .then((res) => {
        console.log(res)
        dispatch({
          type: "USER_KEEP_LOGIN",
          payload: res.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    userKeepLogin()
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/category" element={<CategoriesScreen />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/product/edit/:id" element={<ProductEditScreen />} />

          <Route path="/authentication/:token" element={<Authentication />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLogin />} />

          <Route path="/catalog" element={<Catalog />} />
          <Route path="/detail/:id" element={<Details />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
