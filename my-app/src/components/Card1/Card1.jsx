import React, { useEffect, useState } from "react";
import "./Card1.scss";
import axios from "axios";
import { Link } from "react-router-dom";

function Card1() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:5000/recipe')
        .then((response) => {
          setCardData(response.data);
        })
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="categories-wrapper">
      {cardData.map((item, index) =>
        item.categoryimage !== "" && item.categoryname ? (
          <div key={index} className="category-card">
            <div className="category-card-img">
              <img src={item.categoryimage} alt="img" />
            </div>
            <div className="category-card-text">
              <h3><Link className="links-fix text-black" to={`/recipe/${item._id}`}>{item.categoryname}</Link></h3>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

export default Card1;
