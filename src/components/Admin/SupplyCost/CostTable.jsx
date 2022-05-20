import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { currencyFormatter } from '../../../helpers/currencyFormatter';
import { useParams } from "react-router-dom";
import { API_URL } from "../../../constant/api";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'

const CostTable = () => {
  const [costData, setCostData] = useState([]);
  const navigate = useNavigate();

  const {id}= useParams();

  useEffect(() => {
    getCostData();
  }, []);

  const getCostData = async () => {
    try {
      const results = await Axios.get(`${API_URL}/warehouses/opcost/${id}`)
      if(results){
        setCostData(results.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changestatus = (id,cost,total_time) => {
    Axios.patch(`${API_URL}/warehouses/updaopcost/${id}`, {
      cost,
      total_time
    })
    .then((results) => {
      toast.success("Operational Cost Changed!");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const onDelete = async (id) => {
    try {
      const results = await Axios.delete(`${API_URL}/warehouses/deleteopcost/${id}`)
      if(results){
        toast("Operational Cost Has Been Deleted");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showModal = async (id, total, product, status) => {
    if(status==1){
      const { value: formValues } = await Swal.fire({
        title: 'Update Operational Cost',
        html:
          '<input id="swal-input1" class="swal2-input" placeholder="Insert new cost">' +
          '<input id="swal-input2" class="swal2-input" placeholder="Insert new total_time">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: `Update`,
        confirmButtonColor: '#008080',
        preConfirm: function() {
          return {
            cost : document.getElementById('swal-input1').value,
            total_time : document.getElementById('swal-input2').value
          }
        }
      })
      
      if (formValues) {
        Swal.fire({
          title: `Are you sure to update ?`,
          icon: "question",
          confirmButtonText: `Confirm`,
          confirmButtonColor: '#008080',
          showCancelButton: true,
        }).then((result)=> {
          if(result.isConfirmed){
            changestatus(id,formValues.cost,formValues.total_time)
          }
        })
      }
    } else {
      Swal.fire({
        title: `Are you sure to delete ${total} pcs ${product}  ?`,
        icon: "question",
        confirmButtonText: `Confirm`,
        confirmButtonColor: '#008080',
        showCancelButton: true,
      }).then((result)=> {
        if(result.isConfirmed){
          onDelete(id)
        }
      })
    }
  }

  const TableHead = () => {
    return (
      <thead>
        <tr>
          <th>No. </th>
          <th className="text-center">Destination</th>
          <th className="text-center">Cost</th>
          <th className="text-center">Total Time</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return costData.map((val,i) => {
      return (
        <tr key={val.id}>
          <td>{i+1}</td>
          <td className="text-center">
            <b>{val.warehouseRes.name}</b>
          </td>
          <td className="text-center">{currencyFormatter(val.cost)}</td>
          <td className="text-center">{val.total_time} minutes</td>
          <td>
            <div className="my-2 space-x-1 d-flex justify-content-center">
              <div
                className="btn btn-sm btn-outline"
                onClick={()=>showModal(val.id,val.total_time, val.cost,1)}
              >
                <i className="fas fa-pen"></i>
              </div>
              <div
                className="btn btn-sm btn-outline btn-error"
                onClick={()=>showModal(val.id,val.total_time, val.cost,0)}
              >
                <i className="fa fa-trash"></i>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="col-md-12 col-lg-7">
      <table className="table">
        {TableHead()}
        <tbody>{TableBody()}</tbody>
      </table>
    </div>
  );
};

export default CostTable;
