import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Payment from "../../components/Products/Payment";

const Payments = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Payment />
      </main>
    </>
  );
};

export default Payments;
