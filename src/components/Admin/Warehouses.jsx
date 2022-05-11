import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { toast } from "react-toastify";

const Warehouses = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(10);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const results = await Axios.get(`${API_URL}/products/warehouses`);
        setData(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);


  const onSearch = async () => {
    await Axios.post(`${API_URL}/warehouse/search`, { name: search })
      .then((results) => {
        setData(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getIndex(10);
  }, [data]);

  const getIndex = (number) => {
    let total = Math.ceil(data.length/number)
    let page = []
    for (let i = 1; i <= total; i++) {
      page.push(i);
    }
    setPagination(page)
  }

  const selectpage = (id) => {
    let num = id
    let start = (num-1)*10
    let end = num*10
    setPageStart(start)
    setPageEnd(end)
  }

  const TableHead = () => {
    return (
      <thead>
        <tr className="">
          <th>No. </th>
          <th>Fullname</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Verified</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return data.map((val, idx) => {
      return (
        <tr key={idx}>
          <td>{idx+1}</td>
          <td>{val.name}</td>
          <td>{val.address}</td>
          <td>{val.city}</td>
          <td>{val.province}</td>
          <td>{val.phone}</td>
          <td>
            <div className="my-2 space-x-1">
              <Link
                to={`/warehouse/${val.id}`}
                className="btn btn-sm btn-outline btn-accent"
              >
                <i class="fa fa-eye"></i>
              </Link>
              <Link
                to={`/addWarehouse`} state={val}
                className="btn btn-sm btn-outline"
              >
                <i className="fas fa-pen"></i>
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <section className="content-main-full">

      {/* Search and Filter Section */}
      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-6 col-md-6 me-auto flex flex-row">
              <div className="space-y-2 flex flex-row items-center space-x-3">
                <h2 className="text-2xl">Manage Warehouse</h2>
              </div>
              <div className=" mx-6">
                <Link to="/addwarehouse" className="btn btn-accent">
                  Add New Warehouse
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 me-auto flex flex-row">
              <div className="input-group justify-content-end">
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Warehouse…"
                  className="input input-bordered w-60"
                  style={{backgroundColor:"white",borderColor:"teal"}}
                  value={search}
                />
                <button
                  onClick={onSearch}
                  className="btn btn-square btn-accent"
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
          </div>
        </header>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full text-center">
          {TableHead()}
          <tbody>{TableBody()}</tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            {/* <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li> */}
            {pagination.map((item)=> {
              return (
                <li className="page-item" key={item} onClick={()=>selectpage(item)}><button className="page-link">{item}</button></li>
              )
            })}
            {/* <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li> */}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Warehouses;

