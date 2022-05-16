import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { topCategory, topProduct, topPayment } from "../../data/AdminMaster";
import { currencyFormatter } from '../../helpers/currencyFormatter';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryPie}from 'victory';

const Dashboard = () => {

const [product,setProduct] = useState([])
const [payment,setPayment] = useState([])
const [orders,setOrders] = useState(0)
const [sales,setSales] = useState(0)
const [users,setUsers] = useState(0)

useEffect(()=> {
  getProducts();
  getPayments();
  getOrders();
  getUsers();
},[])

const getProducts = async () => {
  try {
    const results = await Axios.get(`${API_URL}/reports/products`, {
      
    })
    if(results){
      results.data.map((val,i)=> {
        let x = i;
        let y = val.total;
        let label = val.name;
        if(y === null) {
          delete results.data[i]
        }
        val['x'] = x;
        val['y'] = y;
        val['label'] = label;
      })
      setProduct(results.data)
    }
  } catch (err) {
    console.log(err);
  }
};

const getPayments = async () => {
  try {
    const results = await Axios.get(`${API_URL}/reports/paymentmethods`, {
      
    })
    if(results){
      results.data.map((val,i)=> {
        let x = val.id;
        let y = val.total;
        let label = val.name;
        if(y === 0) {
          delete results.data[i]
        }
        val['x'] = label;
        val['y'] = y;
        val['label'] = `${y} transactions`;
      })
      setPayment(results.data)
    }
  } catch (err) {
    console.log(err);
  }
};

const getOrders = async () => {
  try {
    const results = await Axios.get(`${API_URL}/reports/order`)
    if(results){
      setOrders(results.data.count)
      let grandtotal = 0;
      results.data.rows.forEach(element => {
        grandtotal += parseInt(element.total);
      });
      results.data['grandtotal'] = grandtotal
      setSales(results.data.grandtotal)
    }
  } catch (err) {
    console.log(err);
  }
};

const getUsers = async () => {
  try {
    const results = await Axios.get(`${API_URL}/reports/register`)
    if(results){
      setUsers(results.data.count)
    }
  } catch (err) {
    console.log(err);
  }
};

const TableHead = () => {
    return (
      <thead>
        <tr>
          <th>No</th>
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
          <td>{val.id}</td>
          <td>
            <b>{val.name}</b>
          </td>
          <td>{val.total}</td>
        </tr>
      );
    });
  };

  const TableBodyPayment = () => {
    return topPayment.map((val, id) => {
      return (
        <tr key={val.id}>
          <td>{val.id}</td>
          <td>
            <b>{val.name}</b>
          </td>
          <td>{val.total}</td>
        </tr>
      );
    });
  };

  return (
    <section className="content-main-full" style={{height:'100vh'}}>
        <div className="row">
            <div className="col-lg-4">
                <div className="card card-body mb-8 mt-4 shadow-sm">
                <article className="icontext">
                    <span className="icon icon-sm rounded-circle alert-success">
                    <i className="text-success fas fa-usd-circle"></i>
                    </span>
                    <div className="text">
                    <h6 className="mb-1">Total Sales</h6>{" "}
                    <span>{currencyFormatter(sales)}</span>
                    </div>
                </article>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card card-body mb-8 mt-4 shadow-sm">
                <article className="icontext">
                    <span className="icon icon-sm rounded-circle alert-primary">
                    <i className="text-primary fas fa-bags-shopping"></i>
                    </span>
                    <div className="text">
                    <h6 className="mb-1">Total Orders</h6>
                    <span>{orders} orders</span>
                    </div>
                </article>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card card-body mb-8 mt-4 shadow-sm">
                <article className="icontext">
                    <span className="icon icon-sm rounded-circle alert-warning">
                    <i className="fas fa-user"></i>
                    </span>
                    <div className="text">
                    <h6 className="mb-1">Total New Register</h6>
                    <span>{users} users</span>
                    </div>
                </article>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6">
                <div className="card mb-4 shadow-sm">
                    <article className="card-body">
                    <h5 className="card-title">Products</h5>
                    <VictoryPie
                      colorScale="cool"
                      data={product}
                      height={230}
                      labelPosition="centroid"
                      style={{
                        labels: {
                          fontSize: 10,
                          // fill: ({ datum }) => datum.x === 3 ? "#000000" : "#c43a31"
                        }
                      }}
                    />
                    </article>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card mb-4 shadow-sm">
                    <article className="card-body">
                    <h5 className="card-title">Payment Method</h5>
                    <VictoryChart
                      domain={{x: [0, 5], y: [0, 10]}}
                      padding={{ top: 50, bottom: 50, left: 90, right: 50 }}
                      height={260}
                    >
                      <VictoryBar horizontal
                        style={{
                          data: { fill: "#c43a31" },
                          labels: {
                            fontSize: 12,
                          },
                        }}
                        data={payment}
                      />
                    </VictoryChart>
                    </article>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Dashboard;
