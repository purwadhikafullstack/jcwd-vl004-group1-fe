import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../constant/api";
import { cities, provinces, postal_code } from "../../data/AdminMaster";

const AddWarehouse = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalCode] = useState(0);
  const [phone, setPhone] = useState(0);
  const [warehouses, setWarehouses] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.state)
  }, []);

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("province", province);
      formData.append("postal_code", postalcode);
      formData.append("phone", phone);
      console.log(formData);

      await Axios.post(`${API_URL}/warehouses/add`, formData).then((results) => {
        console.log(results.data);
        navigate("/warehouse");
      });
    } catch (err) {
      console.log(err);
    }
  };

  const SelectCities = () => {
    return cities.map((val) => {
      return <option value={val.id}>{val.name}</option>;
    });
  };

  const SelectProvince = () => {
    return provinces.map((val) => {
      return <option value={val.id}>{val.name}</option>;
    });
  };

  const SelectPostalCode = () => {
    return postal_code.map((val) => {
      return <option value={val.id}>{val.name}</option>;
    });
  };

  return (
    <>
      <section className="content-main" style={{ maxWidth: "1600px" }}>
        <form>
          <div className="row mb-4">
            <div className="flex flex-row space-x-4 mb-3 items-center">
              <Link to="/warehouse" className="btn btn-accent text-white">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
              </Link>
              <h2 className="content-title text-2xl">{location.state!==null?"Edit Warehouse":"Add New Warehouse"}</h2>
            </div>
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
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
                          value={location.state!==null?location.state.name:null}
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="product_price" className="form-label">
                          Contact Number
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          name="price"
                          id="product_price"
                          value={location.state!==null?"0"+location.state.phone:null}
                          required
                          onChange={(e) => setPhone(+e.target.value)}
                        />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="product_price" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          name="stock"
                          id="product_stock"
                          value={location.state!==null?location.state.address:null}
                          required
                          onChange={(e) => setAddress(+e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                      <div className="mb-2">
                        <label htmlFor="product_price" className="form-label">
                          City
                        </label>
                        <select
                          onChange={(e) => {
                            setCity(+e.target.value);
                            e.preventDefault();
                          }}
                          className="form-select"
                          name="productCategoryId"
                          value={location.state!==null?location.state.city:city}
                        >
                          <option>Choose City</option>
                          {SelectCities()}
                        </select>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="product_price" className="form-label">
                          Province
                        </label>
                        <select
                          onChange={(e) => {
                            e.preventDefault();
                            setProvince(+e.target.value);
                          }}
                          className="form-select"
                          name="warehouseId"
                          value={location.state!==null?location.state.province:province}
                        >
                          <option>Choose Province</option>
                          {SelectProvince()}
                        </select>
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Postal Code</label>
                        <select
                          onChange={(e) => {
                            e.preventDefault();
                            setPostalCode(+e.target.value);
                          }}
                          className="form-select"
                          name="warehouseId"
                          value={location.state!==null?location.state.postal_code:postalcode}
                        >
                          <option>Choose Postal Code</option>
                          {SelectPostalCode()}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <button
                      type="submit"
                      className="btn btn-accent inline-block"
                      onClick={(e) => onSubmit(e)}
                      encType="multipart/form-data"
                    >
                      Publish now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddWarehouse;
