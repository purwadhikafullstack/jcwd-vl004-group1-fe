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
  const [data, setData] = useState({});
  const [provinceData, setProvincesData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [address_line, setAddress_Line] = useState("");
  const [address_type, setAddress_Type] = useState("");
  const [cityId, setCityId] = useState(0);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [provinceId, setProvinceId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [postal_code, setPostal_Code] = useState(0);
  const [phone, setPhone] = useState(0);
  const [mobile, setMobile] = useState(0);
  const [isDefault, setIsDefault] = useState(false);
  const [locStorage, setLocStorage] = useState(0);
  const [addressCookies, setAddressCookies] = useState({});

  const location = useGeoLocation();
  const userGlobal = useSelector((state) => state.user);
  const navigate = useNavigate();

  const getUserCart = async () => {
    const results = await Axios.get(`${API_URL}/carts/get/${userGlobal.id}`);
    setCartItems(results.data.carts);
  };

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

  const updateDefaultAddress = async () => {
    try {
      await Axios.patch(`${API_URL}/users/updatedefaultaddress`, {
        isDefault: false,
      });
      setIsDefault(true);
    } catch (err) {
      console.log(err);
    }
  };

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

  const removeLocalAddressId = () => {
    localStorage.removeItem("addressId");
    removeAddressCookie("selectedAddress");
    removePaymentCookie("selectedPayment");
    removeShipmentCookie("selectedShipment");
    setLocStorage(0);
    toast.success("Automatically Set to Default Address", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setChange(Math.random() + 3);
    getUserCart();
  };

  const newAddressHandler = async () => {
    try {
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
      });
      document.getElementById("my-modal-4").click();
      navigate("/cart/billing");
      toast.success("New Address Added!", {
        position: "top-center",
        autoClose: 1500,
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

  const deleteAddress = async (id) => {
    try {
      await Axios.delete(`${API_URL}/users/deleteaddress/${id}`);
      localStorage.removeItem("addressId");
      removeAddressCookie();
      toast.success("Delete Successful!", {
        position: "top-center",
        autoClose: 1500,
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

  const TableAdress = () => {
    return userGlobal.user_addresses?.map((val) => {
      return (
        <>
          {/* TABLE ADDRESS HERE */}
          <div className="w-full items-end">
            <div className=" w-full rounded-xl shadow-sm">
              <div className="p-3 rounded-t-xl">
                <div className="space-y-3">
                  <div className="flex space-x-2">
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
                  <h2 className="">
                    {val.address_line}, <span>{val.province}</span>,{" "}
                    <span>{val.city}</span>
                  </h2>
                  <h2 className="">Postal Code: {val.postal_code}</h2>
                  {/* {location.loaded
                    ? JSON.stringify(location)
                    : "Location data not available"} */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-gray-400">Phone: {val.phone}</h2>
                    <div className="flex space-x-2">
                      {/* PICKING ADDRESS  */}
                      {val.isDefault ? null : (
                        <>
                          <td>
                            <i
                              onClick={() => deleteAddress(val.id)}
                              className="hover:cursor-pointer fas fa-trash-alt align-middle mr-2"
                            ></i>
                          </td>
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
                        Address{" "}
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
                        <span className="label-text">Province</span>
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
                          <span className="label-text">City</span>
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
                    <div class="">
                      <label class="label cursor-pointer">
                        <span class="label-text">
                          Choose as Default Address
                        </span>
                        <input
                          type="checkbox"
                          class="checkbox"
                          onChange={updateDefaultAddress}
                        />
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
        </div>
      </>
    );
  };

  return (
    <>
      {/* DIV PRODUCT CARD */}
      <div className="w-1/2 flex flex-col space-y-4">
        {TableAdress()}
        {Footer()}
      </div>
    </>
  );
};

export default BillingAddress;
