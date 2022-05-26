import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { removeInvoiceHeaderIdCookie } from "../../hooks/removeCookie";

const Payment = () => {
  const [dataPayment, setDataPayment] = useState([]);
  const navigate = useNavigate();

  const [sortValue, setSortValue] = useState("nonsort");

  const [date, setDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openEndCalendar, setOpenEndCalendar] = useState(false);

  useEffect(() => {
    getPayment();
  }, []);

  const getPayment = async () => {
    try {
      let results;
      if (sortValue === "ASC") {
        results = await Axios.get(`${API_URL}/paymentsConfirmation/asc`);
        setDataPayment(results.data);
      } else if (sortValue === "DESC") {
        results = await Axios.get(`${API_URL}/paymentsConfirmation/desc`);
        setDataPayment(results.data);
      } else if (sortValue === "nonsort") {
        results = await Axios.get(`${API_URL}/paymentsConfirmation`);
      }
      setDataPayment(results.data);
    } catch (err) {
      console.log(err);
    }
  };

  const TableHead = () => {
    return (
      <thead>
        <tr className="">
          <th>ID</th>
          <th>Date</th>
          <th>Name</th>
          <th>Payment Proof</th>
          <th>Total</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  const gotoSlug = (idPayment, statusTransaction) => {
    if (statusTransaction === "pending") {
      alert("Check Stock first");
    } else {
      let path = `/payment/${idPayment}`;
      navigate(path);
    }
  };

  const acceptPayment = async (idPayment) => {
    try {
      await Axios.post(
        `${API_URL}/paymentsConfirmation/${idPayment}/accept`
      ).then((res) => {
        getPayment();
        removeInvoiceHeaderIdCookie();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const rejectPayment = async (idPayment) => {
    try {
      const results = await Axios.post(
        `${API_URL}/paymentsConfirmation/${idPayment}/reject`
      );
      console.log(results.data);
      getPayment();
      removeInvoiceHeaderIdCookie();
    } catch (err) {
      console.log(err);
    }
  };

  const TableBody = () => {
    let sortedPayment = [...dataPayment];
    return sortedPayment.map((val, i) => {
      return (
        <tr
          onClick={() => {
            gotoSlug(val.id, val.status);
          }}
        >
          <td>{val.id}</td>
          <td>{val.updatedAt}</td>
          <td>{val.invoice_header.user.full_name}</td>
          <td>
            <img
              src={`${API_URL}/${val.payment_proof}`}
              className="w-20 m-auto"
            ></img>
          </td>
          <td>{currencyFormatter(val.invoice_header.total)}</td>
          <td className="font-semibold capitalize">
            {val.invoice_header.status === "approved" ? (
              <p className="bg-teal-500 text-white py-1 rounded-xl">
                {val.invoice_header.status}
              </p>
            ) : null}
            {val.invoice_header.status === "rejected" ? (
              <p className="bg-red-500 text-white py-1 rounded-xl">
                {val.invoice_header.status}
              </p>
            ) : null}
            {val.invoice_header.status === "pending" ||
            val.invoice_header.status === "unpaid" ? (
              <p className="bg-yellow-500 text-white py-1 rounded-xl">
                {val.invoice_header.status}
              </p>
            ) : null}
          </td>
          <td>
            <div className="my-2 space-x-1">
              {val.invoice_header.status === "pending" ? (
                <>
                  <button
                    onClick={(event) => {
                      acceptPayment(val.id);
                      event.stopPropagation();
                    }}
                    className="bg-teal-500 hover:bg-teal-700 font-semibold text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={(event) => {
                      rejectPayment(val.id);
                      event.stopPropagation();
                    }}
                    class="bg-red-500 hover:bg-red-700 font-semibold text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  >
                    Reject
                  </button>
                </>
              ) : (
                <p className="text-teal-500 font-semibold">No Action Needed</p>
              )}
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
                <h2 className="text-2xl">Payment Confirmation</h2>
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
                  getPayment();
                }}
                name="sort"
              >
                <option name="sort" value="nonsort">
                  Filter By
                </option>
                {/* <option name="lowprice" value="lowprice">
                  Lowest Profit
                </option>
                <option name="highprice" value="highprice">
                  Highest Profit
                </option> */}
                <option name="neworderdate" value="ASC">
                  Newest
                </option>
                <option name="newenddate" value="DESC">
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

export default Payment;
