import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Dashb from "../../components/Admin/Dashboard";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Dashb/>
      </main>
    </>
  );
};

export default Dashboard;
