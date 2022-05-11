import React, { useState, useEffect } from "react";
import {
  getAddressCookie,
  getCartCookie,
  getPaymentCookie,
  getShipmentCookie,
} from "../../hooks/getCookie";
import { API_URL } from "../../constant/api";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const PaymentUploader = ({ cartItems, setCartItems }) => {
  const [payment_proof, setPayment_Proof] = useState();
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [invoiceHeaderId, setInvoiceHeaderId] = useState(0);

  const userGlobal = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getCart = getCartCookie()
    ? JSON.parse(getCartCookie("selectedCart"))
    : null;

  const paymentCookie = getPaymentCookie()
    ? JSON.parse(getPaymentCookie())
    : null;

  const addressCookie = getAddressCookie()
    ? JSON.parse(getAddressCookie())
    : null;

  const shipmentCookie = JSON.parse(getShipmentCookie());

  useEffect(() => {
    const renderSubTotal = async () => {
      try {
        let total = 0;
        getCart?.forEach((val) => {
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
        total = subTotal - discount;

        setTotalPrice(total);
      } catch (err) {
        console.log(err);
      }
    };
    renderTotalPrice();
  }, [cartItems, subTotal, discount]);

  const onSubmitImg = async () => {
    try {
      const formData = new FormData();
      formData.append("payment_proof", payment_proof);
      formData.append("invoiceHeaderId", invoiceHeaderId);
      console.log(formData);

      const results = await Axios.post(
        `${API_URL}/carts/addpaymentproof`,
        formData
      );
      console.log(results.data);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-1/2 flex flex-col shadow-md space-y-2 p-3">
      {/* INVOICE SENDER LIST */}
      <div className="flex justify-between mx-3">
        <div className="">
          <img
            className="w-32"
            src="http://localhost:3000/images/logo.jpg"
            alt=""
          />
        </div>
        <div className="space-y-1">
          <h1 className="font-bold">FOR</h1>
          <p className="text-sm">
            Buyer: <span className="font-bold">{userGlobal.full_name}</span>
          </p>
          <p className="text-sm mt-2">Address: </p>
          <p className="text-sm">{addressCookie.address_line}</p>
          <p className="text-sm">{addressCookie.city}</p>
          <p className="text-sm">{addressCookie.province}</p>
          <p className="text-sm font-bold">{addressCookie.postal_code}</p>
        </div>
      </div>
      {/* INVOICE PRODUCT LIST */}
      <div className="flex flex-col">
        <div className="border-y-1 bg-accent border-black flex justify-between">
          <div className="ml-3 text-white font-bold">Product List</div>
          <div className="mr-3 text-white font-bold">Subtotal</div>
        </div>
        {getCart?.map((val) => {
          return (
            <div className="form-control rounded-xl border-0">
              <div className="flex justify-between w-full items-center">
                <div className="flex space-x-6">
                  <div className="flex flex-col">
                    <span className="label-text text-left">
                      {val.product.name}
                    </span>
                    <span className="label-text text-sm text-gray-400">
                      {val.quantity} x {currencyFormatter(val.product.price)}
                    </span>
                  </div>
                </div>
                <h2 className="text-sm text-gray-400 font-bold">
                  {currencyFormatter(val.subtotal)}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
      {/* PRODUCT SUMMARY */}
      <div className=" w-full rounded-xl ">
        <div className="rounded-t-xl">
          <div className="flex justify-between border-t-2 border-black">
            <div className="ml-2 mt-2 space-y-2">
              <h1 className="text-sm font-bold">Shipment Option</h1>
              <div className="text-sm">
                <p>{shipmentCookie.name}</p>
                <p>{shipmentCookie.description}</p>
              </div>
            </div>
            <div className="mr-2 flex justify-between w-4/12 mt-2">
              <div className="text-sm font-bold space-y-2">
                <h1>Subtotal</h1>
                <h1>Shipment Fee</h1>
                <h1>Total Price</h1>
              </div>
              <div className="text-sm text-gray-400 space-y-2 font-bold">
                <h1>{currencyFormatter(subTotal)}</h1>
                <h1>{currencyFormatter(shipmentCookie.price)}</h1>
                <h1>{currencyFormatter(totalPrice)}</h1>
              </div>
            </div>
          </div>
          {/* INVOICE UPLOAD IMAGE */}
          <div className="flex flex-col mt-4 mb-2">
            <h2 className="font-bold text-center">
              Please finish your payment to :
            </h2>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-28">
                <img src={paymentCookie.logo} alt="" />
              </div>
              <div className="text-center space-y-2 text-sm">
                <h2 className="font-bold text-error text-lg">
                  {currencyFormatter(totalPrice)}
                </h2>
                <h2>{paymentCookie.name}</h2>
                <h2>{paymentCookie.description}</h2>
              </div>
              <div className="w-1/3 border-1">
                {/* <img src={paymentCookie.logo} alt="" /> */}
              </div>
              <div className="mb-2 text-center items-center input-group-sm">
                <label className="form-label">Upload Payment Proof</label>
                <input
                  className="form-control mt-1"
                  type="file"
                  //   size="lg"
                  name="payment_proof"
                  id="fileName"
                  onChange={(e) => setPayment_Proof(e.target.files[0])}
                />
                <button
                  onClick={onSubmitImg}
                  className="btn btn-accent text-white mt-4"
                >
                  Submit Proof
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentUploader;
