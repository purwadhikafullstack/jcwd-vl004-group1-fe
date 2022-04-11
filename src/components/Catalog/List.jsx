import React, { useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../../assets/styles/responsive";
import { Link } from "react-router-dom";
import Rating from "../Home/Rating";
// import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
// import { listProduct } from "../../Redux/Actions/ProductActions";
// import Loading from "../LoadingError/Loading";
// import Message from "../LoadingError/Error";
import {allProducts} from '../../data/HomePage';

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border-radius: 15px;
  border-width: 1px;
  border-color: black;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

const Input = styled.input`
  border: 1px solid black;;
  padding: 10px;
  border-radius: 15px;
  ${mobile({ width: "50px" })}
`;

const List = () => {
  // const { keyword, pagenumber } = props;
  // const dispatch = useDispatch();

  // const productList = useSelector((state) => state.productList);
  // const { loading, error, products, page, pages } = productList;

  // useEffect(() => {
  //   dispatch(listProduct(keyword, pagenumber));
  // }, [dispatch, keyword, pagenumber]);
  return (
    <>
      <div className="container">
        <div className="section">
        <FilterContainer>
        <Filter>
          <FilterText>Filter Category:</FilterText>
          <Select>
            <Option disabled defaultValue={'Color'}>
              Color
            </Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          {/* <FilterText>Search Products:</FilterText>
            <Input placeholder="Search"></Input>
            <Button>Search</Button> */}
            <FilterText>Sort Products:</FilterText>
            <Select>
              <Option selected>Newest</Option>
              <Option>Highest Price</Option>
              <Option>Lowest Price</Option>
              <Option>A-Z</Option>
              <Option>Z-A</Option>
            </Select>
        </Filter>
        <div className="col-md-6 col-6 d-flex align-items-center">
          <form className="input-group">
            <Input
              type="search"
              className="form-control rounded search"
              placeholder="Search"
            />
            <button type="submit" className="search-button">
              search
            </button>
          </form>
        </div>
      </FilterContainer>
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {/* {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : ( */}
                  <>
                    {allProducts.map((product) => (
                      <div
                        className="shop col-lg-2 col-md-6 col-sm-6"
                        key={product._id}
                      >
                        <div className="border-product">
                          <Link to={`/detail/${product.id}`}>
                            <div className="shopBack">
                              <img src={product.image} alt={product.name} 
                              />
                              <i className="icon fas fa-search box-icon-catalog"><p>See details</p></i>
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p className="shopname">
                              <Link to={`/details/${product._id}`}>
                              {product.name}
                              </Link>
                            </p>

                            {/* <Rating
                              value={product.rating}
                              text={`${product.numReviews} reviews`}
                            /> */}
                            <h3>Rp {product.price}.000,00</h3>
                            {product.stock==0 ? (
                                <p className="shopoutofstock">Out of stock</p>
                            ):(
                                <p className="shopoutstock">Available Stock : {product.stock}</p>
                            )}
                            <button className="shopbutton">Buy now</button>
                          </div>
                        </div>
                      </div>
                      
                    ))}
                  </>
                {/* )} */}

                {/* Pagination */}
                {/* <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
