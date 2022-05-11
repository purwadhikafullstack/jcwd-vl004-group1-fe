import React from "react";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/dashboard" className="brand-wrap">
            <img
              src="/images/logo.jpg"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-accent btn-aside-minimize">
              <i className="fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link ml-1"
                to="/products"
              >
                <i className="icon fas fa-shopping-bag"></i>
                <span className="text">Products</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/addproduct"
              >
                <i className="icon fas fa-cart-plus"></i>
                <span className="text">Add product</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/category"
              >
                <i className="icon fas fa-list"></i>
                <span className="text">Categories</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/user"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Users</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/warehouse"
              >
                <i className="icon fas fa-building"></i>
                <span className="text">Warehouses</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/report"
              >
                <i className="icon fas fa-file"></i>
                <span className="text">Report</span>
                </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/transaction"
              >
                <i className="icon fas fa-list"></i>
                <span className="text">Transaction</span>
              </NavLink>
            </li>
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
