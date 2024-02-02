import React from "react";
import "./ExploreRecipes.scss";
import Card from "../Card/Card";
import { Link } from "react-router-dom";

function ExploreRecipes() {
  return (
    <div className="explore-recipes">
      <div className="common-heading">
        <h1 className="text-black font-48">Explore Recipes</h1>
        <span className="text-primary"><Link to="/recipe" className="text-primary links-fix">View more</Link></span>
      </div>
      <Card />
    </div>
  );
}

export default ExploreRecipes;
