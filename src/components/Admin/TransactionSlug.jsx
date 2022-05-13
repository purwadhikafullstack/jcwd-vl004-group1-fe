import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { toast } from "react-toastify";

const Transaction = () => {
  const [dataTransaction, setDataTransaction] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const {id} = useParams()

  useEffect(() => {
    getTransactionsById()
  }, []);

  const getTransactionsById = async () => {
    try {
        const results = await Axios.get(`${API_URL}/transactions/${id}`);
        // setDataTransaction(results.data.invoice_header);
        setDataTransaction(results.data.invoice_header.invoice_details)
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
                <th>Products</th>
                <th>Warehouse</th>
                <th>Stock Available</th>
                <th>Stock Needed</th>
                <th>Stock Requested</th>
                <th>User Address</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
          </thead>
        );
      };
    
      const TableBody = () => {
        return dataTransaction.map((val, i) => {
          return (
              <tr>
                  <td>1</td>
                  <td>123456</td>
                  <td>{val.product.name}</td>
                  <td>Jakarta</td>
                  <td>{val.warehouseStock}</td>
                  <td>{val.requestStock}</td>
                  <td>{val.quantity}</td>
                  <td>Jakarta</td>
                  <td>{val.status}</td>
                  <td>
                    {val.status == "Stock insufficient" ?
                    
                    <button
                    className="text-white bg-pink-500 hover:bg-pink-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    Request Stock
                  </button>
                    
                    
                    : <p className="text-teal-500">No Action Needed</p>
                    }
                  </td>
              </tr>
          )
        })
      };

    return (
        <section className="content-main-full">
        {/* Search and Filter Section */}
        <div className="card mb-4 shadow-sm">
            <header className="card-header bg-white ">
            <div className="row gx-3 py-3">
                <div className="col-lg-6 col-md-6 me-auto flex flex-row">
                  <div className="space-y-2 flex flex-row items-center space-x-3">
                    <div className="row">
                      <div className="flex flex-row space-x-4 items-center">
                        <Link to="/transaction" className="btn btn-accent text-white">
                          <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </Link>
                        <h2 className="content-title text-2xl">Transaction {id}</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 me-auto flex flex-row">
                <div className="input-group justify-content-end">
                    <input
                    type="text"
                    //   onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search User by username...."
                    className="input input-bordered w-60"
                    style={{backgroundColor:"white",borderColor:"teal"}}
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
                {/* {pagination.map((item)=> {
                return (
                    <li className="page-item" key={item} onClick={()=>selectpage(item)}><button className="page-link">{item}</button></li>
                )
                })} */}
                {/* <li class="page-item">
                <a class="page-link" href="#">Next</a>
                </li> */}
            </ul>
            </nav>
        </div>
        <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Modal Title
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
        </section>
    )
};

export default Transaction;
