import React from "react";
import "./TrendingRecipe.scss";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

function TrendingRecipe() {
  return (
    <div>
      <div className="trending-recipe-container">
        <div className="common-heading">
          <h1 className="text-black font-48">Trending Recipes</h1>
          <span className="text-primary"><Link to="/recipe" className="text-primary links-fix">View more</Link></span>
        </div>

        <Card />
      </div>
    </div>
  );
}

export default TrendingRecipe;
