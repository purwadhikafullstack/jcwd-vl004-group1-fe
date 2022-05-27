import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { API_URL } from "../constant/api";
import OrderProgress from "../components/Checkout/OrderProgress";
import OrderSummary from "../components/Checkout/OrderSummary";
import TableAddress from "../components/Checkout/TableAddress";
import TablePayment from "../components/Checkout/TablePayment";
import Axios from "axios";
import {
  getAddressCookie,
  getCartCookie,
  getInvoiceHeaderIdCookie,
  getPaymentCookie,
  getShipmentCookie,
} from "../hooks/getCookie";
import Header from "../components/HeaderUser";
import Footer from "../components/Footer";
import {
  removeAddressCookie,
  removeCartCookie,
  removePaymentCookie,
  removeShipmentCookie,
} from "../hooks/removeCookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setInvoiceHeaderIdCookie } from "../hooks/setCookie";

const CheckoutDetails = () => {
  const [change, setChange] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const userGlobal = useSelector((state) => state.user);

  const navigate = useNavigate();

  const addressCookie = getAddressCookie()
    ? JSON.parse(getAddressCookie())
    : null;

  const paymentCookie = getPaymentCookie()
    ? JSON.parse(getPaymentCookie())
    : null;

  const invoiceHeaderId = getInvoiceHeaderIdCookie()
    ? JSON.parse(getInvoiceHeaderIdCookie("selectedInvoiceHeaderId"))
    : null;

  useEffect(() => {
    const getCart = async () => {
      try {
        const results = await Axios.post(
          `${API_URL}/carts/get/${userGlobal.id}`,
          {
            userId: userGlobal.id,
          }
        );
        if (results.data.unpaidInvoice) {
          setInvoiceHeaderIdCookie(
            JSON.stringify(results.data.unpaidInvoice.id)
          );
          setTimeout(
            navigate("/cart/paymentupload", {
              replace: true,
            }),
            5000
          );
          toast.success("Please complete your previous transaction first", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          console.log(results.data.carts);
          setCartItems(results.data.carts);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getCart();
  }, [userGlobal]);

  return (
    <>
      <Header />
      <div
        style={{
          backgroundImage: invoiceHeaderId
            ? `url(https://www.dropbox.com/s/lpdaewpet58mawn/002.png?dl=1)`
            : `url(https://wallpaperaccess.com/full/1448083.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: invoiceHeaderId ? 750 : 350,
          backgroundPositionY: invoiceHeaderId ? 180 : 80,
          backgroundPositionX: invoiceHeaderId ? -250 : -50,
          opacity: 80,
        }}
      >
        {getInvoiceHeaderIdCookie() ? null : (
          <OrderProgress cartItems={cartItems} />
        )}
        <div className="flex w-screen space-x-4 pt-5 justify-end pr-48">
          <Outlet context={[cartItems, setCartItems, change, setChange]} />
          {getInvoiceHeaderIdCookie() ? null : (
            <div className="w-3/12 space-y-4 flex flex-col">
              {addressCookie && <TableAddress />}
              {paymentCookie && <TablePayment setChange={setChange} />}
              <OrderSummary
                cartItems={cartItems}
                setCartItems={setCartItems}
                change={change}
                setChange={setChange}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutDetails;
