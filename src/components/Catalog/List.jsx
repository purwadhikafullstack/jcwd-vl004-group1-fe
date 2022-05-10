import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../../assets/styles/responsive";
import { Link, useLocation } from "react-router-dom";
import { currencyFormatter } from "../../helpers/currencyFormatter";
import { API_URL } from "../../constant/api";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [category, setCategory] = useState("0");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState([]);
  const [pageStart, setPageStart] = useState(0);
  const [pageEnd, setPageEnd] = useState(12);
  const location = useLocation();

  useEffect(() => {
    if (location.state != null) {
      getCategories();
      setCategory(location.state);
      getCategoryById(location.state);
    } else {
      getCategories();
      getProducts();
    }
  }, []);

  useEffect(() => {
    getIndex(12);
  }, [data]);

  useEffect(() => {
    if (category !== "0") {
      getCategoryById(category);
    } else {
      getProducts();
    }
  }, [category]);

  // SORTING PRODUCTS
  useEffect(() => {
    const getBySort = async () => {
      try {
        let results;
        if (sortValue === "az") {
          results = await Axios.get(`${API_URL}/catalog/sort/az`);
        } else if (sortValue === "za") {
          results = await Axios.get(`${API_URL}/catalog/sort/za`);
        } else if (sortValue === "lowprice") {
          results = await Axios.get(`${API_URL}/catalog/sort/lowprice`);
        } else if (sortValue === "highprice") {
          results = await Axios.get(`${API_URL}/catalog/sort/highprice`);
        } else if (sortValue === "sort") {
          results = await Axios.get(`${API_URL}/catalog`);
        }
        results.data.map((item) => {
          let sum = 0;
          item.warehouse_products.forEach((element) => {
            sum += element.stock_ready - element.stock_reserved;
          });
          item["stock"] = sum;
        });
        setData(results.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBySort();
  }, [sortValue]);

  const SelectCategories = () => {
    return categories.map((val) => {
      return <Option value={val.id}>{val.name}</Option>;
    });
  };

  // GET PRODUCTS
  const getProducts = async () => {
    await Axios.get(`${API_URL}/catalog`)
      .then((results) => {
        results.data.map((item) => {
          let sum = 0;
          item.warehouse_products.forEach((element) => {
            sum += element.stock_ready - element.stock_reserved;
          });
          item["stock"] = sum;
        });
        setData(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GET PRODUCTS
  const getProductByName = async () => {
    await Axios.post(`${API_URL}/products/search`, { name: search })
      .then((results) => {
        results.data.map((item) => {
          let sum = 0;
          item.warehouse_products.forEach((element) => {
            sum += element.stock_ready - element.stock_reserved;
          });
          item["stock"] = sum;
        });
        setData(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategories = async () => {
    try {
      await Axios.get(`${API_URL}/products/categories`).then((results) => {
        setCategories(results.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getCategoryById = async (category) => {
    try {
      await Axios.get(`${API_URL}/catalog/category/${category}`).then(
        (results) => {
          results.data.map((item) => {
            let sum = 0;
            item.warehouse_products.forEach((element) => {
              sum += element.stock_ready - element.stock_reserved;
            });
            item["stock"] = sum;
          });
          setData(results.data);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (id) => {
    await Axios.post(`${API_URL}/carts/add`, {
      quantity: 1,
      productId: id,
      userId: 1,
    })
      .then((results) => {
        toast.success("Product has been added to cart !", {
          position: toast.POSITION.TOP_CENTER,
          className: "alert-addtocart",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchItems = (searchValue) => {
    setSearch(searchValue);
  };

  const afterSubmission = (event) => {
    event.preventDefault();
    console.log(search);
    getProductByName();
  };

  const getIndex = (number) => {
    let total = Math.ceil(data.length / number);
    let page = [];
    for (let i = 1; i <= total; i++) {
      page.push(i);
    }
    setPagination(page);
  };

  const selectpage = (id) => {
    let num = id;
    let start = (num - 1) * 12;
    let end = num * 12;
    setPageStart(start);
    setPageEnd(end);
  };

  return (
    <>
      <div className="container">
        <div className="section">
          <FilterContainer>
            <Filter>
              <FilterText>Filter Category:</FilterText>
              <Select
                value={category}
                onChange={(e) => {
                  e.preventDefault();
                  setCategory(e.target.value);
                }}
              >
                <Option value="0">All Category</Option>
                <SelectCategories />
              </Select>
              <FilterText>Sort Products:</FilterText>
              <Select
                onChange={(e) => {
                  e.preventDefault();
                  setSortValue(e.target.value);
                }}
              >
                <Option value="sort" selected>
                  Newest
                </Option>
                <Option name="highprice" value="highprice">
                  Highest Price
                </Option>
                <Option name="lowprice" value="lowprice">
                  Lowest Price
                </Option>
                <Option name="az" value="az">
                  A-Z
                </Option>
                <Option name="za" value="za">
                  Z-A
                </Option>
              </Select>
            </Filter>
            <Filter className="col-md-4 col-4 d-flex align-items-center">
              <form className="input-group" onSubmit={afterSubmission}>
                <Input
                  type="search"
                  className="form-control rounded search"
                  placeholder="Search"
                  onChange={(e) => searchItems(e.target.value)}
                />
                <input className="search-button" type="submit" value="Search" />
              </form>
            </Filter>
          </FilterContainer>
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {data.slice(pageStart, pageEnd).map((product) => (
                  <div
                    className="shop col-lg-2 col-md-6 col-sm-6"
                    key={product.id}
                  >
                    <div className="border-product">
                      <Link to={`/detail/${product.id}`}>
                        <div className="shopBack">
                          <img src={product.product_image} alt={product.name} />
                          <i className="icon fas fa-search box-icon-catalog">
                            <p>See details</p>
                          </i>
                        </div>
                      </Link>

                      <div className="shoptext">
                        <p className="shopname">
                          <Link to={`/detail/${product.id}`}>
                            {product.name}
                          </Link>
                        </p>

                        <h3>{currencyFormatter(product.price)}</h3>
                        {product.stock == 0 ? (
                          <>
                            <p className="shopoutofstock">Out of stock</p>
                            <button className="shopbutton" disabled>
                              Buy now
                            </button>
                          </>
                        ) : (
                          <>
                            <p className="shopoutstock">
                              Available Stock : {product.stock} pcs
                            </p>
                            <button
                              className="shopbutton"
                              onClick={() => addToCart(product.id)}
                            >
                              Buy now
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border-radius: 15px;
  border-width: 1px;
  border-color: black;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

const Input = styled.input`
  border: 1px solid black;
  padding: 10px;
  border-radius: 15px;
  ${mobile({ width: "50px" })}
`;
