import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "./../components/Header";
import EditProductMain from "../components/Products/EditproductMain";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../constant/api";

const ProductEditScreen = () => {
  const [products, setProducts] = useState({});
  const { id } = useParams();
  console.log(id);

  console.log(products);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await Axios.get(`${API_URL}/products/find/${id}`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [id]);

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditProductMain products={products} />
      </main>
    </>
  );
};
export default ProductEditScreen;
