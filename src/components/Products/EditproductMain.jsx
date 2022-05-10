import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../constant/api";
import { toast } from "react-toastify";

const EditProductMain = (props) => {
  const { editData } = props;

  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [stock_ready, setStock_ready] = useState(0);
  let [productCategoryId, setProductCategoryId] = useState(0);
  let [warehouseId, setWarehouseId] = useState(0);
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product_image, setProduct_Image] = useState("");
  console.log(product_image);

  const navigate = useNavigate();

  const onSubmitUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("product_image", product_image);
      await Axios.patch(`${API_URL}/products/update/${id}`, {
        formData,
        name,
        description,
        price,
        stock_ready,
        productCategoryId,
        warehouseId,
      }).then(() => {
        navigate("/products");
        toast("Product Successfully Updated!");
      });
    } catch (err) {
      console.log(err);
    }
  };

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

  const SelectWarehouse = () => {
    return warehouses.map((warehouse) => {
      return <option value={warehouse.id}>{warehouse.name}</option>;
    });
  };

  const SelectCategories = () => {
    return categories.map((category) => {
      return <option value={category.id}>{category.name}</option>;
    });
  };

  return editData.map((val, idx) => {
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
                    <div></div>
                    <label className="form-label"></label>
                    <img src={`${API_URL}/${val.product_image}`} alt="" />
                    <input
                      className="form-control mt-1"
                      type="file"
                      size="lg"
                      name="product_image"
                      id="fileName"
                      onChange={(e) => setProduct_Image(e.target.files[0])}
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
                      value={name ? name : (name = val.name)}
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
                      value={
                        description
                          ? description
                          : (description = val.description)
                      }
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
                      value={price ? price : (price = val.price)}
                      onChange={(e) => setPrice(+e.target.value)}
                    />
                  </div>
                  {/* PRODUCT STOCK READY*/}
                  <div className="mb-2">
                    <label className="form-label">Stock Ready</label>
                    <input
                      type="text"
                      className="form-control"
                      id="product_ready"
                      required
                      value={
                        stock_ready
                          ? stock_ready
                          : (stock_ready =
                              val.warehouse_products[0].stock_ready)
                      }
                      onChange={(e) => setStock_ready(+e.target.value)}
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
                      defaultValue={val.warehouse_products[0].stock_reserved}
                    />
                  </div>

                  {/* PRODUCT CATEGORY*/}
                  <div className="mb-2">
                    <label className="form-label">Product Categories</label>
                    <select
                      className="form-select"
                      name="productCategoryId"
                      value={
                        productCategoryId
                          ? productCategoryId
                          : (productCategoryId = val.product_category.id)
                      }
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
                      value={
                        warehouseId
                          ? warehouseId
                          : (warehouseId =
                              val.warehouse_products[0].warehouse.id)
                      }
                      onChange={(e) => setWarehouseId(+e.target.value)}
                    >
                      {SelectWarehouse()}
                    </select>
                  </div>
                  <div>
                    {/* UPDATE BUTTON */}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        onSubmitUpdate(val.id);
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
  });
};

export default EditProductMain;
