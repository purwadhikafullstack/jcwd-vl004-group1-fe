import React from "react";

const SubmitAddressButton = ({ submitAddress }) => {
  const addressId = localStorage.getItem("addressId")
    ? JSON.parse(localStorage.getItem("addressId"))
    : null;

  return (
    <div>
      {addressId ? (
        <button
          onClick={submitAddress}
          className="mt-4 btn btn-block btn-accent text-white"
        >
          PROCEED TO PAYMENT
        </button>
      ) : (
        <div className="text-center">
          <label
            className="mt-4 btn btn-block btn-accent text-white"
            htmlFor={"my-modal-5"}
          >
            PROCEED TO PAYMENT
          </label>

          <input type="checkbox" id={"my-modal-5"} className="modal-toggle" />
          <label htmlFor={"my-modal-5"} className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <div className="space-y-4">
                <h1 className="font-bold text-accent">No selected address</h1>
                <h3 className="text-md font-bold">
                  Default address will be selected,
                </h3>
                <h3 className="text-md">Is that okay?</h3>
              </div>

              <div className="space-x-2 mt-4 flex justify-center">
                <button
                  className="btn btn-accent text-white"
                  onClick={submitAddress}
                >
                  PROCEED
                </button>
                <label
                  className="btn btn-error text-white"
                  htmlFor={"my-modal-5"}
                >
                  CHOOSE ANOTHER ADDRESS
                </label>
              </div>
            </label>
          </label>
        </div>
      )}
    </div>
  );
};

export default SubmitAddressButton;
