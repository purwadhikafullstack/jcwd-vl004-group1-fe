import React, { useState, useEffect } from "react";
import {
  getPaymentCookie,
  getShipmentCookie,
  getAddressCookie,
} from "../../hooks/getCookie";
import { AiOutlineCheck } from "react-icons/ai";
import { API_URL } from "../../constant/api";
import { setShipmentCookie } from "../../hooks/setCookie";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Axios from "axios";

const TablePayment = ({ setCartItems, setChange }) => {
  const [shipmentOptions, setShipmentOption] = useState([]);
  const [selectedShipmentId, setSelectedShipmentId] = useState("");

  const userGlobal = useSelector((state) => state.user);

  const paymentCookie = getPaymentCookie()
    ? JSON.parse(getPaymentCookie())
    : null;

  const shipmentCookie = getShipmentCookie()
    ? JSON.parse(getShipmentCookie())
    : null;

  useEffect(() => {
    const getShipments = async () => {
      try {
        const results = await Axios.get(`${API_URL}/carts/getshipmentoptions`);
        setShipmentOption(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getShipments();
  }, []);

  useEffect(() => {
    const setShipmentOptionsCookie = async () => {
      try {
        if (selectedShipmentId) {
          const results = await Axios.get(
            `${API_URL}/carts/getshipmentoption/${selectedShipmentId}`
          );
          setShipmentCookie(JSON.stringify(results.data));
        }
      } catch (err) {
        console.log(err);
      }
    };
    setShipmentOptionsCookie();
  }, [selectedShipmentId]);

  const selectShipmentOptions = () => {
    return shipmentOptions?.map((val) => {
      return (
        <div className="form-control rounded-xl border-0 ">
          <div className="flex justify-between w-full items-center">
            <div className="flex space-x-4">
              <img src={val.logo} alt="" className="w-1/5" />
              <div className="flex flex-col">
                <span className="label-text text-left">{val.name}</span>
                <span className="label-text text-sm text-gray-400">
                  {val.description}
                </span>
              </div>
            </div>
            <input
              onChange={(e) => setSelectedShipmentId(+e.target.value)}
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

  const getUserCart = async () => {
    const results = await Axios.get(`${API_URL}/carts/get/${userGlobal.id}`);
    setCartItems(results.data.carts);
  };

  const closeModal = () => {
    document.getElementById("my-modal-3").click();
    toast.success("Shipment Options Has Been Added!", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    getUserCart();
    setChange(Math.random() + 7);
  };

  const renderPaymentTable = () => {
    return (
      <>
        <div className="w-full items-end">
          <div className=" w-full rounded-xl shadow-sm">
            <div className="p-3 rounded-t-xl">
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <h2 className="font-bold">
                      {shipmentCookie
                        ? "Payment and Shipment Options"
                        : "Payment Options"}
                    </h2>{" "}
                    <span className="text-xl text-green-600">
                      <AiOutlineCheck />
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <img src={paymentCookie.logo} alt="" className="w-2/12" />
                    <div>
                      <h2 className="text-sm">{paymentCookie.name}</h2>
                      <h2 className="text-sm text-gray-400">
                        {paymentCookie.description}
                      </h2>
                    </div>
                  </div>
                </div>
                {shipmentCookie ? (
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <img
                        src={shipmentCookie.logo}
                        alt=""
                        className="w-2/12"
                      />
                      <div>
                        <h2 className="text-sm">{shipmentCookie.name}</h2>
                        <h2 className="text-sm text-gray-400">
                          {shipmentCookie.description}
                        </h2>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* SHIPMENT OPTIONS */}
              {paymentCookie ? (
                <div className={shipmentCookie ? "mt-2" : "mt-4"}>
                  <label
                    htmlFor="my-modal-3"
                    className={
                      shipmentCookie
                        ? "btn modal-button bg-accent text-white normal-case border-none w-full hover:bg-accent"
                        : "btn modal-button bg-accent text-white normal-case border-none w-full hover:bg-accent animate-bounce"
                    }
                  >
                    Choose Shipment
                  </label>

                  <input
                    type="checkbox"
                    id="my-modal-3"
                    className="modal-toggle"
                  />
                  <label htmlFor="my-modal-3" className="modal cursor-pointer">
                    <label className="modal-box relative" htmlFor="">
                      <div className=" w-full rounded-xl shadow-sm ">
                        <div className="p-3 rounded-t-xl">
                          <div className="flex flex-col">
                            <div className="space-x-2">
                              <h2 className="font-bold">Shipment Options</h2>
                            </div>
                            <span className="border-1 w-full mt-2"></span>
                            <div className="flex flex-col mt-4 space-y-4">
                              <h2 className="mb-2">
                                How would you like we to deliver?
                              </h2>
                              {selectShipmentOptions()}
                            </div>
                            <button
                              onClick={closeModal}
                              className="btn btn-sm bg-accent border-none text-white mt-4"
                            >
                              Choose Shipment
                            </button>
                          </div>
                        </div>
                      </div>
                    </label>
                  </label>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </>
    );
  };

  return renderPaymentTable();
};

export default TablePayment;
