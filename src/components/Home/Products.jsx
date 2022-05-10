import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
// import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
// import { listProduct } from "../../Redux/Actions/ProductActions";
// import Loading from "../LoadingError/Loading";
// import Message from "../LoadingError/Error";
import {popularProducts} from '../../data/HomePage';

const Products = () => {
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
                    {popularProducts.map((product) => (
                      <div
                        className="shop col-lg-3 col-md-6 col-sm-6"
                        key={product._id}
                      >
                        <div className="border-product">
                          <Link to={`/detail/${product.id}`}>
                            <div className="shopBack">
                              <img src={product.image} alt={product.name} 
                              />
                              <i className="icon fas fa-search box-icon"><p>See details</p></i>
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p className="shopname">
                              {/* <Link to={`/products/${product._id}`}> */}
                              {product.name}
                              {/* </Link> */}
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

                
                <button className="btn-to-product">
                <Link to={`/catalog`} >
                  Show More Products <i style={{marginLeft:10}} className="icon fas fa-arrow-right"></i>
                  </Link>
                  </button>
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

export default Products;
