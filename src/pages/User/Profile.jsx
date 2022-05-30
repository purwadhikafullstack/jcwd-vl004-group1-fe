import React from "react";
import SidebarUser from "../../components/SidebarUser";
import HeaderUser from "../../components/HeaderUser";
import Footer from "../../components/Footer";
import TableMain from "../../components/History/TableMain";

const Profile = () => {
  return (
    <>
      <SidebarUser />
      <main className="main-wrap">
        <HeaderUser />
        <TableMain />
        <Footer />
      </main>
    </>
  );
};

export default Profile;
