import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Card.scss";
import { FireOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Flex, Rate } from "antd";
import WishlistButton from "./WishlistButton";

function Card() {
  const [cardData, setCardData] = useState([]);
  const [cardRatings, setCardRatings] = useState({});
  const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
  const generateRandomRating = () => Math.floor(Math.random() * 5) + 1;

  const handleRatingChange = (value, cardId) => {
    setCardRatings((prevRatings) => ({ ...prevRatings, [cardId]: value }));
  };

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

  useEffect(() => {
    const initialRatings = {};
    cardData.forEach((card) => {
      initialRatings[card._id] = generateRandomRating();
    });
    setCardRatings(initialRatings);
  }, [cardData]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card-wrapper">
      {cardData.map((item, _) =>
        item.show_on_recipe_page ? (
          <div key={item._id} className="card">
            <div className="card-parent">
              <div className="card-parent-img">
                <img src={item.image ? item.image : item.recipe_imageurl} alt={item.name? item.name : item.recipe_title} className="card-image" />
              </div>
              <WishlistButton />
              <div className="card-rating">
                <Flex gap="middle" vertical >
                  <Rate
                    style={{ fontSize: 22, color: "#B55D51" }}
                    tooltips={desc}
                    onChange={(value) => handleRatingChange(value, item._id)}
                    value={cardRatings[item._id]}
                  />
                </Flex>
              </div>
            </div>
            <h3 className="font-16"><Link className="links-fix text-black" to={`/recipe/${item._id}`}>{item.name? item.name : item.recipe_title}</Link></h3>
            <div className="card-user" key={item._id}>
              <span className="card-left">
                <img src={item.userimage} alt="" />
                <h4>{item.username? item.username : "Anonymous"}</h4>
              </span>
              <span className="card-right">
                <FireOutlined style={{ color: "red" }} />
                <h4>{item.firecount}</h4>
              </span>
            </div>
          </div>
        ) : null
      )
      }
    </div >
  );
}

export default Card;
