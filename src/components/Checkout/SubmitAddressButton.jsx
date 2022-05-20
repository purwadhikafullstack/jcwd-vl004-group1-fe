import React from "react";

const SubmitAddressButton = ({ submitAddress }) => {
  return (
    <button
      onClick={submitAddress}
      className="mt-4 btn btn-block btn-accent text-white"
    >
      PROCEED TO PAYMENT
    </button>
  );
};

export default SubmitAddressButton;
