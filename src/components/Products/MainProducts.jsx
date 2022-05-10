import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { toast } from "react-toastify";
import { currencyFormatter } from "../../helpers/currencyFormatter";

const MainProducts = () => {
  const [data, setData] = useState([]);
  const [sortValue, setSortValue] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const results = await Axios.get(`${API_URL}/products`);
        setData(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
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

  const onDelete = async (id) => {
    try {
      await Axios.delete(`${API_URL}/products/delete/${id}`).then((results) => {
        toast("Product Has Been Deleted");
        Navigate("/products");
      });
    } catch (err) {
      console.log(err);
    }
  };

  // SORTING PRODUCTS
  useEffect(() => {
    const getBySort = async () => {
      try {
        let results;
        if (sortValue === "az") {
          results = await Axios.get(`${API_URL}/products/sort/az`);
        } else if (sortValue === "za") {
          results = await Axios.get(`${API_URL}/products/sort/za`);
        } else if (sortValue === "lowprice") {
          results = await Axios.get(`${API_URL}/products/sort/lowprice`);
        } else if (sortValue === "highprice") {
          results = await Axios.get(`${API_URL}/products/sort/highprice`);
        } else if (sortValue === "sort") {
          results = await Axios.get(`${API_URL}/products`);
        }
        setData(results.data);
        console.log(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBySort();
  }, [sortValue]);

  const onSearch = async () => {
    await Axios.post(`${API_URL}/products/search`, { name: search })
      .then((results) => {
        setData(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const SelectCategories = () => {
    return categories.map((val, idx) => {
      return <option key={idx}>{val.name}</option>;
    });
  };

  const SelectWarehouse = () => {
    return warehouses.map((val, idx) => {
      return <option key={idx}>{val.name}</option>;
    });
  };

  const TableHead = () => {
    return (
      <thead>
        <tr>
          <th>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" />
            </div>
          </th>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock Ready</th>
          <th>Stock Reserved</th>
          <th>Warehouse</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return data.map((val, idx) => {
      return (
        <tr key={idx}>
          <td>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" />
            </div>
          </td>
          <th>{val.id}</th>
          <td>
            <img
              className="mask mask-squircle w-12"
              src={`${API_URL}/${val.product_image}`}
            />
          </td>
          <td>{val.name}</td>
          <td>{val.description.slice(0, 12)}...</td>
          <td className="tracking-wide">{currencyFormatter(val.price)}</td>
          <td>{val.product_category.name}</td>
          <td>{val.warehouse_products[0].stock_ready}</td>
          <td>{val.warehouse_products[0].stock_reserved}</td>
          <td>{val.warehouse_products[0].warehouse.name}</td>
          <td>
            <div className="my-2 space-x-1">
              <Link
                to={`/products/find/${val.id}`}
                className="btn btn-sm btn-accent p-2 pb-3"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                className="btn btn-sm btn-error p-2 pb-3"
                onClick={() => onDelete(val.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  };

  const TableFoot = () => {
    return (
      <tfoot>
        <tr className="">
          <th>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" />
            </div>
          </th>
          <th></th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock Ready</th>
          <th>Stock Reserved</th>
          <th>Warehouse</th>
          <th>Action</th>
        </tr>
      </tfoot>
    );
  };

  const Pagination = () => {
    return (
      <div className="btn-group flex flex-row m-auto w-1/6 ">
        <button className="btn btn-outline">1</button>
        <button className="btn btn-outline btn-active">2</button>
        <button className="btn btn-outline">3</button>
        <button className="btn btn-outline">4</button>
      </div>
    );
  };

  return (
    <section className="content-main">
      <div className="space-y-2 flex flex-row items-center space-x-3">
        <h2 className="text-2xl">Manage Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Add New Product
          </Link>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="card my-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3 space-x-2">
            <div className="col-lg-4 col-md-6 me-auto flex flex-row">
              <div className="input-group">
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Product…"
                  className="input input-bordered w-60"
                  value={search}
                />
                <button
                  onClick={onSearch}
                  className="btn btn-square btn-primary"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <select className="select w-full max-w-xs input-bordered text-gray-500">
                <option>Choose Warehouse</option>
                {SelectWarehouse()}
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="select w-full max-w-xs input-bordered text-gray-500">
                <option>All category</option>
                {SelectCategories()}
              </select>
            </div>
            {/* SELECTED */}
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="select w-full max-w-xs input-bordered text-gray-500"
                onChange={(e) => setSortValue(e.target.value)}
                name="sort"
              >
                <option name="sort" value="sort">
                  Default
                </option>
                <option name="az" value="az">
                  A-Z
                </option>
                <option name="za" value="za">
                  Z-A
                </option>
                <option name="lowprice" value="lowprice">
                  Lowest Price
                </option>
                <option name="highprice" value="highprice">
                  Highest Price
                </option>
              </select>
            </div>
          </div>
        </header>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full text-center">
          {TableHead()}
          <tbody>{TableBody()}</tbody>
          {TableFoot()}
        </table>
        {Pagination()}
      </div>
    </section>
  );
};

export default MainProducts;
