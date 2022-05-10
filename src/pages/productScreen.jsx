import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainProducts from "../components/Products/MainProducts";

const ProductScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts />
      </main>
    </>
  );
};

export default ProductScreen;
