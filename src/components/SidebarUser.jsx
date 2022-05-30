import React from "react";
import { Link, NavLink } from "react-router-dom";

const SidebarUser = () => {
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
                className="menu-link"
                to="/profile"
              >
                <i className="icon fas fa-user"></i>
                <span className="text">Profile Settings</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/profile"
              >
                <i className="icon fas fa-cart-plus"></i>
                <span className="text">Purchase History</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink
                activeclassname="active"
                className="menu-link"
                to="/profile"
              >
                <i className="icon far fa-sack-dollar"></i>
                <span className="text">Payment</span>
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

export default SidebarUser;
