import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { currencyFormatter } from '../../../helpers/currencyFormatter';
import { useParams } from "react-router-dom";
import { API_URL } from "../../../constant/api";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'

const ShippingTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(5);

  const {id}= useParams();

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getIndex(5);
  }, [products]);

  const getProducts = async () => {
    try {
      await Axios.get(`${API_URL}/warehouses/shipping/${id}`).then((results) => {
        setProducts(results.data);
        console.log(results.data)
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

  const showModal = async (id, total, product, warehouse, status) => {
    console.log(status)
    if(status==1){
      const { value: total_product } = await Swal.fire({
        title: `Shipping Product to ${warehouse}`,
        input: 'number',
        showCancelButton: true,
        confirmButtonText: `Send`,
        confirmButtonColor: '#008080',
        inputLabel: `Stock : ${total} pcs`,
        inputPlaceholder: 'Input your total product'
      })

      if (total_product) {
        Swal.fire({
          title: `Are you sure to send ${warehouse} ${total_product} pcs ${product}  ?`,
          icon: "question",
          confirmButtonText: `Confirm`,
          confirmButtonColor: '#008080',
          showCancelButton: true,
        }).then((result)=> {
          if(result.isConfirmed){
            changestatus("sent",id,total_product)
          }
        })
      }
    } else {
      Swal.fire({
        title: `Are you sure ${warehouse} already accept ${total} pcs ${product}  ?`,
        icon: "question",
        confirmButtonText: `Confirm`,
        confirmButtonColor: '#008080',
        showCancelButton: true,
      }).then((result)=> {
        if(result.isConfirmed){
          changestatus("arrived",id,total)
        }
      })
    }
  }
  const changestatus = (status,id,total_product) => {
      Axios.patch(`${API_URL}/warehouses/updateshipping/${id}`, {
        status,
        total_product
      })
      .then((results) => {
        toast.success("Shipping Status Changed!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getIndex = (number) => {
    let total = Math.ceil(products.length / number);
    let page = [];
    for (let i = 1; i <= total; i++) {
      page.push(i);
    }
    setPagination(page);
  };

  const selectpage = (id) => {
    let num = id;
    let start = (num - 1) * 5;
    let end = num * 5;
    setPageStart(start);
    setPageEnd(end);
  };

  const TableHead = () => {
    return (
      <thead>
        <tr>
          <th>No. </th>
          <th className="text-center">Request From</th>
          <th className="text-center">Product</th>
          <th className="text-center">Total Product</th>
          <th className="text-center">Action</th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return products.slice(pageStart, pageEnd).map((val,i) => {
      return (
        <tr key={val.id}>
          <td>{i+1}</td>
          <td className="text-center">
            <b>{val.warehouseReq.name}</b>
          </td>
          <td className="text-center">{val.product.name}</td>
          <td className="text-center">{val.total_product} pcs</td>
          <td>
            <div className="my-2 space-x-1 d-flex justify-content-center">
              {val.status==="requested"&& (
                <>
                <div
                className="btn btn-sm btn-outline btn-accent"
                onClick={()=>showModal(val.id,val.total_product, val.product.name, val.warehouseRes.name,1)}
                >
                  <i className="fas fa-share-square"></i>
                </div>
                <div
                  className="btn btn-sm btn-outline"
                >
                  <i class="fa fa-truck"></i>
                </div>
                <div
                  className="btn btn-sm btn-outline"
                >
                  <i class="fa fa-check-square"></i>
                </div>
                </>
              )}
              {val.status==="sent"&&(
                <>
                <div
                className="btn btn-sm btn-outline"
                >
                  <i className="fas fa-share-square"></i>
                </div>
                <div
                  className="btn btn-sm btn-outline btn-warning"
                  onClick={()=>showModal(val.id,val.total_product, val.product.name, val.warehouseRes.name,2)}
                >
                  <i class="fa fa-truck"></i>
                </div>
                <div
                  className="btn btn-sm btn-outline"
                >
                  <i class="fa fa-check-square"></i>
                </div>
              </>
              )}
              {val.status==="arrived"&&(
                <>
                <div
                className="btn btn-sm btn-outline"
                >
                  <i className="fas fa-share-square"></i>
                </div>
                <div
                  className="btn btn-sm btn-outline"
                >
                  <i class="fa fa-truck"></i>
                </div>
                <div
                  className="btn btn-sm btn-outline btn-success"
                >
                  <i class="fa fa-check-square"></i>
                </div>
                </>
              )}
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
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          {/* <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li> */}
          {pagination.map((item) => {
            return (
              <li
                className="page-item"
                key={item}
                onClick={() => selectpage(item)}
              >
                <button className="page-link">{item}</button>
              </li>
            );
          })}
          {/* <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default ShippingTable;
