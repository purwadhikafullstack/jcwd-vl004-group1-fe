import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../constant/api";

const AddProductMain = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock_ready, setStock_ready] = useState(0);
  const [productCategoryId, setProductCategoryId] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product_image, setProduct_Image] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getWarehouses = async () => {
      try {
        await Axios.get(`${API_URL}/products/warehouses`).then((results) => {
          setWarehouses(results.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getWarehouses();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        await Axios.get(`${API_URL}/products/categories`).then((results) => {
          setCategories(results.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("product_image", product_image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock_ready", stock_ready);
      formData.append("productCategoryId", productCategoryId);
      formData.append("warehouseId", warehouseId);
      console.log(formData);

      const results = await Axios.post(`${API_URL}/products/add`, formData);
      console.log(results.data);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  const SelectCategories = () => {
    return categories.map((val) => {
      return <option value={val.id}>{val.name}</option>;
    });
  };

  const SelectWarehouse = () => {
    return warehouses.map((val) => {
      return <option value={val.id}>{val.name}</option>;
    });
  };

  return (
    <>
      <section className="content-main" style={{ maxWidth: "1600px" }}>
        <form>
          <div className="flex flex-row space-x-4 mb-3 items-center">
            <h2 className="content-title text-2xl">Add New Product</h2>
            <Link to="/products" className="btn btn-accent text-white">
              Go to products
            </Link>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-2">
                    <label htmlFor="product_title" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      name="name"
                      id="product_title"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="mt-2">
                      <label className="form-label">Description</label>
                      <textarea
                        placeholder="Type here"
                        className="form-control"
                        name="description"
                        rows="7"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      name="price"
                      id="product_price"
                      required
                      onChange={(e) => setPrice(+e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="product_price" className="form-label">
                      Stock Ready
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      name="stock"
                      id="product_stock"
                      required
                      onChange={(e) => setStock_ready(+e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label htmlFor="product_price" className="form-label">
                      Product Category
                    </label>
                    <select
                      onChange={(e) => {
                        setProductCategoryId(+e.target.value);
                        e.preventDefault();
                      }}
                      className="form-select"
                      name="productCategoryId"
                      value={productCategoryId}
                    >
                      <option>Choose Category</option>
                      {SelectCategories()}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label htmlFor="product_price" className="form-label">
                      Warehouse
                    </label>
                    <select
                      onChange={(e) => {
                        e.preventDefault();
                        setWarehouseId(+e.target.value);
                      }}
                      className="form-select"
                      name="warehouseId"
                      value={warehouseId}
                    >
                      <option>Choose Warehouse</option>
                      {SelectWarehouse()}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Upload Images</label>
                    <input
                      className="form-control mt-1"
                      type="file"
                      size="lg"
                      name="product_image"
                      id="fileName"
                      onChange={(e) => setProduct_Image(e.target.files[0])}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(e) => onSubmit(e)}
                      encType="multipart/form-data"
                    >
                      Publish now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
