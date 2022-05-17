import React, { useState, useEffect } from "react";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { currencyFormatter } from '../../helpers/currencyFormatter';
import { ReportData } from "../../data/AdminMaster";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { VictoryChart, VictoryBar, VictoryLine, VictoryAxis}from 'victory';

const Warehouses = () => {
  const [data, setData] = useState([]);
  const [sortValue, setSortValue] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topProduct, setTopProduct] = useState([]);

  const [date, setDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openEndCalendar, setOpenEndCalendar] = useState(false);

  const [revenue, setRevenue] = useState(0);
  const [profit, setProfit] = useState(0);
  const [cost, setCost] = useState(0);
  const [transactions, setTransactions] = useState(0);

  const [pagination, setPagination] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(12);

  const profitData=[
    { x: '19 Mei 2022', y: 2 },
    { x: '20 Mei 2022', y: 3 },
    { x: '21 Mei 2022', y: 5 },
    { x: '22 Mei 2022', y: 4 },
    { x: '23 Mei 2022', y: 6 }
  ]

  useEffect(() => {
    getWarehouses();
    getCategories();
    getValues();
    getTopProduct();
  }, []);

  useEffect(() => {
    setOpenCalendar(false)
  }, [date]);

  useEffect(() => {
    setOpenEndCalendar(false)
  }, [enddate]);

  const getWarehouses = async () => {
    try {
      const results = await Axios.get(`${API_URL}/warehouses`)
      if(results){
        setWarehouses(results.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCategories = async () => {
    try {
      const results = await Axios.get(`${API_URL}/products/categories`)
      if(results){
        setCategories(results.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getTopProduct = async () => {
    try {
      const results = await Axios.post(`${API_URL}/reports/topproducts`, {
        date,
        enddate
      })
      if(results){
        setTopProduct(results.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getValues = async () => {
    let date = "2022-05-15"
    try {
      const results = await Axios.post(`${API_URL}/reports/transactions`, {
        date,
        enddate
      })
      if(results){
        let rev = 0;
        let cos = 0;
        let pro = 0;
        results.data.map((val)=> {
          //for table
          val['fixed_cost'] = 200000
          val['operational_cost'] = 25000
          val['total_cost'] = val['fixed_cost'] + val['operational_cost']
          val['revenue']= val.invoice_header.total
          val['profit']= val.invoice_header.total - val['total_cost']
          //for summary
          rev += parseInt(val['revenue'])
          cos += val['total_cost']
          pro += val['profit']
        })
        setRevenue(rev)
        setCost(cos)
        setProfit(pro)
        setTransactions(results.data.length)
        setData(results.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getSummary = async () => {
    let date = "2022-05-15"
    try {
      const results = await Axios.post(`${API_URL}/reports/transactions`, {
        date,
        enddate
      })
      if(results){
        let rev = 0;
        let cos = 0;
        let pro = 0;
        let date = "";
        results.data.map((val)=> {
          //for table
          val['fixed_cost'] = 200000
          val['operational_cost'] = 25000
          val['total_cost'] = val['fixed_cost'] + val['operational_cost']
          val['revenue']= val.invoice_header.total
          val['profit']= val.invoice_header.total - val['total_cost']
          //for summary
          rev += parseInt(val['revenue'])
          cos += val['total_cost']
          pro += val['profit']
          date = val.createdAt.slice(0.10)

        })
        setRevenue(rev)
        setCost(cos)
        setProfit(pro)
        setTransactions(results.data.length)
        setData(results.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // SORTING PRODUCTS
  useEffect(() => {
    const getBySort = async () => {
      try {
        let results;
        if (sortValue === "newenddate") {
          results = await Axios.get(`${API_URL}/reports/sort/newestendtime`);
        } else if (sortValue === "neworderdate") {
          results = await Axios.get(`${API_URL}/reports/sort/newestordertime`);
        // } else if (sortValue === "lowpofit") {
        //   results = await Axios.get(`${API_URL}/report/sort/lowpofit`);
        // } else if (sortValue === "highprofit") {
        //   results = await Axios.get(`${API_URL}/report/sort/highprofit`);
        } else if (sortValue === "sort") {
          results = await Axios.get(`${API_URL}/report`);
        }
        let rev = 0;
        let cos = 0;
        let pro = 0;
        results.data.map((val)=> {
          //for table
          val['fixed_cost'] = 200000
          val['operational_cost'] = 25000
          val['total_cost'] = val['fixed_cost'] + val['operational_cost']
          val['revenue']= val.invoice_header.total
          val['profit']= val.invoice_header.total - val['total_cost']
          //for summary
          rev += parseInt(val['revenue'])
          cos += val['total_cost']
          pro += val['profit']
        })
        setRevenue(rev)
        setCost(cos)
        setProfit(pro)
        setTransactions(results.data.length)
        setData(results.data);
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
          {/* <th>Warehouse</th> */}
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
    return data.map((val, idx) => {
      return (
        <tr key={idx}>
          <td>{idx+1}</td>
          <td>{val.invoice_header.user.username}</td>
          {/* <td>harcode warehouse</td> */}
          <td>{val.createdAt}</td>
          <td>{val.updatedAt}</td>
          <td>{currencyFormatter(val.fixed_cost)}</td>
          <td>{currencyFormatter(val.operational_cost)}</td>
          <td>{currencyFormatter(val.total_cost)}</td>
          <td>{currencyFormatter(val.revenue)}</td>
          <td>{currencyFormatter(val.profit)}</td>
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
      <div className="card mb-3 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3 space-x-2">
            <div className="col-lg-5 col-md-6 me-auto flex flex-row">
              <div className="space-y-2 flex flex-row items-center space-x-3">
                <h2 className="text-2xl">Sales Report</h2>
              </div>
            </div>

            <div className="col-lg-2 col-6 col-md-3">
              <input
                type="text"
                style={{backgroundColor:"white",borderColor:"teal"}}
                className="select w-full max-w-xs input-bordered text-gray-500 bg-light"
                value={date.toString().slice(4,15)}
                onClick={()=>setOpenCalendar(!openCalendar)}
                contentEditable={false}
              />
              {openCalendar && (
                <div className='calendar-container'>
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
                style={{backgroundColor:"white",borderColor:"teal"}}
                className="select w-full max-w-xs input-bordered text-gray-500 bg-light"
                value={enddate.toString().slice(4,15)}
                onClick={()=>setOpenEndCalendar(!openEndCalendar)}
                contentEditable={false}
              />
              {openEndCalendar && (
                <div className='calendar-container'>
                  <Calendar onChange={setEndDate} value={enddate} />
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
                  Filter By
                </option>
                {/* <option name="lowprice" value="lowprice">
                  Lowest Profit
                </option>
                <option name="highprice" value="highprice">
                  Highest Profit
                </option> */}
                <option name="neworderdate" value="neworderdate">
                  Newest Order Time
                </option>
                <option name="newenddate" value="newenddate">
                  Newest End Time
                </option>
              </select>
            </div>
          </div>
        </header>
      </div>

      <div className="row col-lg-12">
          <div className="col-lg-4">
              <div className="card card-body mb-3 shadow-sm">
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
          </div>
          <div className="col-lg-4">
              <div className="card card-body mb-3 shadow-sm">
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
              <div className="card card-body mb-3 shadow-sm">
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
          </div>
          <div className="col-lg-8">
              <div className="card mb-6 shadow-sm">
              <div style={{padding:20}}>
              <h5 className="card-title">Summary</h5>
              </div>
              <VictoryChart 
                domain={{ x: [0, 7] }} 
                height={190}
                padding={{ top: 10, bottom: 40, left: 50, right: 50 }}>
                  <VictoryAxis
                    style={{
                      tickLabels: {
                        fontSize: 8
                      }
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    orientation="left"
                    style={{ tickLabels: { fontSize: 10 } }}
                  />
                <VictoryBar
                  name="Revenue"
                  style={{ data: { fill: "blue" } }}
                  data={[
                    { x: '19 Mei 2022', y: 2 }, { x: '20 Mei 2022', y: 4 }, { x: '21 Mei 2022', y: 6 }, { x: '22 Mei 2022', y: 9 },
                    { x: '23 Mei 2022', y: 4 }, { x: '24 Mei 2022', y: 12 }, { x: '25 Mei 2022', y: 16 }
                  ]}
                />
                <VictoryBar
                  name="Cost"
                  style={{ data: { fill: "red" } }}
                  data={[
                    { x: '19 Mei 2022', y: 1 }, { x: '20 Mei 2022', y: 2 }, { x: '21 Mei 2022', y: 1 }, { x: '22 Mei 2022', y: 6 },
                    { x: '23 Mei 2022', y: 11 }, { x: '24 Mei 2022', y: 8 }, { x: '25 Mei 2022', y: 6 }
                  ]}
                />
                <VictoryLine
                  name="Profit"
                  style={{ data: { stroke: "green", strokeWidth: 1 } }}
                  data={[
                    { x: 0, y: 0 },
                    { x: '19 Mei 2022', y: 2 },
                    { x: '20 Mei 2022', y: 3 },
                    { x: '21 Mei 2022', y: 5 },
                    { x: '22 Mei 2022', y: 4 },
                    { x: '23 Mei 2022', y: 1 },
                    { x: '24 Mei 2022', y: 8 },
                    { x: '25 Mei 2022', y: 10 },
                  ]}
                />
              </VictoryChart>
              </div>
          </div>
          <div className="col-lg-4">
              <div className="card card-body mb-3 shadow-sm">
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
              <div className="card mb-6 shadow-sm">
                <article className="card-body">
                  <h5 className="card-title">Top 3 Most Sold</h5>
                  <table className="table table-compact w-full text-center">
                    {TableHead2()}
                    <tbody>{TableBodyProduct()}</tbody>
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