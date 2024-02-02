import React, { useEffect, useState } from "react";
import "./RecipeListing.scss";
import axios from "axios";
import Card from "../Card/Card";


function RecipeListing() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:5000/recipe')
        .then((response) => {
          setRecipes(response.data);
        })
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="recipe-listing-wrapper">
      <Card />
    </div>
  );
}

export default RecipeListing;
