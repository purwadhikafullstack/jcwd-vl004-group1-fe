import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import AddWarehouse from "../../components/Admin/AddWarehouse";

const FormWarehouse = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddWarehouse />
      </main>
    </>
  );
};

export default FormWarehouse;
