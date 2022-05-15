import React, { useEffect, useState } from "react";
import { API_URL } from "../../../constant/api";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const [total_time, setTotalTime] = useState(0);
  const [cost, setCost] = useState(0);
  const [warehouseReqId, setWarehouseReqId] = useState(0);
  const [warehouseResId, setwarehouseResId] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const {id, name}= useParams();

  useEffect(() => {
    getWarehouse();
    setWarehouseReqId(parseInt(id))
  }, []);

  const getWarehouse = async () => {
    try {
      const results = await Axios.get(`${API_URL}/warehouses`);
      setData(results.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const results = await Axios.post(`${API_URL}/warehouses/addopcost`, {
        cost,
        total_time,
        warehouseReqId,
        warehouseResId
      })
      if(results){
        toast.success("Operational Cost Added!");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const SelectWarehouse = () => {
    return data.map((val, idx) => {
      return <option key={val.id} value={val.id}>{val.name}</option>;
    });
  };

  return (
    <div className="col-md-12 col-lg-5">
      <form>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            Destination
          </label>
          <select
            onChange={(e) => {
              setwarehouseResId(+e.target.value);
              e.preventDefault();
            }}
            className="form-select"
            name="productCategoryId"
          >
            <option>Choose Warehouse</option>
            {SelectWarehouse()}
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Cost</label>
          <input
            type="number"
            placeholder="Type here"
            className="form-control"
            required
            onChange={(e) => setCost(+e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Total Time</label>
          <input
            type="number"
            placeholder="Type here"
            className="form-control"
            required
            onChange={(e) => setTotalTime(+e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button className="btn btn-accent py-3" onClick={(e)=>onSubmit(e)}>
            Add Cost
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
