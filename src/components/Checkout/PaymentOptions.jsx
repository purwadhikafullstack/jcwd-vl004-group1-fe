import React from "react";

const PaymentOptions = () => {
  return (
    <div className=" w-full rounded-xl shadow-sm ">
      <div className="p-3 rounded-t-xl">
        <div className="flex flex-col">
          <div className="space-x-2">
            <h2 className="font-bold">Cart Summary</h2>
          </div>
          <span className="border-1 w-full mt-2"></span>
          <div className="flex flex-col mt-4 space-y-4">
            <h2 className="mb-2">Please check twice before you checkout</h2>
            <div className="form-control rounded-xl border-0 ">
              <div className="flex justify-between w-full items-center">
                <div className="flex space-x-4">
                  <img
                    src="https://www.yayasansimetri.or.id/wp-content/uploads/2021/03/Logo-BCA-blue-A4.png"
                    alt=""
                    className="w-12"
                  />
                  <div className="flex flex-col">
                    <span className="label-text text-left">
                      BCA Bank Transfer
                    </span>
                    <span className="label-text text-sm text-gray-400">
                      360037812 a.n E-Commerce
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="radio-6"
                  className="radio checked:bg-accent items-end"
                  checked
                />
              </div>
            </div>
            <div className="form-control rounded-xl border-0">
              <div className="flex justify-between w-full items-center ">
                <div className="flex space-x-4">
                  <img
                    src="https://mpng.subpng.com/20180815/ab/kisspng-bank-mandiri-depok-logo-bank-mandiri-semarang-kred-5b74ed29b6a585.5966533915343895457481.jpg"
                    alt=""
                    className="w-12"
                  />
                  <div className="flex flex-col">
                    <span className="label-text text-left">
                      Mandiri Bank Transfer
                    </span>
                    <span className="label-text text-gray-400">
                      8256000378274 a.n E-Commerce
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="radio-6"
                  className="radio checked:bg-accent"
                  checked
                />
              </div>
            </div>
            <div className="form-control rounded-xl border-0">
              <div className="flex justify-between w-full items-center ">
                <div className="flex space-x-4">
                  <img
                    src="https://download.logo.wine/logo/PayPal/PayPal-Logo.wine.png"
                    alt=""
                    className="w-12"
                  />
                  <div className="flex flex-col">
                    <span className="label-text text-left">Paypal</span>
                    <span className="label-text text-sm text-gray-400">
                      You will be redirected to PayPal website to complete your
                      purchase securely.
                    </span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="radio-6"
                  className="radio checked:bg-accent"
                  checked
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
