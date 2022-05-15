import React from "react";
import AddShipping from "./AddShipping";
import ShippingTable from "./ShippingTable";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const MainShipping = () => {
  const { id, name } = useParams();

  return (
    <>
      <section className="content-main" style={{ maxWidth: "1600px" }}>
        <form>
          <div className="row">
            <div className="flex flex-row space-x-4 mb-3 items-center">
              <Link to="/warehouse" className="btn btn-accent text-white">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </Link>
              <h2 className="content-title text-2xl">Warehouse {name}</h2>
            </div>
          </div>
        </form>
      </section>
      <div className="tabs">
        <Link to={`/warehouse/${id}`} state={id}>
          <a class="tab tab-lg tab-lifted">General Info</a>
        </Link>
        <Link to={`/warehouse/${id}/inventory`} state={{ id: id, name: name }}>
          <a class="tab tab-lg tab-lifted">Inventories</a>
        </Link>
        <Link to={`/warehouse/${id}/shipping`} state={{ id: id, name: name }}>
          <a class="tab tab-lg tab-lifted tab-active">Shipping</a>
        </Link>
        <Link to={`/warehouse/${id}/cost`} state={{ id: id, name: name }}>
          <a class="tab tab-lg tab-lifted">Operational Cost</a>
        </Link>
      </div>
      <section className="content-main-custom">
        {/* <form> */}
        <div className="row mb-4">
          <div className="col-xl-12 col-lg-12">
            <div className="card-custom mb-4 shadow-sm">
              <div className="card-body">
                <div className="row">{ShippingTable()}</div>
              </div>
            </div>
          </div>
        </div>
        {/* </form> */}
      </section>
    </>
  );
};

export default MainShipping;
