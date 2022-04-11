import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import EditProductMain from "../components/Products/EditproductMain";
import Products from "./../data/Products";
import { useParams } from "react-router-dom";

const ProductEditScreen = () => {
  const { id } = useParams();
  const productId = Products.find((val) => val.id === Number(id));
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain productId={productId} />
      </main>
    </>
  );
};
export default ProductEditScreen;
