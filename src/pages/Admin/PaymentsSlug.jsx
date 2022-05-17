import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import PaymentSlug from "../../components/Admin/PaymentSlug";

const PaymentsSlug = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <PaymentSlug />
      </main>
    </>
  );
};

export default PaymentsSlug;
