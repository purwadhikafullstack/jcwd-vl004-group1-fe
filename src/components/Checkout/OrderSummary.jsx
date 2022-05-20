import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import {
  setAddressCookie,
  setCartCookie,
  setInvoiceHeaderIdCookie,
} from "../../hooks/setCookie";
import {
  getCartCookie,
  getAddressCookie,
  getPaymentCookie,
  getShipmentCookie,
} from "../../hooks/getCookie";
import { useNavigate, useOutletContext } from "react-router-dom";
import SubmitCartButton from "./SubmitCartButton";
import SubmitPaymentButton from "./SubmitPaymentButton";
import SubmitAddressButton from "./SubmitAddressButton";
import { API_URL } from "../../constant/api";
import { toast } from "react-toastify";
import Axios from "axios";
import {
  removeAddressCookie,
  removeCartCookie,
  removePaymentCookie,
  removeShipmentCookie,
} from "../../hooks/removeCookie";

const OrderSummary = ({ cartItems, change, setChange }) => {
  // const [change, setChange] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isConflicted, setIsConflicted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cartCookie = getCartCookie()
    ? JSON.parse(getCartCookie("selectedCart"))
    : null;
  const userGlobal = useSelector((state) => state.user);

  const addressCookie = getAddressCookie()
    ? JSON.parse(getAddressCookie("selectedAddress"))
    : null;

  const paymentCookie = getPaymentCookie()
    ? JSON.parse(getPaymentCookie("selectedPayment"))
    : null;

  const shipmentCookie = getShipmentCookie()
    ? JSON.parse(getShipmentCookie("selectedShipment"))
    : null;

  const navigate = useNavigate();
  const summaryGlobal = useSelector((state) => state.summary);

  useEffect(() => {
    const renderSubTotal = async () => {
      try {
        let total = 0;
        cartItems?.forEach((val) => {
          total += val.subtotal;
          setSubTotal(total);
        });
      } catch (err) {
        console.log(err);
      }
    };
    renderSubTotal();
  }, [cartItems]);

  useEffect(() => {
    const renderTotalPrice = () => {
      try {
        let total = 0;
        // Sementara Discountnya diilangin dulu jangan lupa
        if (shipmentCookie) {
          total = subTotal + shipmentCookie.price;
        } else {
          total = subTotal;
        }

        setTotalPrice(total);
      } catch (err) {
        console.log(err);
      }
    };
    renderTotalPrice();
  }, [cartItems, subTotal, discount]);

  useEffect(() => {
    const discountHandler = () => {
      try {
        let discountFee = 0;
        discountFee = totalPrice * 0.05;
        setDiscount(discountFee);
        setTotalPrice(totalPrice - discountFee);
      } catch (err) {
        console.log(err);
      }
    };
    discountHandler();
  }, [isClicked]);

  const submitCart = () => {
    setCartCookie(JSON.stringify(cartItems));
    setChange(Math.random());
    navigate("/cart/billing");
  };

  const submitAddress = async () => {
    try {
      const id = JSON.parse(localStorage.getItem("addressId"));

      if (!userGlobal.user_addresses.length) {
        toast.success("Please add your first address before continue", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      if (id) {
        const results = await Axios.get(`${API_URL}/users/getaddress/${id}`);
        setAddressCookie(JSON.stringify(results.data));
      } else {
        const results = await Axios.post(`${API_URL}/users/getdefaultaddress`, {
          userId: userGlobal.id,
        });
        setAddressCookie(JSON.stringify(results.data));
        toast.success("Default Address Picked", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setChange(Math.random() + 1);
      navigate("/cart/payment");
    } catch (err) {
      console.log(err);
    }
  };

  const submitCheckout = async () => {
    try {
      const results = await Axios.post(`${API_URL}/carts/checkout`, {
        total: totalPrice,
        status: "unpaid",
        userAddressId: addressCookie.id,
        shipmentMasterId: shipmentCookie.id,
        userId: userGlobal.id,
        paymentOptionId: paymentCookie.id,
      });
      setInvoiceHeaderIdCookie(JSON.stringify(results.data.id));
      setChange(change + 1);
      localStorage.removeItem("addressId");
      removeCartCookie();
      removeAddressCookie();
      removePaymentCookie();
      removeShipmentCookie();
      navigate("/cart/paymentupload", {
        replace: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const renderButton = () => {
    const cartCookie = getCartCookie() ? JSON.parse(getCartCookie()) : null;
    const addressCookie = getAddressCookie()
      ? JSON.parse(getAddressCookie())
      : null;

    if (cartCookie?.length && addressCookie?.id) {
      return <SubmitPaymentButton submitCheckout={submitCheckout} />;
    } else if (cartCookie?.length) {
      return <SubmitAddressButton submitAddress={submitAddress} />;
    } else {
      return <SubmitCartButton submitCart={submitCart} />;
    }
  };

  return (
    <>
      {cartItems?.length ? (
        <div className="flex flex-col ">
          <div className="w-full rounded-xl flex flex-col p-4 shadow-sm">
            {/* Title Order Summary */}
            <div>
              <h1 className="font-bold">Order Summary</h1>
            </div>
            <div className="space-y-6 text-sm mt-4">
              <div className="flex justify-between">
                <h2 className="text-gray-400">Sub Total</h2>
                <h2 className="font-bold">{currencyFormatter(subTotal)}</h2>
              </div>
              {/* DISCOUNT */}
              <div className="flex justify-between">
                <h2 className="text-gray-400">Discount</h2>
                {discount ? (
                  <h2 className="">{currencyFormatter(discount)}</h2>
                ) : (
                  <h2 className="">-</h2>
                )}
              </div>
              <div className="flex justify-between">
                <h2 className="text-gray-400">Shipping</h2>
                <h2 className="font-bold">
                  {shipmentCookie ? shipmentCookie.price : null}
                </h2>
              </div>
              <span className="flex border-top h-[2px] bg-slate-100 w-full"></span>
              {/* TOTAL PRICE */}
              <div className="flex justify-between">
                <div className="text-lg font-bold">
                  <h2>Total</h2>
                </div>
                <div className="">
                  <h2 className="text-lg font-bold text-red-400 text-right">
                    {currencyFormatter(totalPrice)}
                  </h2>
                  <p className="text-xs font-extralight text-right italic">
                    (PPN Included if Applicable)
                  </p>
                </div>
              </div>
              {summaryGlobal.discount ? (
                <div className="w-7/12 m-auto mt-3 rounded-lg bg-orange-50 ">
                  <h2 className="text-yellow-500 text-center italic">
                    Discount Has Been Applied!
                  </h2>
                </div>
              ) : null}
              <div className="border-2 rounded-md flex justify-between p-2">
                <h2 className="text-lg">DISCOUNT5</h2>
                {summaryGlobal.discount ? (
                  <button className="btn btn-ghost text-gray-600 bg-gray-200 btn-sm disabled">
                    Apply
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsClicked(true);
                    }}
                    className="btn btn-ghost text-accent btn-sm"
                    disabled
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mb-8">{renderButton()}</div>
        </div>
      ) : null}
    </>
  );
};

export default OrderSummary;
