import React, { useEffect, useState } from "react";
import { API_URL } from "./constant/api";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import ProductScreen from "./pages/productScreen";
import CategoriesScreen from "./pages/CategoriesScreen";
import AddProduct from "./pages/AddProduct";
import ProductEditScreen from "./pages/ProductEditScreen";
import Transaction from "./pages/Transactions";

import AdminAuthentication from "./pages/AdminAuth/AdminAuthentication";
import AdminForgotPassword from "./pages/AdminAuth/AdminForgotPassword";
import AdminRecoverPassword from "./pages/AdminAuth/AdminRecoverPassword";
import AdminRegister from "./pages/AdminAuth/AdminRegister";
import AdminLogin from "./pages/AdminAuth/AdminLogin";

import Authentication from "./pages/Auth/Authentication";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import RecoverPassword from "./pages/Auth/RecoverPassword";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import Home from "./pages/User/Home";
import Catalog from "./pages/User/Catalog";
import Details from "./pages/User/Details";

import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import CheckoutDetails from "./pages/CheckoutDetails";
import BillingDetails from "./pages/BillingDetails";
import PaymentDetails from "./pages/PaymentDetails";
import Cart from "./components/Checkout/Cart";

function App() {
  const dispatch = useDispatch();
  const userLocalStorage = localStorage.getItem("userDataEmmerce");
  const adminLocalStorage = localStorage.getItem("adminDataEmmerce");
  const userGlobal = useSelector((state) => state.user);
  const adminGlobal = useSelector((state) => state.admin);
  const [currentUser, setCurrentUser] = useState(0)

  const userKeepLogin = () => {
    Axios.post(
      `http://localhost:9990/users/auth`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userLocalStorage}`,
        },
      }
    )
      .then((res) => {
        dispatch({
          type: "USER_KEEP_LOGIN",
          payload: res.data,
        });
        dispatch({
          type: "GET_CART",
          payload: res.data.carts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const adminKeepLogin = () => {
    Axios.post(
      `http://localhost:9990/admins/auth`,
      {},
      {
        headers: {
          Authorization: `Bearer ${adminLocalStorage}`,
        },
      }
    )
      .then((res) => {
        dispatch({
          type: "ADMIN_KEEP_LOGIN",
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };



  useEffect(() => {
    userKeepLogin();
    adminKeepLogin();
  }, []);

  useEffect(() => {
    if (adminGlobal.id) {
      console.log("aku admin");
      setCurrentUser(2)
    }
    if (userGlobal.id) {
      console.log("aku user");
      setCurrentUser(1)
    }
    if (!userGlobal.id && !adminGlobal.id) {
      console.log("aku belom daftar")
      setCurrentUser(0)
    }
  }, [userGlobal, adminGlobal])



  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* PRODUCTS */}
          {currentUser === 2 ?
            <>
              <Route path="/category" element={<CategoriesScreen />} />
              <Route path="/products" element={<ProductScreen />} />
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/products/find/:id" element={<ProductEditScreen />} />
              <Route path="/transaction" element={<Transaction />} />
            </>
            :
            <>
              <Route path="*" element={<NotFound />} />
            </>
          }

          {/* CARTS */}
          {currentUser === 1 ?
            <>
              <Route path="/checkout" element={<CheckoutDetails />} />
              <Route path="/billing" element={<BillingDetails />} />
              <Route path="/payment" element={<PaymentDetails />} />
              <Route path="/cart" element={<CheckoutDetails />}>
                <Route index element={<Cart />} />
                <Route path="billing" element={<BillingDetails />} />
                <Route path="payment" element={<PaymentDetails />} />
              </Route>
              <Route path="/detail/:id" element={<Details />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/" element={<Home />} />
            </>
            :
            <>
              <Route path="*" element={<NotFound />} />
            </>
          }

          {currentUser === 0 ?
            <>
              {/* ADMIN */}
              <Route path="/adminauthentication/:token" element={<AdminAuthentication />} />
              <Route path="/adminforgotpassword" element={<AdminForgotPassword />} />
              <Route path="/adminrecoverpassword/:token" element={<AdminRecoverPassword />} />
              <Route path="/adminregister" element={<AdminRegister />} />
              <Route path="/admin" element={<AdminLogin />} />

              {/* USER */}
              <Route path="/authentication/:token" element={<Authentication />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/recoverpassword/:token" element={<RecoverPassword />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route path="/catalog" element={<Catalog />} />
              <Route path="/" element={<Home />} />
            </>
            :
            <>
              <Route path="*" element={<NotFound />} />
            </>
          }

          {/* HOMEPAGE */}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
