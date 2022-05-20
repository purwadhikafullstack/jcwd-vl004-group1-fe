import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Warehouses from "../../components/Admin/Warehouses";

const Warehouse = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Warehouses />
      </main>
    </>
  );
};

export default Warehouse;
