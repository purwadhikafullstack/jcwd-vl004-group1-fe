import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Transaction from "../../components/Products/Transaction";

const Transactions = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Transaction />
      </main>
    </>
  );
};

export default Transactions;
