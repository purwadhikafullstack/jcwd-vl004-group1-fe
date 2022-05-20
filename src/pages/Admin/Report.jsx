import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Rep from "../../components/Admin/Report";

const Report = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Rep/>
      </main>
    </>
  );
};

export default Report;
