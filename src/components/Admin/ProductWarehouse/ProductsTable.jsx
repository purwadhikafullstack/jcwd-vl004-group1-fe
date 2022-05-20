import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../constant/api";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const {id}= useParams();
  const [pagination, setPagination] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(5);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getIndex(5);
  }, [products]);

  const getProducts = async () => {
    try {
      const results = await Axios.get(`${API_URL}/warehouses/product/${id}`)
      if(results){
        setProducts(results.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async (id) => {
    try {
      const results = await Axios.delete(`${API_URL}/warehouses/deleteproduct/${id}`)
      if(results){
        toast.success("Product Warehouse Has Been Deleted");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const changestatus = (id,stock_ready) => {
    Axios.patch(`${API_URL}/warehouses/updateproduct/${id}`, {
      stock_ready
    })
    .then((results) => {
      toast.success("Shipping Status Changed!");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const showModal = async (id, total, product, status) => {
    console.log(status)
    if(status==1){
      const { value: total_product } = await Swal.fire({
        title: `Update Product Warehouse`,
        input: 'number',
        showCancelButton: true,
        confirmButtonText: `Send`,
        confirmButtonColor: '#008080',
        inputLabel: `Stock : ${total} pcs`,
        inputPlaceholder: 'Input your total product'
      })

      if (total_product) {
        Swal.fire({
          title: `Are you sure to update ${product}'s stock ${total} to ${total_product} pcs   ?`,
          icon: "question",
          confirmButtonText: `Confirm`,
          confirmButtonColor: '#008080',
          showCancelButton: true,
        }).then((result)=> {
          if(result.isConfirmed){
            changestatus(id,total_product)
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
          <th className="text-center">Product Name</th>
          <th className="text-center">Stock Ready</th>
          <th className="text-center">Stock Reserved</th>
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
          <b>{val.product.name}</b>
          </td>
          <td className="text-center">{val.stock_ready} pcs</td>
          <td className="text-center">{val.stock_reserved} pcs</td>
          <td className="text-end">
            <div className="my-2 space-x-1 d-flex justify-content-center">
              <div
                className="btn btn-sm btn-outline"
                onClick={()=>showModal(val.id,val.stock_ready, val.product.name,1)}
              >
                <i className="fas fa-pen"></i>
              </div>
              <div
                className="btn btn-sm btn-outline btn-error"
                onClick={()=>showModal(val.id,val.stock_ready, val.product.name,0)}
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
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
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

export default ProductsTable;
