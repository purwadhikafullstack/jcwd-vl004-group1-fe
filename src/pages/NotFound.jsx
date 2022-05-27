import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotFound = () => {
  const userLocalStorage = localStorage.getItem("userDataEmmerce");
  const adminLocalStorage = localStorage.getItem("adminDataEmmerce");
  const userGlobal = useSelector((state) => state.user);
  const adminGlobal = useSelector((state) => state.admin);
  const [currentUser, setCurrentUser] = useState(0);
  useEffect(() => {
    if (adminGlobal.id) {
      setCurrentUser(2);
    }
    if (userGlobal.id) {
      setCurrentUser(1);
    }
    if (!userGlobal.id && !adminGlobal.id) {
      setCurrentUser(0);
    }
  }, [userGlobal, adminGlobal]);
  return (
    <>
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center mb-2 mb-sm-5">Page Not Found</h4>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src="/images/not-found.png"
            alt="Not-found"
          />
          {currentUser === 2 ? (
            <>
              <button className="col-md-3 col-sm-6 col-12 btn btn-success mt-5">
                <Link
                  to="/products"
                  className="text-white text-decoration-none"
                >
                  Admin Page
                </Link>
              </button>
            </>
          ) : (
            <>
              <button className="col-md-3 col-sm-6 col-12 btn btn-success mt-5">
                <Link to="/" className="text-white text-decoration-none">
                  Home page
                </Link>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NotFound;
