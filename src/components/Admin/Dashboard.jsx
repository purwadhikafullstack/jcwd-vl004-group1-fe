import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { toast } from "react-toastify";
import { topCategory, topProduct, topPayment } from "../../data/AdminMaster";
import { currencyFormatter } from '../../helpers/currencyFormatter';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryPie}from 'victory';

const Dashboard = () => {

const [date,setDate] = useState(new Date())

const payment = [
    { x: 1, y: 2, label: 'Sepatu Sonya'},
    { x: 2, y: 3, label: 'Sepatu Sonya'},
    { x: 3, y: 5, label: 'Sepatu Sonya'},
    { x: 4, y: 4, label: 'Sepatu Sonya'},
    { x: 5, y: 6, label: 'Sepatu Sonya'}
];

const products = [
  { x: 1, y: 2, label: 'Sepatu Sonya'},
  { x: 2, y: 3, label: 'Sepatu Osha'},
  { x: 3, y: 5, label: 'Sepatu Adip'},
  { x: 4, y: 4, label: 'Sepatu Nissa'},
  { x: 5, y: 6, label: 'Sepatu Rhandy'}
];

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
                    <span>{currencyFormatter(50000000)}</span>
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
                    <span>200 orders</span>
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
                    <span>50 users</span>
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
                      data={products}
                      height={230}
                      labelPosition="centroid"
                      style={{
                        labels: {
                          fontSize: 12,
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
                      theme={VictoryTheme.material}
                      domainPadding={{ x: 10 }}
                      height={200}
                    >
                      <VictoryBar horizontal
                        style={{
                          data: { fill: "#c43a31" },
                          labels: {
                            fontSize: 12,
                            // fill: ({ datum }) => datum.x === 3 ? "#000000" : "#c43a31"
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
