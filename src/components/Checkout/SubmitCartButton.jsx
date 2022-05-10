import React from "react";

const SubmitCartButton = ({ submitCart }) => {
  return (
    <button
      onClick={submitCart}
      className="mt-4 btn btn-block btn-accent text-white"
    >
      PROCEED TO ADDRESS
    </button>
  );
};

export default SubmitCartButton;
