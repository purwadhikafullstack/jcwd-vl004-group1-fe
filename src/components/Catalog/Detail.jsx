import React, { useEffect, useState } from "react";
import Rating from "../Home/Rating";

const Detail = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <>
      <div className="container single-product">
        {/* {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : ( */}
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={'/images/6.png'} //alt={product.name} 
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">Velcro Sneakers For Boys & Girls  (Blue)</div>
                  </div>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>

                  <div className="product-count col-lg-12 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Price</h6>
                      <span>Rp 599.000,00</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Status</h6>
                      {/* {product.countInStock > 0 ? ( */}
                        <span>In Stock</span>
                      {/* // ) : (
                      //   <span>unavailable</span>
                      // )} */}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Available Stock</h6>
                      <span>6 pcs</span>
                    </div>
                    {/* {product.countInStock > 0 ? ( */}
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Quantity</h6>
                          <select
                            // value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(6).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1} pcs
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <button
                        //   onClick={AddToCartHandle}
                          className="round-black-btn"
                        >
                          Add To Cart
                        </button>
                      </>
                    {/* ) : null} */}
                  </div>
                </div>
              </div>
            </div>
          </>
        {/* )} */}
      </div>
    </>
  );
};

export default Detail;
