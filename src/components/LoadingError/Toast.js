import React from "react";
import { ToastContainer } from "react-toastify";

// INI BUAT ALERT NYA GUYS (SAME AS SWEET ALERT BUT SIMPLER)
const Toast = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default Toast;
