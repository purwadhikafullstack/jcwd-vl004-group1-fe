import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Show from "../../components/Admin/SupplyCost/MainCost";

const CostWarehouse = () => {
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

export default CostWarehouse;
