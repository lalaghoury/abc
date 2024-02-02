import React, { useState } from "react";
import "./Recipes.scss";
import Card from "../Card/Card";
import { Breadcrumb } from "antd";


function Recipes() {
  const [next, setNext] = useState(false);
  return (
    <div className="recipes">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: 'Home',
            href: '/',
            className: 'bold',
          },
          {
            title: 'Recipes',
            href: '/recipe',
            className: 'bold',
          },
        ]}
      />
      <div className="recipes-heading">
        <h1 className="text-black font-48">Recipes</h1>
        <span className="text-black">
          Sort by:
          <select className="dropdown">
            <option value="A-to-Z">A to Z</option>
            <option selected value="Relevance">
              Relevance
            </option>
            <option value="Newest">Newest</option>
            <option value="Top-Rated">Top Rated</option>
          </select>
        </span>
      </div>
      <hr />
      <Card />
      <Card />
    </div>
  );
}

export default Recipes;
