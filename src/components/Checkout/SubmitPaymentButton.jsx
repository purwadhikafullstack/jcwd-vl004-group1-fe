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
    <div className="text-center">
      <label
        className={
          cartCookie && addressCookie && paymentCookie && shipmentCookie
            ? "mt-4 btn btn-block btn-accent text-white animate-bounce"
            : "mt-4 btn btn-block btn-accent text-white disabled"
        }
        htmlFor={"my-modal-5"}
      >
        CHECKOUT
      </label>

      <input type="checkbox" id={"my-modal-5"} className="modal-toggle" />
      <label htmlFor={"my-modal-5"} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <div className="space-y-4">
            <h1 className="font-bold text-accent animate-pulse">ATTENTION!</h1>
            <h3 className="text-md">
              Please make sure that all your data are correct before proceeding
              to next step, you won't be able to modified the data until
              cancellation, or finished transaction.
            </h3>
            <h3 className="font-bold text-accent">Proceed to Payment Page?</h3>
          </div>

          <div className="mt-4 items-center space-x-1">
            <button
              className="btn btn-accent text-white w-5/12"
              onClick={submitCheckout}
            >
              YES, CONTINUE TO PAYMENT
            </button>
            <label
              className="btn btn-error text-white w-5/12"
              htmlFor={"my-modal-5"}
              id="submitPaymentModal"
            >
              No, I want to change something.
            </label>
          </div>
        </label>
      </label>
    </div>
  );
};

export default SubmitPaymentButton;
