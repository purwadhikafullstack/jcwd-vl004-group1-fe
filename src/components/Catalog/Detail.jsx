import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { currencyFormatter } from '../../helpers/currencyFormatter';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";

import 'react-toastify/dist/ReactToastify.css';

const Detail = () => {
  const [qty, setQty] = useState(1);
  const {id}= useParams();
  const [data, setData] = useState([]);
  const userGlobal = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getProducts = async () => {
    await Axios.get(`${API_URL}/catalog/${id}`)
      .then((results) => {
        let sum = 0;
        results.data.warehouse_products.forEach(element => {
          sum += element.stock_ready
        });
        results.data["stock"] = sum;
        setData(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = async () => {
    if(userGlobal.id === 0){
      navigate('/login')
    } else {
      await Axios.post(`${API_URL}/carts/add`, 
      { quantity: qty,
        productId: id,
        userId: userGlobal.id})
      .then((results) => {
        toast.success("Product has been added to cart !", {
          position: toast.POSITION.TOP_CENTER,
          className: 'alert-addtocart'
        });
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, [id]);

  const decrease = () => {
    if(qty>1){
      setQty(qty-1)
    }
  }

  const increase = (stock) => {
    if(qty<stock){
      setQty(qty+1)
    }
  }

  return (
    <>
      <div className="container single-product">
        <div className="row">
          <div className="col-md-6">
            <div className="single-image">
              <img src={`${API_URL}/${data.product_image}`} //alt={product.name} 
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
                      <div className="flex border-1 rounded-md space-x-4 items-center justify-center align-middle">
                        <button className={`${
                          qty <= 1
                            ? "text-2xl hover:pointer-events-none text-gray-400 m-2"
                            : "text-2xl m-2"
                        }`} onClick={()=>decrease()}>-</button>
                        <input
                          type="number"
                          value={qty}
                          pattern="[0-9]*"
                          name="quantity"
                          id="quantity"
                          max={data.stock}
                          min={1}
                          required
                        />
                        <button className={`${
                          qty > data.stock
                            ? "text-2xl hover:pointer-events-none text-gray-400 m-2"
                            : "text-2xl m-2"
                        }`} onClick={()=>increase(data.stock)}>+</button>
                      </div>
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
