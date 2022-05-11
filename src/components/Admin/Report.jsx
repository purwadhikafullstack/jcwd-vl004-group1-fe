import React, { useState, useEffect } from "react";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { currencyFormatter } from '../../helpers/currencyFormatter';
import { topProduct, ReportData } from "../../data/AdminMaster";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Warehouses = () => {
  const [data, setData] = useState([]);
  const [sortValue, setSortValue] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);

  const [date, setDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);

  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [cost, setCost] = useState(0);
  const [transactions, setTransactions] = useState(0);

  const [pagination, setPagination] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(12);

  useEffect(() => {
    getWarehouses();
    getCategories();
    getValues();
  }, []);

  useEffect(() => {
    setOpenCalendar(false)
  }, [date]);

  const getWarehouses = async () => {
    try {
      await Axios.get(`${API_URL}/warehouses`).then((results) => {
        setWarehouses(results.data);
      });
    } catch (err) {
      console.log(err);
    }
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

  const getValues = () => {
    var rev = 0;
    var cos = 0;
    ReportData.map((val)=> {
      rev = rev + parseInt(val.revenue)
      cos = cos + parseInt(val.fixed_cost) + parseInt(val.operational_cost)
    })
    setRevenue(rev)
    setCost(cos)
    setProfit(rev-cos)
    setTransactions(ReportData.length)
    setData(ReportData)
  }

  // SORTING PRODUCTS
  useEffect(() => {
    const getBySort = async () => {
      try {
        let results;
        if (sortValue === "newenddate") {
          results = await Axios.get(`${API_URL}/report/sort/newenddate`);
        } else if (sortValue === "neworderdate") {
          results = await Axios.get(`${API_URL}/report/sort/neworderdate`);
        } else if (sortValue === "lowpofit") {
          results = await Axios.get(`${API_URL}/report/sort/lowpofit`);
        } else if (sortValue === "highprofit") {
          results = await Axios.get(`${API_URL}/report/sort/highprofit`);
        } else if (sortValue === "sort") {
          results = await Axios.get(`${API_URL}/report`);
        }
        setData(results.data);
        console.log(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBySort();
  }, [sortValue]);

  const SelectWarehouse = () => {
    return warehouses.map((val, idx) => {
      return <option key={idx}>{val.name}</option>;
    });
  };

  useEffect(() => {
    getIndex(12);
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
    let start = (num-1)*12
    let end = num*12
    setPageStart(start)
    setPageEnd(end)
  }

  const TableHead = () => {
    return (
      <thead>
        <tr className="">
          <th>No. </th>
          <th>Username</th>
          <th>Warehouse</th>
          <th>Actual Order Time</th>
          <th>Actual End Time</th>
          <th>Fixed Cost</th>
          <th>Operational Cost</th>
          <th>Total Cost</th>
          <th>Revenue</th>
          <th>Profit</th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return ReportData.map((val, idx) => {
      return (
        <tr key={idx}>
          <td>{idx+1}</td>
          <td>{val.username}</td>
          <td>{val.warehouse}</td>
          <td>{val.actual_order_time}</td>
          <td>{val.actual_end_time}</td>
          <td>{currencyFormatter(val.fixed_cost)}</td>
          <td>{currencyFormatter(val.operational_cost)}</td>
          <td>{currencyFormatter((parseInt(val.fixed_cost)+parseInt(val.operational_cost)))}</td>
          <td>{currencyFormatter(val.revenue)}</td>
          <td>{currencyFormatter((parseInt(val.revenue)-(parseInt(val.fixed_cost)+parseInt(val.operational_cost))))}</td>
        </tr>
      );
    });
  };

  const TableHead2 = () => {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Total</th>
        </tr>
      </thead>
    );
  };

  const TableBodyProduct = () => {
    return topProduct.map((val, id) => {
      return (
        <tr key={val.id}>
          <td>{val.name}</td>
          <td>{val.total}</td>
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
                <h2 className="text-2xl">Sales Report</h2>
              </div>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <select 
                style={{backgroundColor:"white",borderColor:"teal"}}
                className="select w-full max-w-xs input-bordered text-gray-500 bg-light"
                onClick={()=>setOpenCalendar(!openCalendar)}>
                <option>
                  {date.toString().slice(4,15)}
                </option>
              </select>
              {openCalendar && (
                <div className='calendar-container'>
                  <Calendar onChange={setDate} value={date} />
                </div>
              )}
            </div>
            <div className="col-lg-2 col-6 col-md-3">
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
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                style={{backgroundColor:"white",borderColor:"teal"}}
                className="select w-full max-w-xs input-bordered text-gray-500 bg-light"
                onChange={(e) => setSortValue(e.target.value)}
                name="sort"
              >
                <option name="sort" value="sort">
                  Filter By
                </option>
                <option name="lowprice" value="lowprice">
                  Lowest Profit
                </option>
                <option name="highprice" value="highprice">
                  Highest Profit
                </option>
                <option name="neworderdate" value="neworderdate">
                  Newest Order Time
                </option>
                <option name="newenddate" value="newenddate">
                  Newest Endt Time
                </option>
              </select>
            </div>
          </div>
        </header>
      </div>

      <div className="row col-lg-12">
          <div className="col-lg-4">
              <div className="card card-body mb-6 shadow-sm">
              <article className="icontext">
                  <span className="icon icon-sm rounded-circle alert-primary">
                  <i className="text-primary fas fa-usd-circle"></i>
                  </span>
                  <div className="text">
                  <h6 className="mb-1">Revenue</h6>{" "}
                  <span>{currencyFormatter(revenue)}</span>
                  </div>
              </article>
              </div>
              <div className="card card-body mb-6 shadow-sm">
              <article className="icontext">
                  <span className="icon icon-sm rounded-circle alert-warning">
                  <i className="fas fa-bags-shopping"></i>
                  </span>
                  <div className="text">
                  <h6 className="mb-1">Number Of Sales</h6>
                  <span>{transactions} transactions</span>
                  </div>
              </article>
              </div>
          </div>
          <div className="col-lg-4">
              <div className="card card-body mb-6 shadow-sm">
              <article className="icontext">
                  <span className="icon icon-sm rounded-circle alert-success">
                  <i className="text-success fas fa-money-bill"></i>
                  </span>
                  <div className="text">
                  <h6 className="mb-1">Profit</h6>
                  <span>{currencyFormatter(profit)}</span>
                  </div>
              </article>
              </div>
              <div className="card card-body mb-6 shadow-sm">
              <article className="icontext">
                  <span className="icon icon-sm rounded-circle alert-error">
                  <i className="fas fa-file-invoice"></i>
                  </span>
                  <div className="text">
                  <h6 className="mb-1">Total Cost</h6>
                  <span>{currencyFormatter(cost)}</span>
                  </div>
              </article>
              </div>
          </div>
          <div className="col-lg-4">
              <div className="card mb-4 shadow-sm">
                  <article className="card-body">
                  <p className="card-title">Top 3 Products</p>
                  <table className="table">
                      {TableHead2()}
                      {TableBodyProduct()}
                  </table>
                  </article>
              </div>
              
          </div>
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