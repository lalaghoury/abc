import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./RecipeDetails.scss";
import RecipeRating from "./RecipeRating";
import { Breadcrumb, Button, Card, Flex } from "antd";
import { CalendarOutlined, CommentOutlined, HeartOutlined } from "@ant-design/icons";

function RecipeDetails() {
    const [recipe, setRecipe] = useState(null);
    const [cardData, setCardData] = useState([]);
    const { recipe_id } = useParams();
    useEffect(() => {
        fetchData();
    }, []);
    async function fetchData() {
        try {
            const response = await axios
                .get(`http://localhost:5000/recipe/${recipe_id}`)
                .then((response) => {
                    setRecipe(response.data);
                });
            const allResponse = await axios.get('http://localhost:5000/recipe')
                .then((response) => {
                    setCardData(response.data);
                    console.log(response.data);
                })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="recipe-details">
            <Breadcrumb
                separator=">"
                items={[
                    {
                        title: "Home",
                        href: "/",
                        className: "bold",
                    },
                    {
                        title: "Recipes",
                        href: "/recipe",
                        className: "bold ",
                    },
                    {
                        title: recipe && recipe.name,
                        href: `/recipe/${recipe_id}`,
                        className: "bold text-primary",
                    },
                ]}
            />
            {recipe && recipe.show_on_recipe_page ? (
                <div className="recipe-details-container">
                    <div className="recipe-details-head">
                        <div className="recipe-details-heading">
                            <h1>{recipe.name}</h1>
                        </div>
                        <div className="recipe-details-user">
                            <span className="recipe-details-user-card">
                                <img src={recipe.userimage} alt="userimage" style={{ marginRight: 5 }} />
                                <h4>{recipe.username}</h4>
                            </span>
                            <span className="recipe-details-user-card"> <CalendarOutlined style={{ fontSize: 22, color: "#B55D51", marginRight: 5 }} /> {recipe.dateField}</span>
                            <span className="recipe-details-user-card"> <CommentOutlined style={{ fontSize: 22, color: "#B55D51", marginRight: 5 }} />
                                {recipe.comments} Comments
                            </span>
                            <span className="recipe-details-user-card"> <HeartOutlined style={{ fontSize: 22, color: "#B55D51", marginRight: 5 }} />
                                {recipe.saves} Saves
                            </span>
                            <span className="recipe-details-user-card">
                                <Flex gap="middle" vertical>
                                    <RecipeRating rating={recipe.recipe_ratings} />
                                </Flex>
                                <h5> &nbsp; {recipe.recipe_ratings} / 5 Reviews</h5>
                            </span>
                        </div>
                        <hr />
                    </div>
                    <div className="recipe-details-body">
                        <div className="body-left">
                            {/* body left image div */}
                            <div className="body-left-image">
                                <img src={recipe.image} alt={recipe.name} />
                                <p>{recipe.blogslogan}</p>
                            </div>

                            {/* body left text divs */}
                            <div className="body-left-text">
                                <div className="body-left-text-first">
                                    <span>
                                        <span>Prep Time</span>
                                        <h4>{recipe.recipe_preptime} min(s)</h4>
                                    </span><span>
                                        <span>Serving</span>
                                        <h4>{recipe.recipe_cooking_time} min(s)</h4>
                                    </span>
                                    <span>
                                        <span>Serving</span>
                                        <h4>{recipe.recipe_servings} Serving(s)</h4>
                                    </span>
                                    <span><Button className="disable-hover" type="primary">Print Recipe</Button></span>
                                </div>
                                <div className="body-left-text-second">
                                    <p>{recipe.recipe_description}</p>
                                </div>
                                <div className="body-left-text-third">
                                    <h3>Ingredients</h3>
                                    <ul>
                                        {recipe.recipe_ingredients.map((ingredient, index) => (
                                            <li key={index}>{ingredient.ingredient}</li>
                                        ))}
                                    </ul>

                                </div>
                                <div className="body-left-text-fourth">
                                    <h3>Instructions</h3>
                                    <ol>
                                        {recipe.recipe_instructions.map((instruction, index) => (
                                            <li key={index}>{instruction.instruction}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="body-right">
                            <div className="body-right-facts">
                                <h1>Nutrition Facts</h1>
                                <span><span>Calories</span> {recipe.recipe_calories} mg</span> <hr />
                                <span><span>Carbs</span> {recipe.recipe_carbohydrates} mg</span> <hr />
                                <span><span>Fats </span>{recipe.recipe_fats} mg</span> <hr />
                                <span><span>Protien </span>{recipe.recipe_proteins} mg</span> <hr />
                                <span><span>Fiber</span> {recipe.recipe_fiber} mg</span> <hr />
                                <span><span>Net Carb </span>{recipe.recipe_net_carbons} mg</span> <hr />
                                <span><span>Sodium </span>{recipe.recipe_sodium} mg</span> <hr />
                                <span><span>Cholestrol </span>{recipe.recipe_cholesterol} mg</span> <hr />
                            </div>

                            <div className="body-right-recent-recipes">
                                <h2>Recent Recipes</h2>
                                <div>
                                    {cardData && cardData.slice(0, 3).map((item, _) => (

                                        item.show_on_recipe_page ? (
                                            <Card
                                                hoverable
                                                style={{ width: 200, marginBottom: 10 }}
                                                cover={<img alt={item.name} src={item.image} />}
                                                key={item._id}
                                            >
                                                <center><strong style={{ marginBottom: 5 }}>{item.name}</strong></center>
                                                <a href={`/recipe/${item._id}`} className="links-fix text-black"    > <Button className="disable-hover" type="primary" block >
                                                    View Recipe
                                                </Button></a>

                                            </Card>
                                        ) : null

                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>) : (
                <h1 style={{ fontFamily: 'cursive' }}>This Recipe Is Not Listed Yet!</h1>
            )}
        </div>
    );
}

export default RecipeDetails;
