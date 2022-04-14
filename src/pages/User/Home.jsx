import React from "react";
import HeaderUser from "../../components/HeaderUser";
import Slider from "../../components/Home/Slider";
import Categories from "../../components/Home/Categories";
import Products from "../../components/Home/Products";
import Footer from "../../components/Footer";
import styled from "styled-components";

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 45px;
  font-weight: bold;
  margin-top: 50px;
`;

const Home = () => {
  return (
    <>
      <HeaderUser />
      <Slider />
      <Title>Categories</Title>
      <Categories />
      <Title>Favorites Product</Title>
      <Products />
      <Footer />
    </>
  );
};


export default Home;
