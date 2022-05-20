import React, { useState, useEffect } from "react";
import {
  getAddressCookie,
  getCartCookie,
  getInvoiceHeaderIdCookie,
  getPaymentCookie,
  getShipmentCookie,
} from "../../hooks/getCookie";
import { API_URL } from "../../constant/api";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Axios from "axios";
import { removeInvoiceHeaderIdCookie } from "../../hooks/removeCookie";
import { useNavigate } from "react-router-dom";

const PaymentUploader = () => {
  const [previewImage, setPreviewImage] = useState(
    "https://fakeimg.pl/300x200/"
  );
  const [cartItems, setCartItems] = useState([]);
  const [payment_proof, setPayment_Proof] = useState("");
  const [paymentProofPreview, setPaymentProofPreview] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [pending, setPending] = useState("pending");
  const [data, setData] = useState({});

  const navigate = useNavigate();

  console.log(paymentProofPreview);

  const invoiceHeaderId = getInvoiceHeaderIdCookie()
    ? JSON.parse(getInvoiceHeaderIdCookie())
    : null;

  console.log(invoiceHeaderId);

  const userGlobal = useSelector((state) => state.user);

  useEffect(() => {
    const getInvoiceHeader = async () => {
      try {
        const results = await Axios.get(
          `${API_URL}/carts/getinvoiceheader/${invoiceHeaderId}`
        );
        setData(results.data);
        setCartItems(results.data.invoice_details);
        console.log(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getInvoiceHeader();
  }, []);

  useEffect(() => {
    try {
      const getPaymentProof = async () => {
        const results = await Axios.get(
          `${API_URL}/carts/getpaymentproof/${invoiceHeaderId}`
        );
        setPaymentProofPreview(results.data.payment_proof);
      };
      getPaymentProof();
    } catch (err) {
      console.log(err);
    }
  }, []);

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
        total = subTotal - discount;

        setTotalPrice(total);
      } catch (err) {
        console.log(err);
      }
    };
    renderTotalPrice();
  }, [cartItems, subTotal, discount]);

  const closeModal = () => {
    document.getElementById("my-modal-3").click();
  };

  const handleImage = (e) => {
    const value = e.target.files[0];
    setPayment_Proof(value);
    setPreviewImage(URL.createObjectURL(value));
  };

  const onSubmitProof = async () => {
    try {
      const formData = new FormData();

      formData.append("payment_proof", payment_proof);
      formData.append("invoiceHeaderId", invoiceHeaderId);
      formData.append("userId", userGlobal.id);
      formData.append("status", pending);

      const results = await Axios.post(
        `${API_URL}/carts/addpaymentproof`,
        formData
      );
      toast.success(
        "Upload Image Successful, Redirect Automatically to Homepage",
        {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      removeInvoiceHeaderIdCookie();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const onCancelTransaction = async () => {
    try {
      const results = await Axios.update(`${API_URL}/carts/canceltransaction`);
      removeInvoiceHeaderIdCookie();
      navigate("/");
      toast.success("Transaction has been canceled, returning to Homepage", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-1/2 flex flex-col shadow-md space-y-2 p-10 mb-10">
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
            <p className="text-sm">
              {data.user_address?.address_line} , {data.user_address?.province},{" "}
              {data.user_address?.city}
            </p>
            <p className="text-sm">
              {data.user_address?.district}, {data.user_address?.postal_code}
            </p>
          </div>
          <div>
            <h1 className="text-sm font-bold mb-2">
              The package will be sent from:
            </h1>
            <p className="text-sm">Warehouse:</p>
            <span>---------</span>
            <p className="text-sm">{data.warehouse?.name},</p>
            <p className="text-sm">{data.warehouse?.address},</p>
            <p className="text-sm">{data.warehouse?.city}</p>
          </div>
        </div>

        {/* INVOICE PRODUCT LIST */}
        <div className="flex flex-col">
          <div className="border-y-1 bg-accent border-black flex justify-between">
            <div className="ml-3 text-white font-bold">Product List</div>
            <div className="mr-3 text-white font-bold">Subtotal</div>
          </div>
          {cartItems?.map((val) => {
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
                  <p>{data.shipment_master?.name}</p>
                  <p>{data.shipment_master?.description}</p>
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
                  <h1>{currencyFormatter(data.shipment_master?.price)}</h1>
                  <h1>
                    {currencyFormatter(
                      totalPrice + data.shipment_master?.price
                    )}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INVOICE UPLOAD IMAGE */}
      <div className="flex flex-col h-1/2 w-3/12 shadow-md mb-2">
        <h2 className="font-bold text-center mt-4">
          Please finish your payment to :
        </h2>
        <div className="flex flex-col items-center space-y-2">
          <div className="w-20 pt">
            <img src={data.payment_option?.logo} alt="" />
          </div>
          <div className="text-center space-y-2 text-sm">
            <h2 className="font-bold text-error text-lg">
              {currencyFormatter(totalPrice + data.shipment_master?.price)}
            </h2>
            <h2>
              {data.payment_options?.name}{" "}
              <span>{data.payment_option?.description}</span>
            </h2>
          </div>
          <div className="mb-2">
            <img className="w-[300px] h-[200px]" src={previewImage} alt="" />
          </div>
          <div className="mb-2 text-center items-center input-group-sm space-x-2">
            <label className="form-label text-sm">
              Upload Your Payment Proof
            </label>
            <input
              className="form-control mt-1"
              type="file"
              size="lg"
              name="payment_proof"
              id="fileName"
              onChange={(e) => handleImage(e)}
            />
            <div className="flex items-center mt-4 space-x-2">
              <button
                onClick={onSubmitProof}
                encType="multipart/form-data"
                className={
                  payment_proof
                    ? "btn btn-accent text-white rounded-none"
                    : "btn btn-accent text-white disabled rounded-none"
                }
              >
                Submit Proof
              </button>
              <div>
                <label
                  htmlFor="my-modal-3"
                  className="btn modal-button bg-error hover:bg-red-300 text-white border-none rounded-none"
                >
                  Cancel Transaction
                </label>

                <input
                  type="checkbox"
                  id="my-modal-3"
                  className="modal-toggle"
                />
                <label htmlFor="my-modal-3" className="modal cursor-pointer">
                  <label className="modal-box relative" htmlFor="">
                    <div className=" w-full rounded-xl shadow-sm">
                      <div className="p-3 rounded-t-xl">
                        <div className="flex flex-col">
                          <div className="space-x-2">
                            <h2 className="font-bold text-lg animate-pulse">
                              Cancel your transaction?
                            </h2>
                          </div>
                          <span className="border-1 w-full mt-2"></span>
                          <div className="flex flex-col mt-4 space-y-4">
                            <h2>
                              <span className="font-bold">NOTES</span>: All of
                              your Cart Progress will be lost
                            </h2>
                            <h2>And you will be redirected to our Homepage</h2>
                            <h2>Are you sure you want to do this?</h2>
                            {/* {selectShipmentOptions()} */}
                          </div>
                          <div className="flex justify-center space-x-2">
                            <button
                              onClick={onCancelTransaction}
                              className="btn bg-accent border-none text-white mt-4"
                            >
                              Yes Please
                            </button>
                            <button
                              onClick={closeModal}
                              className="btn bg-error border-none text-white mt-4"
                            >
                              No, take me back.
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentUploader;
