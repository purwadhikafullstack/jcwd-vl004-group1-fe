import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import { API_URL } from "../../constant/api";
import { debounce } from "throttle-debounce";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useSelector } from "react-redux";
import { getCartCookie } from "../../hooks/getCookie";
import { setCartCookie } from "../../hooks/setCookie";
import { toast } from "react-toastify";

const CartItems = ({ val, setCartItems, cartItems }) => {
  let [quantity, setQuantity] = useState(val.quantity);

  const userGlobal = useSelector((state) => state.user);
  const userId = userGlobal.id;
  const getCart = getCartCookie() ? JSON.parse(getCartCookie()) : null;

  const onDeleteCart = async (id) => {
    try {
      const results = await Axios.post(`${API_URL}/carts/delete/${id}`, {
        userId,
      });
      toast.success("One of your Cart Item has been deleted", {
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
      setCartItems(results.data);

      if (getCart) setCartCookie(JSON.stringify(results.data));
    }),
    []
  );

  useEffect(() => {
    let maxQty = quantity;

    if (maxQty > +val.totalQty) {
      maxQty = +val.totalQty;
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
              disabled={quantity >= +val.totalQty}
              className={
                val.quantity >= +val.totalQty
                  ? "text-2xl text-gray-400 hover:pointer-events-none"
                  : "text-2xl text-black"
              }
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <div>
            <p className="text-gray-400 text-xs text-center mt-1">
              available: {+val.totalQty}
            </p>
            {quantity === +val.totalQty ? (
              <p className="text-white bg-accent text-xs text-center mt-1">
                Limited Stock
              </p>
            ) : quantity > +val.totalQty ? (
              <p className="text-white bg-error text-xs text-center mt-1">
                Need Adjusting
              </p>
            ) : null}
          </div>
        </div>
      </td>
      <td className="text-center">{currencyFormatter(val.subtotal)}</td>

      <td>
        <label
          className="hover:cursor-pointer fas fa-trash-alt modal-btn"
          htmlFor={`my-modal-${val.id}`}
        ></label>

        <input
          type="checkbox"
          id={`my-modal-${val.id}`}
          className="modal-toggle"
        />
        <label htmlFor={`my-modal-${val.id}`} className="modal cursor-pointer">
          <label className="modal-box relative" htmlFor="">
            <h3 className="text-lg font-bold">Deleting Cart</h3>
            <h3 className="text-lg">
              Are you sure you want to delete the item?
            </h3>
            <div className="space-x-2 mt-4">
              <button
                className="btn btn-accent text-white"
                onClick={() => onDeleteCart(val.id)}
              >
                Proceed
              </button>
              <label
                className="btn btn-error text-white"
                htmlFor={`my-modal-${val.id}`}
              >
                Cancel
              </label>
            </div>
          </label>
        </label>
      </td>
    </tr>
  );
};

export default CartItems;
