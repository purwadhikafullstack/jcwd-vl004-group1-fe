import React, { useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../assets/styles/user.css";
import "../assets/styles/responsive.css";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userGlobal = useSelector((state) => state.user);
  const logout = () => {
    dispatch({
      type: "USER_LOGOUT",
    });
    localStorage.removeItem("userDataEmmerce");
    navigate("/login");
  };
  return (
    <div>
      {/* Top Header */}
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>+62 818 356 890</p>
              <p>customerservice@shoesshop.com</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img
                      alt="logo"
                      src="/images/logo.jpg"
                      style={{ width: 30, borderRadius: 60 }}
                    />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userGlobal.id === 0 ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logout}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-user"></i>
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>

                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                    </div>
                  </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">9</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img
                    alt="logo"
                    src="/images/logo.jpg"
                    style={{ width: 60, borderRadius: 60 }}
                  />
                </Link>
              </div>
              <div className="col-md-9 d-flex align-items-center justify-content-end Login-Register">
                  {userGlobal.id === 0 ? (
                    <>
                    <Link to="/">About Us</Link>
                    <Link to="/catalog">Catalog</Link>
                    <div class="dropdown dropdown-end">
                      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full" style={{color:"black"}}>
                          <img src="/images/user-white.png" />
                        </div>
                      </label>
                      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li><Link to="/login"><a class="justify-between">Login</a></Link></li>
                        <li><Link to="/register"><a>Register</a></Link></li>
                        <li><Link to="/admin"><a>Admin</a></Link></li>
                      </ul>
                    </div>
                    </>
                  ) : (
                    <>
                      <h1 className="text-gray-100 pr-7">Welcome, {userGlobal.username}!</h1>
                      <Link to="/cart">
                        <i className="fas fa-shopping-bag"></i>
                        <span className="badge">0</span>
                      </Link>
                      <div class="dropdown dropdown-end">
                        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                          <div class="w-10 rounded-full">
                            <img src="/images/user-white.png" />
                          </div>
                        </label>
                        <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-light rounded-box w-52">
                          <li onClick={logout}><a>LOGOUT</a></li>
                        </ul>
                      </div>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
