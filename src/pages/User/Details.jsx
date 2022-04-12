import React from "react";
import HeaderUser from "../../components/HeaderUser";
import Detail from "../../components/Catalog/Detail";
import Recommend from "../../components/Catalog/Recommend";
import Footer from "../../components/Footer";
import styled from "styled-components";

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 45px;
  font-weight: bold;
  margin-top: 50px;
`;

const Details = () => {
  return (
    <>
      <HeaderUser/>
      <Detail/>
      <Title>Similar Products</Title>
      <Recommend/>
      <Footer/>
    </>
  );
};


export default Details;
