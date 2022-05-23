import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../constant/api";
import { toast } from "react-toastify";

const EditProductMain = ({ products }) => {
  const [previewImage, setPreviewImage] = useState(
    "https://fakeimg.pl/350x200/"
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock_ready, setStock_Ready] = useState(0);
  const [stock_reserved, setStock_Reserved] = useState(0);
  const [productCategoryId, setProductCategoryId] = useState(0);
  const [warehouseId, setWarehouseId] = useState(0);
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product_image, setProduct_Image] = useState(null);

  const navigate = useNavigate();

  const imageHandler = (e) => {
    const value = e.target.files[0];
    setPreviewImage(URL.createObjectURL(value));
    setProduct_Image(value);
  };

  const onSubmitUpdate = async (id) => {
    try {
      const formData = new FormData();
      if (product_image) {
        formData.append("product_image", product_image);
      }
      if (name) {
        formData.append("name", name);
      }
      if (description) {
        formData.append("description", description);
      }
      if (price) {
        formData.append("price", price);
      }
      if (stock_ready) {
        formData.append("stock_ready", stock_ready);
      }
      if (productCategoryId) {
        formData.append("productCategoryId", productCategoryId);
      }
      if (warehouseId) {
        formData.append("warehouseId", warehouseId);
      }
      const results = await Axios.patch(
        `${API_URL}/products/update/${id}`,
        formData
      );
      navigate("/products");
      toast.success("Product Has Been Successfully Updated", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  };
  console.log(productCategoryId);

  useEffect(() => {
    setName(products.name);
    setDescription(products.description);
    setPrice(products.price);
    setStock_Ready(products.warehouse_products?.[0].stock_ready);
    setStock_Reserved(products.warehouse_products?.[0].stock_reserved);
    setProductCategoryId(products.productCategoryId);
    setWarehouseId(products.warehouse_products?.[0].warehouseId);
  }, [products]);

  useEffect(() => {
    const getWarehouses = async () => {
      try {
        const results = await Axios.get(`${API_URL}/products/warehouses`);
        setWarehouses(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getWarehouses();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const results = await Axios.get(`${API_URL}/products/categories`);
        setCategories(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const SelectWarehouse = () => {
    return warehouses.map((warehouse) => {
      return (
        <option key={warehouse.id} value={warehouse.id}>
          {warehouse.name}
        </option>
      );
    });
  };

  const SelectCategories = () => {
    return categories.map((category) => {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    });
  };

  return (
    <section className="content-main" style={{ maxWidth: "1600px" }}>
      <form>
        <div className="flex flex-row space-x-3">
          <h2 className="text-2xl mt-1">Update Product</h2>
          <Link to="/products" className="btn btn-accent mb-2 text-white">
            Go to products
          </Link>
        </div>

        <div className="row mb-4">
          <div className="col-xl-8 col-lg-8">
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                {/* PRODUCT IMAGE */}
                <div className="mb-2">
                  {product_image ? (
                    <img src={previewImage} alt="" />
                  ) : (
                    <img src={`${API_URL}/${products.product_image}`} alt="" />
                  )}
                  <input
                    className="form-control mt-1"
                    type="file"
                    size="lg"
                    name="product_image"
                    id="fileName"
                    onChange={(e) => imageHandler(e)}
                  />
                </div>

                {/* PRODUCT NAME */}
                <div className="mb-2">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    // required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* PRODUCT DESCRIPTION */}
                <div className="mb-2">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* PRODUCT PRICE */}
                <div className="mb-2">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="product_price"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                {/* PRODUCT STOCK READY*/}
                <div className="mb-2">
                  <label className="form-label">Stock Ready</label>
                  <input
                    type="number"
                    disabled
                    className="form-control"
                    id="product_stock_ready"
                    required
                    value={stock_ready}
                    onChange={(e) => setStock_Ready(e.target.value)}
                  />
                </div>

                {/* PRODUCT STOCK RESERVED*/}
                <div className="mb-2">
                  <label className="form-label">Stock Reserved</label>
                  <input
                    type="text"
                    className="form-control"
                    id="product_stock_reserved"
                    disabled
                    value={stock_reserved}
                  />
                </div>

                {/* PRODUCT CATEGORY*/}
                <div className="mb-2">
                  <label className="form-label">Product Categories</label>
                  <select
                    className="form-select"
                    name="productCategoryId"
                    value={productCategoryId}
                    onChange={(e) => setProductCategoryId(+e.target.value)}
                  >
                    {SelectCategories()}
                  </select>
                </div>

                {/* PRODUCT WAREHOUSE*/}
                <div className="mb-2">
                  <label className="form-label">Warehouse</label>
                  <select
                    className="form-select"
                    name="warehouseId"
                    value={warehouseId}
                    onChange={(e) => setWarehouseId(+e.target.value)}
                  >
                    {SelectWarehouse()}
                  </select>
                </div>
                <div>
                  {/* UPDATE BUTTON */}
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      onSubmitUpdate(products.id);
                    }}
                  >
                    Edit Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </form>
    </section>
  );
};

export default EditProductMain;
