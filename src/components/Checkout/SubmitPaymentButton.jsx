import React, { useState, useEffect } from "react";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import {
  getCartCookie,
  getAddressCookie,
  getPaymentCookie,
  getShipmentCookie,
} from "../../hooks/getCookie";

const SubmitPaymentButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkoutBtn = async () => {
    try {
      setIsLoading(true);
      const results = await Axios.post(`${API_URL}/carts/checkout, {

      }`);
    } catch (err) {
      console.log(err);
    }
  };
  const cartCookie = getCartCookie() ? JSON.parse(getCartCookie()) : null;

  const addressCookie = getAddressCookie()
    ? JSON.parse(getAddressCookie())
    : null;

  const paymentCookie = getPaymentCookie()
    ? JSON.parse(getPaymentCookie())
    : null;

  const shipmentCookie = getShipmentCookie()
    ? JSON.parse(getShipmentCookie())
    : null;

  return (
    <button
      className={
        cartCookie && addressCookie && paymentCookie && shipmentCookie
          ? "mt-4 btn btn-block btn-accent text-white animate-bounce"
          : "mt-4 btn btn-block btn-accent text-white disabled"
      }
    >
      CHECKOUT
    </button>
  );
};

export default SubmitPaymentButton;
