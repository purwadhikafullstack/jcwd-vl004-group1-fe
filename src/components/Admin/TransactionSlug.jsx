import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { toast } from "react-toastify";
import { data } from "autoprefixer";

const Transaction = () => {
  const [dataInvoiceDetail, setDataInvoiceDetail] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState([]);
  const [selectedProductDetail, setSelectedProductDetail] = useState({});
  const [dataToRequestTable, setDataToRequestTable] = useState([]);
  const [dataInvoiceHeader, setDataInvoiceHeader] = useState({});
  const [transactionId, setTransactionId] = useState(0);
  const [requestedAmount, setRequestedAmount] = useState(0);
  const [totalRequestedAmount, setTotalRequestedAmount] = useState(0);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    getTransactionsById();
  }, []);

  const getTransactionsById = async () => {
    try {
      const results = await Axios.get(`${API_URL}/transactions/${id}`);
      setTransactionId(results.data.id);
      setDataInvoiceHeader(results.data.invoice_header);
      setDataInvoiceDetail(results.data.invoice_header.invoice_details);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductWarehouse = async (productId) => {
    try {
      const results = await Axios.get(
        `${API_URL}/warehouses/${productId}/getAllWarehouseProduct`
      );
      setSelectedProductData(results.data);
      console.log(results.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductDetail = async (productId) => {
    dataInvoiceDetail.map((item) => {
      if (item.productId == productId) {
        setSelectedProductDetail(item);
      }
    });
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
          <th>Quantity</th>
          <th>Request Needed</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return dataInvoiceDetail.map((val, i) => {
      return (
        <tr>
          <td>1</td>
          <td>123456</td>
          <td>{val.product.name}</td>
          <td>{val.warehouse.name}</td>
          <td>{val.warehouseStock}</td>
          <td>{val.quantity}</td>
          <td>{val.requestStock}</td>
          <td className="font-semibold">{val.status}</td>
          <td>
            {val.status == "Stock Insufficient" ? (
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-4 border border-yellow-500 hover:border-transparent rounded"
                type="button"
                onClick={() => {
                  getProductDetail(val.productId);
                  getProductWarehouse(val.productId);
                  setShowModal(true);
                }}
              >
                Request Stock
              </button>
            ) : (
              <p className="text-teal-500 font-semibold">No Action Needed</p>
            )}
          </td>
        </tr>
      );
    });
  };

  const TableHeadModal = () => {
    return (
      <thead>
        <tr className="">
          <th>Warehouse</th>
          <th>Stock Available</th>
          <th>Request Amount</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  const TableBodyModal = () => {
    return selectedProductData.map((val, i) => {
      if (val.warehouse.id != dataInvoiceHeader.warehouseId) {
        return (
          <tr>
            <td>{val.warehouse.name}</td>
            <td>{val.stock_reserved} pcs</td>
            <td>
              {val.stock_reserved > 0 ? (
                <input
                  type="number"
                  onChange={(e) => {
                    setRequestedAmount(e.target.value);
                  }}
                  placeholder="Input Qty"
                  className="input input-bordered w-3/4"
                  style={{ backgroundColor: "white", borderColor: "teal" }}
                />
              ) : null}
            </td>
            <td>
              {val.stock_reserved > 0 ? (
                <button
                  className="bg-teal-500 hover:bg-teal-700 text-white font-semibold py-2 px-4 border border-teal-500 hover:border-transparent rounded"
                  type="button"
                  onClick={() => {
                    submitRequestStock(val.warehouseId, val.stock_reserved);
                  }}
                >
                  Save Changes
                </button>
              ) : (
                <p className="text-red-500 font-semibold">
                  Can't Request from this Warehouse
                </p>
              )}
            </td>
          </tr>
        );
      }
    });
  };

  const submitRequestStock = (warehouseId, readyStock) => {
    if (readyStock < requestedAmount) {
      alert("Request Insufficient");
    } else {
      let temp = dataToRequestTable;

      if (temp.length > 0) {
        let newData = true;
        temp.map((data) => {
          if (data.warehouseRequestedId === warehouseId) {
            data.quantity = parseInt(requestedAmount);
            newData = false;
          }
        });

        if (newData) {
          temp.push({
            warehouseRequestingId: dataInvoiceHeader.warehouseId,
            warehouseRequestedId: warehouseId,
            quantity: parseInt(requestedAmount),
            productId: selectedProductDetail.productId,
          });
        }
      } else {
        temp.push({
          warehouseRequestingId: dataInvoiceHeader.warehouseId,
          warehouseRequestedId: warehouseId,
          quantity: parseInt(requestedAmount),
          productId: selectedProductDetail.productId,
        });
      }

      setDataToRequestTable(temp);
      getTotalRequestedAmount();
    }
  };

  const saveSendToRequest = async (requestedNeeded) => {
    let requestedAmount = 0;
    // console.log(dataToRequestTable);
    dataToRequestTable.map((data) => {
      requestedAmount = requestedAmount + data.quantity;
    });
    if (requestedAmount == requestedNeeded) {
      sendRequest(dataToRequestTable);

      await Axios.patch(`${API_URL}/transactions/${transactionId}`);

      setShowModal(false);
      navigate("/transaction");
    } else {
      alert("Requested Ammount Doesnt Match!");
    }
  };

  const sendRequest = async (datas) => {
    datas.map((data) => {
      Axios.post(`${API_URL}/request/`, data);
    });
  };

  const getTotalRequestedAmount = () => {
    let amount = 0;
    dataToRequestTable.map((val) => {
      amount = amount + val.quantity;
    });

    setTotalRequestedAmount(amount);
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
                    <Link
                      to="/transaction"
                      className="btn btn-accent text-white"
                    >
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
      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      {selectedProductDetail.product.name}
                    </h3>
                    <p>
                      Request Needed:{" "}
                      <span className="font-semibold">
                        {selectedProductDetail.requestStock}
                      </span>
                    </p>
                    <p>
                      Request Amount Preview:{" "}
                      {selectedProductDetail.requestStock ===
                      totalRequestedAmount ? (
                        <span className="font-semibold">
                          {totalRequestedAmount}
                        </span>
                      ) : (
                        <span className="font-semibold text-red-400">
                          {totalRequestedAmount}
                        </span>
                      )}
                    </p>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <table className="table table-compact w-full text-center">
                      {TableHeadModal()}
                      <tbody>{TableBodyModal()}</tbody>
                    </table>
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
                      onClick={() => {
                        // setShowModal(false)
                        saveSendToRequest(selectedProductDetail.requestStock);
                      }}
                    >
                      Request Stock
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
  );
};

export default Transaction;
