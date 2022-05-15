import React, { useState, useEffect } from "react";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getCartCookie,
  getAddressCookie,
  getPaymentCookie,
  getShipmentCookie,
} from "../../hooks/getCookie";

const SubmitPaymentButton = ({ submitCheckout }) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
      onClick={submitCheckout}
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
