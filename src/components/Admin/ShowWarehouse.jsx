import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../constant/api";

const ShowWarehouse = () => {
  const [name, setName] = useState("");
  const [addres, setaddres] = useState("");
  const [city, setcity] = useState("");
  const [province, setprovince] = useState("");
  const [postalcode, setpostalcode] = useState(0);
  const [phone, setphone] = useState(0);
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menu, setMenu] = useState(0);

  const {id}= useParams();

  useEffect(() => {
    getWarehouses();
    getCategories();
  }, []);

  const getWarehouses = async () => {
    try {
      await Axios.get(`${API_URL}/warehouses/${id}`).then((results) => {
        setWarehouses(results.data);
        setName(results.data[0].name)
        setaddres(results.data[0].address)
        setcity(results.data[0].city)
        setprovince(results.data[0].province)
        setpostalcode(results.data[0].postal_code)
        setphone(results.data[0].phone)
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

  const SelectCategories = () => {
    return categories.map((val) => {
      return <option value={val.id}>{val.name}</option>;
    });
  };

  const SelectWarehouse = () => {
    return warehouses.map((val) => {
      return <option value={val.id}>{val.name}</option>;
    });
  };

  const GeneralInfo = () => {
    return (
      <section className="content-main-custom" style={{ maxWidth: "1600px" }}>
      <form>
          <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card-custom shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-xl-6 col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="product_title" className="form-label">
                        Warehouse Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="form-control"
                        name="name"
                        id="product_title"
                        value={warehouses.length!==0?name:null}
                        disabled
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="product_price" className="form-label">
                        Contact Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={warehouses.length!==0?phone:null}
                        disabled
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="product_price" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={warehouses.length!==0?addres:null}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6">
                    <div className="mb-2">
                      <label htmlFor="product_price" className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={warehouses.length!==0?city:null}
                        disabled
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="product_price" className="form-label">
                        Province
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={warehouses.length!==0?province:null}
                        disabled
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Postal Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={warehouses.length!==0?postalcode:null}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </form>
    </section>
    );
  }

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
      <div class="tabs">
        <Link to={`/warehouse/${id}`} state={id}><a class="tab tab-lg tab-lifted tab-active">General Info</a></Link>
        <Link to={`/warehouse/${id}/inventory`} state={{id:id,name:name}}><a class="tab tab-lg tab-lifted">Inventories</a></Link>
        <Link to={`/warehouse/${id}/shipping`} state={{id:id,name:name}}><a class="tab tab-lg tab-lifted">Shipping</a></Link>
        <Link to={`/warehouse/${id}/cost`} state={{id:id,name:name}}><a class="tab tab-lg tab-lifted">Operational Cost</a></Link>
      </div>
      {GeneralInfo()}
    </>
  );
};

export default ShowWarehouse;
