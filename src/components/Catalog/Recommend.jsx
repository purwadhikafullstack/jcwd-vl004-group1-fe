import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { currencyFormatter } from '../../helpers/currencyFormatter';
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import 'react-toastify/dist/ReactToastify.css';

const Recommend = () => {
  const [data, setData] = useState([]);
  const [upTo, setUpTo] = useState(false);
  const userGlobal = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setUpTo(false)
  },[upTo]);

  const getProducts = async () => {
    await Axios.get(`${API_URL}/catalog`)
      .then((results) => {
        results.data.map((item)=>{
          let sum = 0;
          item.warehouse_products.forEach(element => {
            sum += element.stock_ready
          });
          item["stock"] = sum;
        })
        setData(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addToCart = async (id) => {
    if(userGlobal.id === 0){
      navigate('/login')
    } else {
      await Axios.post(`${API_URL}/carts/add`, 
      { quantity: 1,
        productId: id,
        userId: userGlobal.id})
      .then((results) => {
        toast.success("Product has been added to cart !", {
          position: toast.POSITION.TOP_CENTER,
          className: 'alert-addtocart'
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                  <>
                    {data.slice(0,6).map((product) => (
                      <div
                        className="shop col-lg-2 col-md-6 col-sm-6"
                        key={product._id}
                      >
                        <div className="border-product">
                          <Link to={`/detail/${product.id}`} onClick={()=>setUpTo(true)}>
                            <div className="shopBack">
                              <img src={`${API_URL}/${product.product_image}`} alt={product.name} 
                              />
                              <i className="icon fas fa-search box-icon-catalog"><p>See details</p></i>
                            </div>
                          </Link>

                          <div className="shoptext">
                            <p className="shopname">
                              <Link to={`/detail/${product.id}`}>
                              {product.name}
                              </Link>
                            </p>

                            <h3>{currencyFormatter(product.price)}</h3>
                            {product.stock==0 ? (
                              <>
                                <p className="shopoutofstock">Out of stock</p>
                                <button className="shopbutton" disabled>Buy now</button>
                              </>
                            ):(
                              <>
                                <p className="shopoutstock">Available Stock : {product.stock} pcs</p>
                                <button className="shopbutton" onClick={()=>addToCart(product.id)}>Buy now</button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      
                    ))}
                  </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommend;
