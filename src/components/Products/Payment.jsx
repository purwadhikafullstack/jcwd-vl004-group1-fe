import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { currencyFormatter } from "../../helpers/currencyFormatter";

const Payment = () => {
  const [dataPayment, setDataPayment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPayment();
  }, []);

  const getPayment = async () => {
    try {
      const results = await Axios.get(`${API_URL}/paymentsConfirmation`);
      setDataPayment(results.data);
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
      });
    } catch (err) {
      console.log(err);
    }
  };

  const rejectPayment = async (idPayment) => {
    try {
      await Axios.post(
        `${API_URL}/paymentsConfirmation/${idPayment}/reject`
      ).then((res) => {
        getPayment();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const TableBody = () => {
    return dataPayment.map((val, i) => {
      return (
        <tr
          onClick={() => {
            gotoSlug(val.id, val.status);
          }}
        >
          <td>{val.id}</td>
          <td>{val.createdAt}</td>
          <td>{val.invoice_header.user.full_name}</td>
          <td>{val.payment_proof}</td>
          <td>{currencyFormatter(val.invoice_header.total)}</td>
          <td className="font-semibold capitalize">
            <p
              className={
                val.invoice_header.status === "approved"
                  ? "bg-teal-500 text-white py-1 rounded-xl"
                  : "bg-red-500 text-white py-1 rounded-xl"
              }
            >
              {val.invoice_header.status}
            </p>
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
          <div className="row gx-3 py-3">
            <div className="col-lg-6 col-md-6 me-auto flex flex-row">
              <div className="space-y-2 flex flex-row items-center space-x-3">
                <h2 className="text-2xl">Payment Confirmation</h2>
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
