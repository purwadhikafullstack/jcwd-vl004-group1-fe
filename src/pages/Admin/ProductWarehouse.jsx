import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Show from "../../components/Admin/ProductWarehouse/MainProducts";

const ProductWarehouse = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Show />
      </main>
    </>
  );
};

export default ProductWarehouse;
