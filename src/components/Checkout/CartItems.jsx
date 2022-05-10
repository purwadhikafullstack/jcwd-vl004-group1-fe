import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { API_URL } from "../../constant/api";
import { debounce } from "throttle-debounce";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useSelector } from "react-redux";
import { getCartCookie } from "../../hooks/getCookie";
import { setCartCookie } from "../../hooks/setCookie";
import { toast } from "react-toastify";
import {
  removeAddressCookie,
  removeCartCookie,
  removePaymentCookie,
  removeShipmentCookie,
} from "../../hooks/removeCookie";

const CartItems = ({ val, setCartItems, cartItems }) => {
  let [quantity, setQuantity] = useState(val.quantity);

  const userGlobal = useSelector((state) => state.user);
  const userId = userGlobal.id;
  const stockReady = val.product.warehouse_products[0].stock_ready;
  const getCart = getCartCookie() ? JSON.parse(getCartCookie()) : null;

  const getUserCart = async () => {
    const results = await Axios.get(`${API_URL}/carts/get/${userGlobal.id}`);
    setCartItems(results.data.carts);
  };

  const onDeleteCart = async (id) => {
    try {
      const results = await Axios.post(`${API_URL}/carts/delete/${id}`, {
        userId,
      });
      toast.success("Delete Successfull", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setCartItems(results.data);
      if (getCart) setCartCookie(JSON.stringify(results.data));
    } catch (err) {
      console.log(err);
    }
  };

  const qtyHandler = useCallback(
    debounce(1000, async (quantity) => {
      const results = await Axios.patch(`${API_URL}/carts/quantity/${val.id}`, {
        userId,
        quantity,
      });
      setCartItems(results.data.getUserCart);

      if (getCart) setCartCookie(JSON.stringify(results.data.getUserCart));
    }),
    []
  );

  useEffect(() => {
    let maxQty = quantity;

    if (maxQty > stockReady) {
      maxQty = stockReady;
    } else {
      qtyHandler(quantity);
    }
  }, [quantity]);

  return (
    <tr className="text-center h-20 border-none">
      <td>
        <div className="flex items-center space-x-2">
          <div>
            <img
              className="mask mask-squircle w-20"
              src={`${API_URL}/${val.product.product_image}`}
            />
          </div>
          <div className="space-y-2">
            <div>
              <p className="font-bold text-left">{val.product.name}</p>
            </div>
            <div className="flex">
              <div>
                <p className="text-gray-400">
                  Size: <span className="text-black">9</span>
                </p>
              </div>
              <span className="border-1 h-5 mx-2"></span>
              <div>
                <p className="text-gray-400">
                  Color:
                  <span className="text-black"> Green</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="text-left">{currencyFormatter(val.product.price)}</td>
      <td className="text-left">
        <div>
          <div className="flex border-1 rounded-md space-x-4 items-center justify-center align-middle">
            <button
              className={`${
                quantity === 1 ? "text-4xl text-gray-400" : "text-4xl"
              }`}
              onClick={() =>
                quantity === 1 ? (quantity = 1) : setQuantity(quantity - 1)
              }
            >
              -
            </button>
            <span className="text-1xl">{quantity}</span>
            <button
              className={`${
                quantity === stockReady
                  ? "text-2xl hover:pointer-events-none text-gray-400"
                  : "text-2xl"
              }`}
              onClick={() =>
                quantity === stockReady
                  ? (quantity = stockReady)
                  : setQuantity(quantity + 1)
              }
            >
              +
            </button>
          </div>
          <div>
            <p className="text-gray-400 text-xs text-center mt-1">
              available: {stockReady}
            </p>
            {quantity === stockReady ? (
              <p className="text-white bg-accent text-xs text-center mt-1">
                Limited Stock
              </p>
            ) : null}
          </div>
        </div>
      </td>
      <td className="text-center">{currencyFormatter(val.subtotal)}</td>

      <td>
        <i
          onClick={() => onDeleteCart(val.id)}
          className="hover:cursor-pointer fas fa-trash-alt"
        ></i>
      </td>
    </tr>
  );
};

export default CartItems;
