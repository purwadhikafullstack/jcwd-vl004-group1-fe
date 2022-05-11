import React, { useEffect, useState } from "react";
import { API_URL } from "../../../constant/api";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCategory({
      ...category,
      [name]: value,
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const results = await Axios.get(`${API_URL}/products`);
      setData(results.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async () => {
    try {
      await Axios.post(`${API_URL}/products/addcategory`, category).then(
        (results) => {
          toast.success("Category Added!");
          setCategory("");
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const SelectProduct = () => {
    return data.map((val, idx) => {
      return <option key={val.id}>{val.name}</option>;
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
            onChange={(e) => {}}
            className="form-select"
            name="productCategoryId"
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
            name="price"
            id="product_price"
            required
            onChange={(e) => setStock(+e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-accent py-3" onClick={onSubmit}>
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
