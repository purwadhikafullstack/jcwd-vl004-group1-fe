import React, { useEffect, useState } from "react";
import { API_URL } from "../../../constant/api";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const [productId, setProduct] = useState(0);
  const [warehouseId, setWarehouse] = useState(0);
  const [stock_ready, setStock] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {id, name}= useParams();

  useEffect(() => {
    getProducts();
    setWarehouse(parseInt(id))
  }, []);

  const getProducts = async () => {
    try {
      const results = await Axios.get(`${API_URL}/catalog`);
      setData(results.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const results = await Axios.post(`${API_URL}/warehouses/addproduct`, {
        stock_ready,
        productId,
        warehouseId
      });
      if(results){
        toast.success("Product Added!");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const SelectProduct = () => {
    return data.map((val, idx) => {
      return <option key={val.id} value={val.id}>{val.name}</option>;
    });
  };

  return (
    <div className="col-md-12 col-lg-5">
      <form>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Product Name
          </label>
          <select
            onChange={(e) => {
              setProduct(+e.target.value);
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
          <label className="form-label">Stock Ready</label>
          <input
            type="number"
            placeholder="Type here"
            className="form-control"
            name="stock_ready"
            id="stock"
            required
            onChange={(e) => setStock(+e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-accent py-3" onClick={(e)=>onSubmit(e)}>
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
