import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Products from "../../data/Products";
import { API_URL } from "../../constant/api";
import Axios from "axios";

const MainProducts = () => {
  const [data, setData] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   getProducts();
  // }, []);

  // useEffect(() => {
  //   getCategories();
  // }, []);

  // useEffect(() => {
  //   getWarehouses();
  // }, []);

  // GET PRODUCTS
  const getProducts = async () => {
    await Axios.get(`${API_URL}/products`)
      .then((results) => {
        setData(results.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSearch = () => {
    Axios.post(`${API_URL}/products/search`, { name: search })
      .then((results) => {
        setData(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategories = async () => {
    try {
      await Axios.get(`${API_URL}/products/categories`).then((results) => {
        setCategories(results.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getWarehouses = async () => {
    try {
      await Axios.get(`${API_URL}/products/warehouses`).then((results) => {
        setWarehouses(results.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const SelectCategories = () => {
    return categories.map((val) => {
      return <option>{val.name}</option>;
    });
  };

  const SelectWarehouse = () => {
    return warehouses.map((val) => {
      return <option>{val.name}</option>;
    });
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
        console.log(results.data);
        setData(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBySort();
  }, [sortValue]);

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
    return data.map((val) => {
      return (
        <tr key={val.id}>
          <td>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" />
            </div>
          </td>
          <th>{val.id}</th>
          <td>
            <img className="mask mask-squircle w-12" src={val.product_image} />
          </td>
          <td>{val.name}</td>
          <td>{val.description.slice(0, 12)}...</td>
          <td>{val.price}</td>
          <td>{val.product_category.name}</td>
          <td>{val.stockReady}</td>
          <td>{val.stockReserved}</td>
          <td>{val.warehouse}</td>
          <td>
            <div className="my-2 space-x-1">
              <Link
                to={`/product/edit/${val.id}`}
                className="btn btn-sm btn-accent p-2 pb-3"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link to="#" className="btn btn-sm btn-error p-2 pb-3">
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
          <th></th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock Ready</th>
          <th>Stock Reserved</th>
          <th>Warehouse</th>
          <th>Action</th>
        </tr>
      </tfoot>
    );
  };

  const SearchAndFilter = () => {
    return (
      <div className="card my-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto flex flex-row">
              <input
                type="text"
                placeholder="Search Product"
                className="form-control p-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={onSearch}
                className="btn btn-outline border-0 hover:btn-ghost"
              >
                Search
              </button>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Choose Warehouse</option>
                <SelectWarehouse />
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>All category</option>
                <SelectCategories />
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                onChange={(e) => {
                  e.preventDefault();
                  setSortValue(e.target.value);
                }}
                className="form-select"
                name="sort"
              >
                <option value="sort">Default</option>
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
    );
  };

  const Pagination = () => {
    return (
      <div className="btn-group flex justify-center">
        <div className="btn-group space-x-2 mt-2">
          <button className="btn btn-primary">«</button>
          <button className="btn text-black bg-base-200">Page 1</button>
          <button className="btn btn-primary">»</button>
        </div>
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
      <SearchAndFilter />

      <div className="overflow-x-auto">
        <table className="table table-compact w-full text-center">
          <TableHead />
          <tbody>
            <TableBody />
          </tbody>
          <TableFoot />
        </table>
        <Pagination />
      </div>
    </section>
  );
};

export default MainProducts;
