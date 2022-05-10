import React from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { Link } from "react-router-dom";

const MainCategories = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title text-2xl">Manage Categories</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            {CreateCategory()}
            {/* Categories table */}
            {CategoriesTable()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
