import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { Link } from "react-router-dom";
import { currencyFormatter } from '../../helpers/currencyFormatter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Detail = () => {
  const [qty, setQty] = useState(1);
  const {id}= useParams();
  const [data, setData] = useState([]);

  const getProducts = async () => {
    await Axios.get(`${API_URL}/catalog/${id}`)
      .then((results) => {
        let sum = 0;
        results.data.warehouse_products.forEach(element => {
          sum += element.stock_ready-element.stock_reserved
        });
        results.data["stock"] = sum;
        setData(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = async () => {
    await Axios.post(`${API_URL}/carts/add`, 
      { quantity: qty,
        productId: id,
        userId: 1})
      .then((results) => {
        toast.success("Product has been added to cart !", {
          position: toast.POSITION.TOP_CENTER,
          className: 'alert-addtocart'
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, [id]);

  return (
    <>
      <div className="container single-product">
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={data.product_image} //alt={product.name} 
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{data.name}</div>
              </div>
              <p>{data.description}</p>

              <div className="product-count col-lg-12 ">
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Price</h6>
                  <span>{currencyFormatter(data.price)}</span>
                </div>
                <div className="flex-box d-flex justify-content-between align-items-center">
                  <h6>Status</h6>
                  {data.stock > 0 ? (
                    <span>In Stock</span>
                  ) : (
                    <span>Unavailable</span>
                  )}
                </div>
                
                {data.stock > 0 ? (
                  <>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Available Stock</h6>
                      <span>{data.stock} pcs</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Quantity</h6>
                      <select
                        // value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(data.stock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1} pcs
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <button className="round-black-btn" onClick={addToCart}>
                      Add To Cart
                    </button>
                  </>
                ):(
                  <>
                    <Link to={`/catalog`}>
                    <button className="round-black-btn">
                      Continue Shopping
                    </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Detail;
