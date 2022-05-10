import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../../constant/api";
import { toast } from "react-toastify";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      await Axios.get(`${API_URL}/products/categories`).then((results) => {
        setCategories(results.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (id) => {
    try {
      await Axios.delete(`${API_URL}/products/delete/categories/${id}`).then(
        () => {
          toast("A Category Has Been Deleted");
          navigate("/category");
          getCategories();
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const TableHead = () => {
    return (
      <thead>
        <tr>
          <th>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" />
            </div>
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th className="text-end">Action</th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return categories.map((val, id) => {
      return (
        <tr key={val.id}>
          <td>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" />
            </div>
          </td>
          <td>{val.id}</td>
          <td>
            <b>{val.name}</b>
          </td>
          <td>{val.description}</td>
          <td className="text-end">
            <div className="dropdown">
              <Link to="#" data-bs-toggle="dropdown" className="btn btn-light">
                <i className="fas fa-ellipsis-h"></i>
              </Link>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="#">
                  Edit info
                </Link>
                <Link
                  className="dropdown-item text-danger"
                  onClick={() => onDelete(val.id)}
                  to="#"
                >
                  Delete
                </Link>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
        {TableHead()}
        <tbody>{TableBody()}</tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
