import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../../constant/api.js";
import { getCartCookie, getPaymentCookie } from "../../hooks/getCookie.js";
import { currencyFormatter } from "../../helpers/currencyFormatter.js";
import { setPaymentCookie, setShipmentCookie } from "../../hooks/setCookie.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

const PaymentSummary = () => {
  const [cartItems, setCartItems] = useOutletContext();
  const [shipmentOptions, setShipmentOption] = useState([]);
  const [paymentOptions, setPaymentOption] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [selectedPaymentId, setSelectedPaymentId] = useState("");
  const [selectedShipmentId, setSelectedShipmentId] = useState("");

  const userGlobal = useSelector((state) => state.user);
  const getCart = getCartCookie() ? JSON.parse(getCartCookie()) : null;
  const paymentCookie = getPaymentCookie()
    ? JSON.parse(getPaymentCookie())
    : null;

  const getUserCart = async () => {
    const results = await Axios.get(`${API_URL}/carts/get/${userGlobal.id}`);
    setCartItems(results.data.carts);
  };

  const closeModal = () => {
    document.getElementById("my-modal-4").click();
    toast.success("Payment Options Has Been Added!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    getUserCart();
  };

  useEffect(() => {
    const setPaymentOptionsCookie = async () => {
      try {
        if (selectedPaymentId) {
          const results = await Axios.get(
            `${API_URL}/carts/getpaymentoption/${selectedPaymentId}`
          );
          setPaymentCookie(JSON.stringify(results.data));
        }
      } catch (err) {
        console.log(err);
      }
    };
    setPaymentOptionsCookie();
  }, [selectedPaymentId]);

  useEffect(() => {
    const getPaymentOption = async () => {
      try {
        const results = await Axios.get(`${API_URL}/carts/getpaymentoptions`);
        setPaymentOption(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPaymentOption();
  }, []);

  const selectPaymentOptions = () => {
    return paymentOptions?.map((val) => {
      return (
        <div className="form-control rounded-xl border-0 ">
          <div className="flex justify-between w-full items-center">
            <div className="flex space-x-4">
              <img src={val.logo} alt="" className="w-12" />
              <div className="flex flex-col">
                <span className="label-text text-left">{val.name}</span>
                <span className="label-text text-sm text-gray-400">
                  {val.description}
                </span>
              </div>
            </div>
            <input
              onChange={(e) => setSelectedPaymentId(+e.target.value)}
              value={val.id}
              type="radio"
              name="radio-6"
              className="radio checked:bg-accent items-end"
            />
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    const cartItemsQty = () => {
      let total = 0;
      getCart.forEach((val) => {
        total += val.quantity;
        setQuantity(total);
      });
    };
    cartItemsQty();
  }, []);

  return (
    <>
      <div className="w-1/2 flex flex-col space-y-2">
        {/* PRODUCT SUMMARY */}
        <div className=" w-full rounded-xl shadow-sm ">
          <div className="p-3 rounded-t-xl">
            <div className="flex flex-col">
              <h2 className="font-bold">Here is your Order Details :</h2>
              <div className="flex justify-between items-center">
                <span className="flex border-top bg-gray-400 h-[2px] w-[225px]"></span>
                <div className=" flex justify-between">
                  <label
                    htmlFor="my-modal-4"
                    className={
                      paymentCookie
                        ? "btn modal-button bg-accent text-white normal-case border-none w-full hover:bg-accent"
                        : "btn modal-button bg-accent text-white normal-case border-none w-full hover:bg-accent animate-bounce"
                    }
                  >
                    Choose Payment
                  </label>

                  <input
                    type="checkbox"
                    id="my-modal-4"
                    className="modal-toggle"
                  />
                  <label htmlFor="my-modal-4" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                      <div className=" w-full rounded-xl shadow-sm ">
                        <div className="p-3 rounded-t-xl">
                          <div className="flex flex-col">
                            <div className="space-x-2">
                              <h2 className="font-bold">Payment Options</h2>
                            </div>
                            <span className="border-1 w-full mt-2"></span>
                            <div className="flex flex-col mt-4 space-y-4">
                              <h2 className="mb-2">
                                How would you like to pay?
                              </h2>
                              {selectPaymentOptions()}
                            </div>
                            <button
                              onClick={closeModal}
                              className="btn btn-sm bg-accent border-none text-white mt-4"
                            >
                              Choose Payment
                            </button>
                          </div>
                        </div>
                      </div>
                    </label>
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="mb-2 text-sm">
                  Please re-check before proceeding
                </p>

                {/* CART LIST STARTS HERE */}
                <h2 className="text-sm mb-4">
                  Total:{" "}
                  <span className="font-bold text-accent">{quantity}</span>{" "}
                  Items
                </h2>
                {getCart?.map((val) => {
                  return (
                    <div className="form-control rounded-xl border-0 ">
                      <div className="flex justify-between w-full items-center">
                        <div className="flex space-x-4">
                          <img
                            src={`${API_URL}/${val.product.product_image}`}
                            alt=""
                            className="w-12"
                          />
                          <div className="flex flex-col">
                            <span className="label-text text-left">
                              {val.product.name}
                            </span>
                            <span className="label-text text-sm text-gray-400">
                              {val.quantity} x{" "}
                              {currencyFormatter(val.product.price)}
                            </span>
                            <div className="mt-2">
                              <span className="flex border-top h-[1px] bg-slate-200 w-80"></span>
                            </div>
                          </div>
                        </div>
                        <h2 className="text-sm text-accent font-bold">
                          {currencyFormatter(val.subtotal)}
                        </h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSummary;
