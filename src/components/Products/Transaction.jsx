import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { toast } from "react-toastify";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactPaginate from "react-paginate";

const Transaction = () => {
  const [dataTransactions, setDataTransactions] = useState([]);
  const [checkStockMessage, setcheckStockMessage] = useState("");
  const navigate = useNavigate();

  const [dataCount, setDataCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    setCurrentPage(currentPage);
  };

  const [sortValue, setSortValue] = useState("updatedAt,ASC");

  const [date, setDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openEndCalendar, setOpenEndCalendar] = useState(false);

  useEffect(() => {
    getTransactions();
  }, [sortValue]);

  const getTransactions = async () => {
    try {
      let results = await Axios.post(`${API_URL}/transactions/`, {
        sortValue,
      });
      setDataTransactions(results.data);
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
    if (statusTransaction === "pending") {
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
          <td>
            {new Date(val.updatedAt).toLocaleDateString("id-ID")}
            <span>&nbsp;&nbsp;&nbsp;</span>
            {new Date(val.updatedAt).toLocaleTimeString("id-ID")}
          </td>
          <td>{val.invoice_header.user.full_name}</td>
          <td>{val.invoice_header.warehouse.name}</td>
          <td>{val.invoice_header.user_address.province}</td>
          <td className="font-semibold capitalize">
            {val.status === "Delivered" || val.status === "approved request" ? (
              <p className="bg-teal-500 text-white py-1 rounded-xl">
                {val.status}
              </p>
            ) : null}
            {val.status === "pending" ||
            val.status === "request needed" ||
            val.status === "Ready to process" ||
            val.status === "waiting request" ? (
              <p className="bg-yellow-500 text-white py-1 rounded-xl">
                {val.status}
              </p>
            ) : null}
            {val.status === "rejected request" || val.status === "Rejected" ? (
              <p className="bg-red-500 text-white py-1 rounded-xl">
                {val.status}
              </p>
            ) : null}
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
                    // console.log(sortValue);
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
          <div className="row gx-3 py-3 space-x-2">
            <div className="col-lg-5 col-md-6 me-auto flex flex-row">
              <div className="space-y-2 flex flex-row items-center space-x-3">
                <h2 className="text-2xl">Transaction</h2>
                {/* <p>{dataTransactions}</p> */}
              </div>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <input
                type="text"
                style={{ backgroundColor: "white", borderColor: "teal" }}
                className="select w-full max-w-xs input-bordered text-gray-500 bg-light"
                value={date.toString().slice(4, 15)}
                onClick={() => setOpenCalendar(!openCalendar)}
                contentEditable={false}
              />
              {openCalendar && (
                <div className="calendar-container">
                  <Calendar onChange={setDate} value={date} />
                </div>
              )}
            </div>
            {/* <div className="col-lg-2 col-6 col-md-3">
              <select
                style={{backgroundColor:"white",borderColor:"teal"}}
                className="select w-full max-w-xs input-bordered text-gray-500 bg-light"
                onChange={(e) => setSortValue(e.target.value)}
                name="sort"
              >
                <option name="sort" value="sort">
                  Filter Warehouse
                </option>
                {SelectWarehouse()}
              </select>
            </div> */}
            <div className="col-lg-2 col-6 col-md-3">
              <input
                type="text"
                style={{ backgroundColor: "white", borderColor: "teal" }}
                className="select w-full max-w-xs input-bordered text-gray-500 bg-light"
                value={enddate.toString().slice(4, 15)}
                onClick={() => setOpenEndCalendar(!openEndCalendar)}
                contentEditable={false}
              />
              {openEndCalendar && (
                <div className="calendar-container">
                  <Calendar onChange={setEndDate} value={enddate} />
                </div>
              )}
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                style={{ backgroundColor: "white", borderColor: "teal" }}
                className="select w-full max-w-xs input-bordered text-gray-500 bg-light"
                onChange={(e) => {
                  setSortValue(e.target.value);
                  getTransactions();
                }}
                name="sort"
              >
                <option name="sort" value="updatedAt,ASC">
                  Filter By
                </option>
                {/* <option name="lowprice" value="lowprice">
                  Lowest Profit
                </option>
                <option name="highprice" value="highprice">
                  Highest Profit
                </option> */}
                <option name="neworderdate" value="updatedAt,DESC">
                  Newest
                </option>
                <option name="newenddate" value="updatedAt,ASC">
                  Oldest
                </option>
              </select>
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
        <ReactPaginate
          className="flex justify-center space-x-4 text-accent mt-6"
          previousLabel={"<<"}
          nextLabel={">>"}
          breakLabel={"..."}
          pageCount={Math.ceil(dataCount / 10)}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
          activeClassName={
            "btn-active btn btn-xs hover:bg-accent bg-accent text-white border-none animate-bounce"
          }
        />
      </div>
    </section>
  );
};

export default Transaction;
