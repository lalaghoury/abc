import React from "react";
import "./Categories.scss";
import Card1 from "../Card1/Card1";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className="categories-container">
      <div className="common-heading">
        <h1 className="text-black font-48">Categories</h1>
        <span className="text-primary"><Link to="/category" className="text-primary links-fix">View more</Link></span>
      </div>
      <Card1 />
    </div>
  );
}

export default Categories;
