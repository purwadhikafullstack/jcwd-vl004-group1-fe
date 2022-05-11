import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { currencyFormatter } from '../../../helpers/currencyFormatter';
import { useParams } from "react-router-dom";
import { API_URL } from "../../../constant/api";
import { toast } from "react-toastify";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const {id}= useParams();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      await Axios.get(`${API_URL}/warehouses/product/${id}`).then((results) => {
        setProducts(results.data);
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
          getProducts();
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
    return products.map((val,i) => {
      return (
        <tr key={val.id}>
          <td>{i+1}</td>
          <td className="text-center">
            <b>{val.product.name}</b>
          </td>
          <td className="text-center">{currencyFormatter(25000)}</td>
          <td className="text-center">54 minutes</td>
          <td>
            <div className="my-2 space-x-1 d-flex justify-content-center">
              <Link
                to={`/addWarehouse`} state={val}
                className="btn btn-sm btn-outline"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to={`/warehouse/${val.id}`}
                className="btn btn-sm btn-outline btn-error"
              >
                <i class="fa fa-trash"></i>
              </Link>
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

export default ProductsTable;
