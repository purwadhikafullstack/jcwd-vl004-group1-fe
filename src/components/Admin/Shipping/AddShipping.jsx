import React, { useEffect, useState } from "react";
import { API_URL } from "../../../constant/api";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const AddShipping = () => {
  const [productId, setProductId] = useState(0);
  const [warehouseReqId, setwarehouseReqId] = useState(0);
  const [warehouseResId, setwarehouseResId] = useState(0);
  const [total_product, setTotalProduct] = useState(0);
  const [data, setData] = useState([]);
  const [product, setProducts] = useState([]);
  const navigate = useNavigate();
  const {id}= useParams();

  useEffect(() => {
    getProducts();
    getWarehouse();
    setwarehouseReqId(parseInt(id))
  }, []);

  const getWarehouse = async () => {
    try {
      const results = await Axios.get(`${API_URL}/warehouses`);
      setData(results.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProducts = async () => {
    try {
      const results = await Axios.get(`${API_URL}/catalog`);
      setProducts(results.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const results = await Axios.post(`${API_URL}/warehouses/addshipping`, {
        total_product,
        productId,
        warehouseReqId,
        warehouseResId
      })
      if(results){
        toast.success("Shipping Added!");
        navigate(`/warehouse/${warehouseResId}`)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const SelectWarehouse = () => {
    return data.map((val, idx) => {
      return <option key={val.id} value={val.id}>{val.name}</option>;
    });
  };

  const SelectProduct = () => {
    return product.map((val, idx) => {
      return <option key={val.id} value={val.id}>{val.name}</option>;
    });
  };

  return (
    <div className="col-md-12 col-lg-5">
      <form>
        <div className="mb-4">
          <label htmlFor="warehouseResId" className="form-label">
            Destination
          </label>
          <select
            onChange={(e) => {
              setwarehouseResId(+e.target.value);
              e.preventDefault();
            }}
            className="form-select"
            name="warehouseResId"
          >
            <option>Choose Warehouse</option>
            {SelectWarehouse()}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="productId" className="form-label">
            Product
          </label>
          <select
            onChange={(e) => {
              setProductId(+e.target.value);
              e.preventDefault();
            }}
            className="form-select"
            name="productId"
          >
            <option>Choose Product</option>
            {SelectProduct()}
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Total Product</label>
          <input
            type="number"
            placeholder="Type here"
            className="form-control"
            name="total_product"
            id="total_product"
            required
            onChange={(e) => setTotalProduct(+e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-accent py-3" onClick={(e)=>onSubmit(e)}>
            Send Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddShipping;
