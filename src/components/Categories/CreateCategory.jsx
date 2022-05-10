import React, { useEffect, useState } from "react";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const CreateCategory = () => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCategory({
      ...category,
      [name]: value,
    });
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

  return (
    <div className="col-md-12 col-lg-4">
      <form>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
            name="name"
            onChange={(e) => inputHandler(e)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
            name="description"
            onChange={(e) => inputHandler(e)}
          ></textarea>
        </div>

        <div className="d-grid">
          <button className="btn btn-primary py-3" onClick={onSubmit}>
            Create category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
