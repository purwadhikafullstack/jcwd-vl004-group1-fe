import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Users from "../../components/Admin/Users";

const User = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Users />
      </main>
    </>
  );
};

export default User;
