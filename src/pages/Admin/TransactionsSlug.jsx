import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import TransactionSlug from "../../components/Admin/TransactionSlug";

const TransactionsSlug = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <TransactionSlug />
      </main>
    </>
  );
};

export default TransactionsSlug;
