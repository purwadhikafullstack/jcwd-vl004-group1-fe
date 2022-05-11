import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { toast } from "react-toastify";
import { topCategory, topProduct, topPayment } from "../../data/AdminMaster";
import { currencyFormatter } from '../../helpers/currencyFormatter';

const Dashboard = () => {

const [date,setDate] = useState(new Date())

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
    <section className="content-main-full">
        <div className="row">
            <div className="col-lg-4">
                <div className="card card-body mb-4 shadow-sm">
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
                <div className="card card-body mb-4 shadow-sm">
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
                <div className="card card-body mb-4 shadow-sm">
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
                    <h5 className="card-title">Top 3 Products</h5>
                    <table className="table">
                        {TableHead()}
                        {TableBodyProduct()}
                    </table>
                    </article>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card mb-4 shadow-sm">
                    <article className="card-body">
                    <h5 className="card-title">Top 3 Payment Method</h5>
                    <table className="table">
                        {TableHead()}
                        {TableBodyPayment()}
                    </table>
                    </article>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Dashboard;
