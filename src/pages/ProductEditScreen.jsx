import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import EditProductMain from "../components/Products/EditproductMain";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../constant/api";

const ProductEditScreen = () => {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await Axios.get(`${API_URL}/products/find/${id}`);
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain editData={products} />
      </main>
    </>
  );
};
export default ProductEditScreen;
