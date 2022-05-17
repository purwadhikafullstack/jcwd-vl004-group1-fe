import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { toast } from "react-toastify";

const Transaction = () => {
  const [dataTransactions, setDataTransactions] = useState([]);
  const [checkStockMessage, setcheckStockMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const results = await Axios.get(`${API_URL}/transactions`);
      setDataTransactions(results.data);
      console.log(results.data);
    } catch (err) {
      console.log(err);
    }
  };

  const TableHead = () => {
    return (
      <thead>
        <tr className="">
          <th>ID</th>
          <th>Number</th>
          <th>Date</th>
          <th>Name</th>
          <th>Warehouse</th>
          <th>User Address</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  const gotoSlug = (idTransaction, statusTransaction) => {
    if (statusTransaction == "pending") {
      setcheckStockMessage("Check Status first!");
    } else {
      let path = `/transaction/${idTransaction}`;
      navigate(path);
    }
  };

  //   Check Status Stock in selected warehouse
  const checkStock = async (warehouseId) => {
    try {
      const results = await Axios.post(
        `${API_URL}/transactions/${warehouseId}`
      );
      console.log(results);
      getTransactions();
    } catch (err) {
      console.log(err);
    }
  };

  const deliver = async (idTransaction) => {
    try {
      await Axios.post(`${API_URL}/transactions/${idTransaction}/deliver`).then(
        (res) => {
          getTransactions();
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const rejectTransaction = async (idTransaction) => {
    try {
      await Axios.post(`${API_URL}/transactions/${idTransaction}/reject`).then(
        (res) => {
          getTransactions();
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const TableBody = () => {
    return dataTransactions.map((val, i) => {
      return (
        <tr
          onClick={() => {
            gotoSlug(val.id, val.status);
          }}
        >
          <td>{val.id}</td>
          <td>{val.number}</td>
          <td>{val.createdAt}</td>
          <td>{val.invoice_header.user.full_name}</td>
          <td>{val.invoice_header.warehouse.name}</td>
          <td>{val.invoice_header.user_address.province}</td>
          <td className="font-semibold capitalize">
            <p
              className={
                val.status === "Delivered" || val.status === "Ready to process"
                  ? "bg-teal-500 text-white py-1 rounded-xl"
                  : "bg-red-500 text-white py-1 rounded-xl"
              }
            >
              {val.status}
            </p>
          </td>
          <td>
            {val.status === "pending" ||
            val.status === "request needed" ||
            val.status === "Ready to process" ||
            val.status === "waiting request" ||
            val.status === "approved request" ||
            val.status === "rejected request" ? (
              <div className="my-2 space-x-1">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 font-semibold text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
                  onClick={(event) => {
                    checkStock(val.id);
                    event.stopPropagation();
                  }}
                >
                  Check Status
                </button>
              </div>
            ) : (
              <p className="text-teal-500 font-semibold">No Action Needed</p>
            )}
            {}
            <div className="my-2 space-x-1">
              {val.status === "Ready to process" ? (
                <>
                  <button
                    onClick={(event) => {
                      deliver(val.id);
                      event.stopPropagation();
                    }}
                    className="bg-teal-500 hover:bg-teal-700 font-semibold text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
                  >
                    Deliver
                  </button>
                  <button
                    onClick={(event) => {
                      rejectTransaction(val.id);
                      event.stopPropagation();
                    }}
                    class="bg-red-500 hover:bg-red-700 font-semibold text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    Reject
                  </button>
                </>
              ) : null}
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
                <h2 className="text-2xl">Transaction</h2>
                {/* <p>{dataTransactions}</p> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 me-auto flex flex-row">
              <div className="input-group justify-content-end">
                <input
                  type="text"
                  //   onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="input input-bordered w-60"
                  style={{ backgroundColor: "white", borderColor: "teal" }}
                  //   value={search}
                />
                <button
                  //   onClick={onSearch}
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
      {/* <>{data}</> */}
      <div className="overflow-x-auto">
        <table className="table table-compact w-full text-center">
          {TableHead()}
          <tbody>{TableBody()}</tbody>
        </table>
        <p class="pagination justify-content-center text-pink-500 font-semibold">
          {checkStockMessage}
        </p>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">
                Previous
              </a>
            </li>
            {/* {pagination.map((item)=> {
                return (
                    <li className="page-item" key={item} onClick={()=>selectpage(item)}><button className="page-link">{item}</button></li>
                )
                })} */}
            <li class="page-item">
              <a class="page-link" href="#">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Transaction;
