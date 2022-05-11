import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { toast } from "react-toastify";

const Users = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(12);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const results = await Axios.get(`${API_URL}/users`);
      setData(results.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSearch = async () => {
    await Axios.post(`${API_URL}/users/search`, { username: search })
      .then((results) => {
        setData(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changestatus = (status,id) => {
    let bool = false;
    if(status==="activated"){
      bool = true;
    }
    Axios.patch(`${API_URL}/users/update/${id}`, { is_active: bool })
      .then((results) => {
        // setData(results.data);
        getUsers()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const TableHead = () => {
    return (
      <thead>
        <tr className="">
          <th>No. </th>
          <th>Fullname</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Verified</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return data.map((val, i) => {
      return (
        <tr key={i}>
          <td>{i+1}</td>
          <td>{val.full_name}</td>
          <td>{val.username}</td>
          <td>{val.email}</td>
          <td>{val.phone}</td>
          <td>{val.is_verified ? (
            <div><i className="fas fa-check-square"></i></div>
          ):(
            <div className="fa fa-times"></div>
          )}</td>
          <td>{val.is_active ? (
            <button class="btn btn-success btn-sm btn-outline">Active</button>
          ):(
            <button class="btn btn-error btn-sm btn-outline">Inactive</button>
          )}</td>
          <td>
            {val.is_active ? (
              <>
               <label for="my-modal-1" class="btn btn-error btn-sm btn-outline"><i class="fa fa fa-power-off" aria-hidden="true"></i></label>
              </>
            ):(
              <>
              <label for="my-modal-2" class="btn btn-success btn-sm btn-outline"><i class="fa fa fa-check" aria-hidden="true"></i></label>
              
              </>              
            )}
          </td>
          <input type="checkbox" id="my-modal-1" class="modal-toggle"/>
            <div class="modal modal-bottom sm:modal-middle">
              <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                {/* <!-- Modal content --> */}
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div class="flex justify-end p-2">
                        <label for="my-modal-1" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-teal" data-modal-toggle="popup-modal">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </label>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div class="p-6 pt-0 text-center">
                        <svg class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-black-400 text-break">Are you sure you want to deactivate {val.full_name}'s account?</h3>
                        <label for="my-modal-1" data-modal-toggle="popup-modal" onClick={()=>changestatus("deactivated",val.id)} type="button" class="text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Yes, I'm sure
                        </label>
                        <label for="my-modal-1" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-teal dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</label>
                    </div>
                </div>
              </div>
            </div>
            <input type="checkbox" id="my-modal-2" class="modal-toggle"/>
              <div class="modal modal-bottom sm:modal-middle">
                <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                  {/* <!-- Modal content --> */}
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      {/* <!-- Modal header --> */}
                      <div class="flex justify-end p-2">
                          <label for="my-modal-2" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-teal" data-modal-toggle="popup-modal">
                              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                          </label>
                      </div>
                      {/* <!-- Modal body --> */}
                      <div class="p-6 pt-0 text-center">
                          <svg class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-black-400 text-break">Are you sure you want to activate {val.full_name}'s account?</h3>
                          <label for="my-modal-2" data-modal-toggle="popup-modal" onClick={()=>changestatus("activated",val.id)} type="button" class="text-white bg-teal-600 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                              Yes, I'm sure
                          </label>
                          <label for="my-modal-2" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-teal dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</label>
                      </div>
                  </div>
                </div>
              </div>
        </tr>
      );
    });
  };

  useEffect(() => {
    getIndex(12);
  }, [data]);

  const getIndex = (number) => {
    let total = Math.ceil(data.length/number)
    let page = []
    for (let i = 1; i <= total; i++) {
      page.push(i);
    }
    setPagination(page)
  }

  const selectpage = (id) => {
    let num = id
    let start = (num-1)*12
    let end = num*12
    setPageStart(start)
    setPageEnd(end)
  }

  return (
    <section className="content-main-full">
      {/* Search and Filter Section */}
      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-6 col-md-6 me-auto flex flex-row">
              <div className="space-y-2 flex flex-row items-center space-x-3">
                <h2 className="text-2xl">Manage Users</h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 me-auto flex flex-row">
              <div className="input-group justify-content-end">
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search User by username...."
                  className="input input-bordered w-60"
                  style={{backgroundColor:"white",borderColor:"teal"}}
                  value={search}
                />
                <button
                  onClick={onSearch}
                  className="btn btn-square btn-accent"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full text-center">
          {TableHead()}
          <tbody>{TableBody()}</tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            {/* <li class="page-item disabled">
              <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li> */}
            {pagination.map((item)=> {
              return (
                <li className="page-item" key={item} onClick={()=>selectpage(item)}><button className="page-link">{item}</button></li>
              )
            })}
            {/* <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li> */}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Users;
