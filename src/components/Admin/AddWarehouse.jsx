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
  const [phone, setPhone] = useState("");
  const [provinceData, setProvinceData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    getCities()
    getProvince()
  },[])

  useEffect(() => {
    if(location.state!==null){
      setName(location.state.name)
      setAddress(location.state.address)
      setCity(location.state.city)
      setProvince(location.state.province)
      setPostalCode(location.state.postal_code)
      setPhone(location.state.phone)
    }
    console.log(location.state)
  }, [location]);

  const getProvince = async () => {
    try {
      const results = await Axios.get(`${API_URL}/users/provinces`)
      if(results){
        setProvinceData(results.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCities = async () => {
    try {
      const results = await Axios.get(`${API_URL}/cities/`)
      if(results){
        setCityData(results.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const results = await Axios.post(`${API_URL}/warehouses/add`, {
        name,
        address,
        city,
        province,
        postalcode,
        phone
      });
      if(results){
        navigate('/warehouse')
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmitEdit = async (id) => {
    try {
      const results = await Axios.patch(`${API_URL}/warehouses/update/${location.state.id}`, {
        name,
        address,
        city,
        province,
        postalcode,
        phone
      });
      if(results){
        navigate('/warehouse')
      }
    } catch (err) {
      console.log(err);
    }
  };

  const SelectCities = () => {
    return cities.map((val) => {
      return <option key={val.id} value={val.name}>{val.name}</option>;
    });
  };

  const SelectProvince = () => {
    return provinces.map((val) => {
      return <option key={val.id} value={val.name}>{val.name}</option>;
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
                        <label htmlFor="warehouse_name" className="form-label">
                          Warehouse Name
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          name="name"
                          id="warehouse_name"
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="contact_number" className="form-label">
                          Contact Number
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          name="phone"
                          id="contact_number"
                          value={phone}
                          required
                          onChange={(e) => setPhone(+e.target.value)}
                        />
                      </div>
                      <div className="mb-2">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          name="address"
                          id="address"
                          value={address}
                          required
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                      <div className="mb-2">
                        <label htmlFor="province" className="form-label">
                          Province
                        </label>
                        <select
                          onChange={(e) => {
                            e.preventDefault();
                            setProvince(e.target.value);
                          }}
                          className="form-select"
                          name="province"
                          value={province}
                        >
                          <option>Choose Province</option>
                          {SelectProvince()}
                        </select>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <select
                          onChange={(e) => {
                            setCity(e.target.value);
                            e.preventDefault();
                          }}
                          className="form-select"
                          name="city"
                          value={city}
                        >
                          <option>Choose City</option>
                          {SelectCities()}
                        </select>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="postal_code" className="form-label">
                          Postal Code
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          name="postal_code"
                          id="postal_code"
                          value={postalcode}
                          required
                          onChange={(e) => setPostalCode(+e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {location.state!==null?(
                    <div className="row">
                      <button
                        type="submit"
                        className="btn btn-accent inline-block"
                        onClick={(e) => {
                          e.preventDefault();
                          onSubmitEdit(location.state.id)
                        }}
                        encType="multipart/form-data"
                      >
                        Update
                      </button>
                    </div>
                  ):(
                    <div className="row">
                      <button
                        type="submit"
                        className="btn btn-accent inline-block"
                        onClick={(e) => onSubmit(e)}
                        encType="multipart/form-data"
                      >
                        Submit
                      </button>
                    </div>
                  )}
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
