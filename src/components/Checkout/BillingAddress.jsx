import React, { useEffect, useState } from "react";
import {
  Navigate,
  NavLink,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../../constant/api";
import { AiOutlineCheck } from "react-icons/ai";
import { toast } from "react-toastify";
import { getAddressCookie } from "../../hooks/getCookie";
import {
  removeAddressCookie,
  removePaymentCookie,
  removeShipmentCookie,
} from "../../hooks/removeCookie";
import Axios from "axios";
import useGeoLocation from "../../hooks/useGeoLocation";

const BillingAddress = () => {
  const [cartItems, setCartItems] = useOutletContext([]);
  const [change, setChange] = useOutletContext(0);
  const [data, setData] = useState([]);
  const [provinceData, setProvincesData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [address_line, setAddress_Line] = useState("");
  const [address_type, setAddress_Type] = useState("Home");
  const [cityId, setCityId] = useState(0);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [provinceId, setProvinceId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [postal_code, setPostal_Code] = useState(0);
  const [phone, setPhone] = useState(0);
  const [mobile, setMobile] = useState(0);
  const [locStorage, setLocStorage] = useState(0);
  const [addressCookies, setAddressCookies] = useState({});
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  let [isDefault, setIsDefault] = useState(false);

  // const location = useGeoLocation();
  const userGlobal = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getLocation = () => {
    if (userGlobal.user_addresses.length === 6) {
      document.getElementById("my-modal-4").click();
      toast.success("You can only add up to 6 address", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        setLatitude(null);
        setLongitude(null);
      }
    }
  };

  const showPosition = (result) => {
    setLatitude(JSON.parse(result.coords.latitude));
    setLongitude(JSON.parse(result.coords.longitude));
  };

  const getUserCart = async () => {
    const results = await Axios.post(`${API_URL}/carts/get/${userGlobal.id}`, {
      userId: userGlobal.id,
    });
    setCartItems(results.data.carts);
  };

  useEffect(() => {
    const getUserAddresses = async () => {
      const results = await Axios.get(
        `${API_URL}/users/getaddresses/${userGlobal.id}`
      );
      setData(results.data);
    };
    getUserAddresses();
  }, [userGlobal]);

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const results = await Axios.get(`${API_URL}/users/provinces`);
        setProvincesData(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProvinces();
  }, []);

  useEffect(() => {
    const getCities = async () => {
      try {
        const results = await Axios.get(
          `${API_URL}/users/cities/${provinceId}`
        );
        provinceId ? setCityData(results.data.cities) : setCityData([]);
      } catch (err) {
        console.log(err);
      }
    };
    getCities();
  }, [provinceId]);

  useEffect(() => {
    const getDistricts = async () => {
      try {
        const results = await Axios.get(`${API_URL}/users/districts/${cityId}`);
        cityId ? setDistrictData(results.data.districts) : setDistrictData([]);
      } catch (err) {
        console.log(err);
      }
    };
    getDistricts();
  }, [cityId]);

  useEffect(() => {
    const getProvince = async () => {
      try {
        const results = await Axios.get(
          `${API_URL}/users/province/${provinceId}`
        );
        setProvince(results.data.name);
      } catch (err) {
        console.log(err);
      }
    };
    getProvince();
  });

  useEffect(() => {
    const getCity = async () => {
      try {
        const results = await Axios.get(`${API_URL}/users/city/${cityId}`);
        setCity(results.data.name);
      } catch (err) {
        console.log(err);
      }
    };
    getCity();
  }, [cityId]);

  useEffect(() => {
    const getDistrict = async () => {
      try {
        const results = await Axios.get(
          `${API_URL}/users/district/${districtId}`
        );
        setDistrict(results.data.name);
      } catch (err) {
        console.log(err);
      }
    };
    getDistrict();
  }, [districtId]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("addressId"));
    setLocStorage(storage);
  }, []);

  useEffect(() => {
    const getAddressCookieId = getAddressCookie()
      ? JSON.parse(getAddressCookie())
      : null;
    setAddressCookies(getAddressCookieId);
  }, []);

  const updateDefaultAddress = async (id) => {
    try {
      const results = await Axios.patch(
        `${API_URL}/users/updatedefaultaddress`,
        {
          id,
          userId: userGlobal.id,
        }
      );
      setData(results.data);
      document.getElementById(`setDefault-${id}`).click();
    } catch (err) {
      console.log(err);
    }
  };

  const removeLocalAddressId = () => {
    localStorage.removeItem("addressId");
    removeAddressCookie("selectedAddress");
    removePaymentCookie("selectedPayment");
    removeShipmentCookie("selectedShipment");
    setLocStorage(0);
    setChange(Math.random() + 3);
    getUserCart();
  };

  const newAddressHandler = async () => {
    try {
      if (!city || !address_line || !province) {
        toast.success("Please complete all necesarry data before proceeding", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        if (!userGlobal.user_addresses.length) {
          const res = await Axios.post(`${API_URL}/users/newaddress`, {
            address_line,
            address_type,
            province,
            city,
            district,
            postal_code,
            phone,
            mobile,
            userId: userGlobal.id,
            isDefault: true,
            latitude,
            longitude,
          });
          setData(res.data.getAddresses);
          window.location.reload();
        } else if (userGlobal.user_addresses.length < 6) {
          const res = await Axios.post(`${API_URL}/users/newaddress`, {
            address_line,
            address_type,
            province,
            city,
            district,
            postal_code,
            phone,
            mobile,
            userId: userGlobal.id,
            isDefault,
            latitude,
            longitude,
          });
          setData(res.data.getAddresses);
        }
        document.getElementById("my-modal-4").click();
        navigate("/cart/billing");
        toast.success("New Address Added!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const results = await Axios.post(`${API_URL}/users/deleteaddress/${id}`, {
        userId: userGlobal.id,
      });
      setData(results.data);
      localStorage.removeItem("addressId");
      removeAddressCookie();
      toast.success("Delete Successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const selectProvince = () => {
    return provinceData?.map((val) => {
      return <option value={val.id}>{val.name}</option>;
    });
  };

  const selectCities = () => {
    return cityData?.map((val) => {
      return <option value={val.id}>{val.name}</option>;
    });
  };

  const selectDistrict = () => {
    return districtData?.map((val) => {
      return <option value={val.id}>{val.name}</option>;
    });
  };

  const tableAddAddress = () => {
    return (
      <>
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <h4 className="text-center font-bold">
              Oops, We can't find any registered Address for{" "}
              {userGlobal.full_name}
            </h4>
            <div className="flex justify-center">
              <label
                htmlFor="my-modal-4"
                className="btn modal-button text-accent hover:bg-white hover:text-accent animate-pulse btn-ghost btn-lg normal-case"
                onClick={getLocation}
              >
                Add Default Address
              </label>

              <input type="checkbox" id="my-modal-4" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box relative">
                  <label
                    htmlFor="my-modal-4"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-lg font-bold text-center mb-2">
                    Please Input Your New Address For
                    <br />
                    {userGlobal.full_name}
                  </h3>
                  <div class="form-control border-transparent hover:border-transparent w-full max-w-xs m-auto">
                    <label class="label">
                      <div className="flex ">
                        <span className="label-text">
                          * Address{" "}
                          <span className="text-gray-400 text-sm">
                            Ex: Jl. Kenangan Blok V2 No.9
                          </span>
                        </span>
                      </div>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setAddress_Line(e.target.value)}
                    />
                    <div>
                      <label className="label">
                        <div className="flex ">
                          <span className="label-text">Building Type</span>
                        </div>
                      </label>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => setAddress_Type(e.target.value)}
                      >
                        <option>Home</option>
                        <option>Apartment</option>
                        <option>Office</option>
                        <option>Boarding House</option>
                        <option>Dormitory</option>
                        <option>School</option>
                        <option>Hospital</option>
                      </select>
                    </div>
                    {/* SELECT PROVINCES */}
                    <div>
                      <label className="label">
                        <div className="flex ">
                          <span className="label-text">* Province</span>
                        </div>
                      </label>
                      <select
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => {
                          if (e.target.value === "reset") {
                            setCityId(null);
                            setCityData([]);
                            setDistrictId(null);
                            setDistrictData([]);
                            setProvinceId(null);
                          } else {
                            setProvinceId(+e.target.value);
                            setDistrictData([]);
                            setCityData([]);
                          }
                        }}
                      >
                        <option value={"reset"}>- Choose One -</option>
                        {selectProvince()}
                      </select>
                    </div>
                    <div>
                      {/* SELECT CITIES */}
                      <div>
                        <label className="label">
                          <div className="flex ">
                            <span className="label-text">* City</span>
                          </div>
                        </label>
                        <select
                          disabled={!cityData.length}
                          className="select select-bordered w-full max-w-xs"
                          onChange={(e) => {
                            if (e.target.value === "reset") {
                              setDistrictId(null);
                              setDistrictData([]);
                              setCityId(null);
                            } else {
                              setCityId(+e.target.value);
                            }
                          }}
                        >
                          {cityData.length ? (
                            <option value={"reset"}>- Choose One -</option>
                          ) : null}
                          {selectCities()}
                        </select>
                      </div>
                      {/* SELECT DISTRICTS */}
                      <div>
                        <label className="label">
                          <div className="flex ">
                            <span className="label-text">District</span>
                          </div>
                        </label>
                        <select
                          disabled={!districtData.length}
                          className="select select-bordered w-full max-w-xs"
                          onChange={(e) => {
                            if (e.target.value === "reset") {
                              setDistrictId(null);
                              setDistrictData([]);
                            } else {
                              setDistrictId(+e.target.value);
                            }
                          }}
                        >
                          {districtData.length ? (
                            <option value="reset">- Choose One -</option>
                          ) : null}
                          {selectDistrict()}
                        </select>
                      </div>
                      {/* ADD POSTAL CODE */}
                      <label class="label">
                        <div className="flex ">
                          <span className="label-text">Postal Code</span>
                        </div>
                      </label>
                      <input
                        onChange={(e) => setPostal_Code(+e.target.value)}
                        type="text"
                        placeholder="ex: 15220"
                        className="input input-bordered w-full max-w-xs"
                      />

                      {/* ADD PHONE OR MOBILE */}
                      <label class="label">
                        <div className="flex">
                          <span className="label-text">Contact</span>
                        </div>
                      </label>
                      <div className="flex flex-row space-x-2">
                        <input
                          onChange={(e) => setMobile(e.target.value)}
                          type="number"
                          placeholder="Mobile"
                          className="input input-bordered w-full max-w-xs"
                        />
                        <input
                          onChange={(e) => setPhone(+e.target.value)}
                          type="text"
                          placeholder="Phone"
                          className="input input-bordered w-full max-w-xs"
                        />
                      </div>
                      <div>
                        <label class="label cursor-pointer">
                          {/* Check if there's any address registered, if not it will set Default to true, begitu.*/}
                          {userGlobal.user_addresses.length ? null : (
                            <span class="label-text text-center mt-2">
                              This will be your Default Address{" "}
                            </span>
                          )}
                          <input checked type="checkbox" class="checkbox" />
                        </label>
                      </div>
                      <button
                        onClick={newAddressHandler}
                        className="w-full btn btn-accent mt-4 text-white"
                      >
                        Submit My New Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              style={{ width: "100%", height: "300px", objectFit: "contain" }}
              src="/images/not-found.png"
              alt="Not-found"
            />
          </div>
        </div>
      </>
    );
  };

  const TableAddress = () => {
    return data?.map((val) => {
      return (
        <>
          {/* TABLE ADDRESS HERE */}
          <div className="w-full items-end">
            <div className=" w-full rounded-xl shadow-sm">
              <div className="p-3 rounded-t-xl">
                <div className="space-y-3">
                  <div className="flex space-x-2 justify-between">
                    <div className="flex space-x-2 ">
                      <h2 className="font-bold">{userGlobal.full_name}</h2>
                      <p className="text-gray-400 text-sm">
                        ({val.address_type})
                      </p>
                      {val.isDefault ? (
                        <p className="text-xs border-1 bg-info text-white border-accent px-1 rounded-sm">
                          Default
                        </p>
                      ) : null}
                      {addressCookies?.id === val.id ? (
                        <span className="text-xl text-green-600">
                          <AiOutlineCheck />
                        </span>
                      ) : null}
                    </div>
                    {val.isDefault ? null : (
                      <div className="dropdown h-1 flex items-center rounded-md justify-end">
                        <label
                          id={`setDefault-${val.id}`}
                          tabindex="0"
                          className="m-1 hover:cursor-pointer tracking-widest"
                        >
                          ...
                        </label>
                        <ul
                          tabindex="0"
                          className="dropdown-content menu shadow bg-base-100 rounded-box w-52 hover:cursor-pointer"
                        >
                          <li>
                            <a
                              onClick={() => updateDefaultAddress(val.id)}
                              className="text-xs text-accent hover:text-accent hover:bg-white"
                            >
                              Set Default
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  <h2 className="">
                    {val.address_line}, <span>{val.province}</span>,{" "}
                    <span>{val.city}</span>
                  </h2>
                  <h2 className="">Postal Code: {val.postal_code}</h2>

                  <div className="flex justify-between items-center">
                    <h2 className="text-gray-400">Contact: {val.mobile}</h2>
                    <div className="flex space-x-2">
                      {/* PICKING ADDRESS  */}
                      {val.isDefault ? null : (
                        <>
                          <td>
                            <div className="text-center">
                              <label
                                className="hover:cursor-pointer fas fa-trash-alt modal-btn"
                                htmlFor={`my-modal-${val.id}`}
                              ></label>

                              <input
                                type="checkbox"
                                id={`my-modal-${val.id}`}
                                className="modal-toggle"
                              />
                              <label
                                htmlFor={`my-modal-${val.id}`}
                                className="modal cursor-pointer"
                              >
                                <label
                                  className="modal-box relative"
                                  htmlFor=""
                                >
                                  <h3 className="text-lg font-bold text-accent">
                                    Deleting Address
                                  </h3>
                                  <h3 className="text-lg font-bold">
                                    Are you sure you want to delete the item?
                                  </h3>
                                  <div className="space-x-2 mt-4">
                                    <button
                                      className="btn btn-accent text-white"
                                      onClick={() => deleteAddress(val.id)}
                                    >
                                      Proceed
                                    </button>
                                    <label
                                      className="btn btn-error text-white"
                                      htmlFor={`my-modal-${val.id}`}
                                    >
                                      Cancel
                                    </label>
                                  </div>
                                </label>
                              </label>
                            </div>
                          </td>
                          {/* Choosing the Selected Address */}
                          <button
                            onClick={() => {
                              removeAddressCookie();
                              removePaymentCookie();
                              removeShipmentCookie();
                              localStorage.setItem(
                                "addressId",
                                JSON.stringify(val.id)
                              );
                              setLocStorage(val.id);
                              getUserCart();
                            }}
                            className={
                              locStorage === val.id
                                ? "flex btn btn-accent text-white btn-sm font-bold normal-case disabled"
                                : "flex btn btn-outline btn-accent btn-sm font-bold normal-case"
                            }
                          >
                            {locStorage === val.id ? (
                              <span className="text-sm flex mx-3">
                                Address Picked{" "}
                                <span className="text-xl">
                                  <AiOutlineCheck />
                                </span>
                              </span>
                            ) : (
                              "Deliver to This Address"
                            )}
                          </button>
                          {locStorage === val.id ? (
                            <button
                              onClick={() => removeLocalAddressId()}
                              className="text-xs btn btn-sm btn-outline btn-error rounded-md"
                            >
                              Cancel
                            </button>
                          ) : null}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  const Footer = () => {
    return (
      <>
        <div className="flex justify-between items-center mb-4">
          <div className="items-start">
            <NavLink to="/cart">
              <div className="text-gray-600 hover:text-gray-500 text-sm space-x-2 my-3 flex group">
                <i className="fas fa-arrow-left transition-all group-hover:mr-1"></i>
                <h2 className="font-bold">Back</h2>
              </div>
            </NavLink>
          </div>
          <div>
            <label
              htmlFor="my-modal-4"
              className="btn modal-button text-accent btn-ghost btn-sm hover:bg-gray-200 normal-case"
              onClick={getLocation}
            >
              + Add New Address
            </label>

            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="my-modal-4"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold text-center mb-2">
                  Please Input Your New Address For
                  <br />
                  {userGlobal.full_name}
                </h3>
                <div class="form-control border-transparent hover:border-transparent w-full max-w-xs m-auto">
                  <label class="label">
                    <div className="flex ">
                      <span className="label-text">
                        Address <span className="text-error">*</span>{" "}
                        <span className="text-gray-400 text-sm">
                          Ex: Jl. Kenangan Blok V2 No.9
                        </span>
                      </span>
                    </div>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAddress_Line(e.target.value)}
                  />
                  <div>
                    <label className="label">
                      <div className="flex ">
                        <span className="label-text">Building Type</span>
                      </div>
                    </label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      onChange={(e) => setAddress_Type(e.target.value)}
                    >
                      <option>Home</option>
                      <option>Apartment</option>
                      <option>Office</option>
                      <option>Boarding House</option>
                      <option>Dormitory</option>
                      <option>School</option>
                      <option>Hospital</option>
                    </select>
                  </div>
                  {/* SELECT PROVINCES */}
                  <div>
                    <label className="label">
                      <div className="flex ">
                        <span className="label-text">
                          Province <span className="text-error">*</span>
                        </span>
                      </div>
                    </label>
                    <select
                      className="select select-bordered w-full max-w-xs"
                      onChange={(e) => {
                        if (e.target.value === "reset") {
                          setCityId(null);
                          setCityData([]);
                          setDistrictId(null);
                          setDistrictData([]);
                          setProvinceId(null);
                        } else {
                          setProvinceId(+e.target.value);
                          setDistrictData([]);
                          setCityData([]);
                        }
                      }}
                    >
                      <option value={"reset"}>- Choose One -</option>
                      {selectProvince()}
                    </select>
                  </div>
                  <div>
                    {/* SELECT CITIES */}
                    <div>
                      <label className="label">
                        <div className="flex ">
                          <span className="label-text">
                            City <span className="text-error">*</span>
                          </span>
                        </div>
                      </label>
                      <select
                        disabled={!cityData.length}
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => {
                          if (e.target.value === "reset") {
                            setDistrictId(null);
                            setDistrictData([]);
                            setCityId(null);
                          } else {
                            setCityId(+e.target.value);
                          }
                        }}
                      >
                        {cityData.length ? (
                          <option value={"reset"}>- Choose One -</option>
                        ) : null}
                        {selectCities()}
                      </select>
                    </div>
                    {/* SELECT DISTRICTS */}
                    <div>
                      <label className="label">
                        <div className="flex ">
                          <span className="label-text">District</span>
                        </div>
                      </label>
                      <select
                        disabled={!districtData.length}
                        className="select select-bordered w-full max-w-xs"
                        onChange={(e) => {
                          if (e.target.value === "reset") {
                            setDistrictId(null);
                            setDistrictData([]);
                          } else {
                            setDistrictId(+e.target.value);
                          }
                        }}
                      >
                        {districtData.length ? (
                          <option value="reset">- Choose One -</option>
                        ) : null}
                        {selectDistrict()}
                      </select>
                    </div>
                    {/* ADD POSTAL CODE */}
                    <label class="label">
                      <div className="flex ">
                        <span className="label-text">Postal Code</span>
                      </div>
                    </label>
                    <input
                      onChange={(e) => setPostal_Code(+e.target.value)}
                      type="text"
                      placeholder="ex: 15220"
                      className="input input-bordered w-full max-w-xs"
                    />

                    {/* ADD PHONE OR MOBILE */}
                    <label class="label">
                      <div className="flex ">
                        <span className="label-text">Contact</span>
                      </div>
                    </label>
                    <div className="flex flex-row space-x-2">
                      <input
                        onChange={(e) => setMobile(+e.target.value)}
                        type="text"
                        placeholder="Mobile"
                        className="input input-bordered w-full max-w-xs"
                      />
                      <input
                        onChange={(e) => setPhone(+e.target.value)}
                        type="text"
                        placeholder="Phone"
                        className="input input-bordered w-full max-w-xs"
                      />
                    </div>
                    <div className="mt-1">
                      <p className="text-xs italic">
                        <span className="text-error">* </span>Must be filled
                      </p>
                    </div>

                    <button
                      onClick={newAddressHandler}
                      className="w-full btn btn-accent mt-4 text-white"
                    >
                      Submit My New Address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* DIV PRODUCT CARD */}
      {userGlobal.user_addresses.length ? (
        <div className="w-1/2 flex flex-col space-y-4">
          {TableAddress()}
          {Footer()}
        </div>
      ) : (
        <div className="w-1/2 flex flex-col space-y-4">{tableAddAddress()}</div>
      )}
    </>
  );
};

export default BillingAddress;
