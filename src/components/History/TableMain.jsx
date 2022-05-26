import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Axios from "axios";
import { API_URL } from "../../constant/api";
import { useSelector } from "react-redux";
import { currencyFormatter } from "../../helpers/currencyFormatter";

const TableMain = () => {
  const [data, setData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  console.log(data);

  const userGlobal = useSelector((state) => state.user);

  useEffect(() => {
    const getInvoice = async () => {
      const results = await Axios.post(`${API_URL}/carts/history`, {
        userId: userGlobal.id,
      });
      setData(results.data.rows);
      setDataCount(results.data.count);
    };
    getInvoice();
  }, [userGlobal]);

  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    setCurrentPage(currentPage);
  };

  return (
    <section className="content-main">
      <div className="space-y-2 flex flex-row items-center space-x-3">
        <h2 className="text-2xl">Purchase History</h2>
      </div>

      {/* Search and Filter Section */}
      <div className="card my-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3 space-x-2">
            <div className="col-lg-4 col-md-6 me-auto flex flex-row">
              <div className="input-group">
                <input
                  type="text"
                  //   onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Transaction"
                  className="input input-bordered w-60"
                  //   value={search}
                />
                <button
                  //   onClick={onSearch}
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

            {/* SELECTED */}
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="select w-full max-w-xs input-bordered text-gray-500"
                // onChange={(e) => setSortValue(e.target.value)}
                name="sort"
              >
                <option name="sort" value="sort">
                  Default
                </option>
                <option name="az" value="az">
                  Pending
                </option>
                <option name="za" value="za">
                  Approved
                </option>
                <option name="lowprice" value="lowprice">
                  Rejected
                </option>
              </select>
            </div>
          </div>
        </header>
      </div>

      <div className="overflow-x-auto space-y-10">
        {data.map((val) => {
          return (
            //   HEADERNYA
            <div className="border-4 shadow-sm">
              <div className="bg-gray-200">
                <div className="space-y-2 text-justify p-3">
                  <h1>Invoice ID: {val.id}</h1>
                  <h1 className="font-bold">
                    Transaction Status:
                    <span className="bg-red text-accent uppercase">
                      {val.status}
                    </span>
                  </h1>
                  <h1>Date: {val.createdAt.slice(0, 10)}</h1>
                </div>
              </div>

              <table className="table table-compact w-full text-center">
                <thead>
                  <tr className="">
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                {/* INVOICE ITEMS */}
                {val.invoice_details.map((val) => {
                  return (
                    <tbody className="border-0">
                      <tr>
                        <th>{val.productId}</th>
                        <td className="flex flex-row justify-center">
                          <img
                            className="mask mask-squircle w-8"
                            src={`${API_URL}/${val.product.product_image}`}
                          />
                        </td>
                        <td>{val.product.name}</td>
                        <td>{currencyFormatter(val.price)}</td>
                        <td>{val.quantity}</td>
                        <td>{currencyFormatter(val.price * val.quantity)}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          );
        })}
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

export default TableMain;
