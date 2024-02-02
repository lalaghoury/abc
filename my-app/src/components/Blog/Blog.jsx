import React, { useEffect, useState } from "react";
import "./Blog.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { Breadcrumb } from "antd";

const NavBlog = () => {
  return (
    <div className="breadcrumb">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "Home",
            href: "/",
            className: "bold",
          },
          {
            title: "Blog",
            href: "/blog",
            className: "bold text-primary",
          },
        ]}
      />
    </div>
  );
}

function Blog() {
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
    <div className="blog-container">
      <div className="common-heading">
        <h1 className="text-black font-48">Blog</h1>
        <span className="text-primary"><Link to="/blog" className="text-primary links-fix">View more</Link></span>
      </div>
      <div className="blog-posts">
        {recipes.map((item) =>
          item.blogimage ? (
            <div key={item._id} className="blog-card">
              <div className="blog-card-img">
                <img src={item.blogimage} alt="img" />
              </div>
              <div className="blog-card-text">
                <h1 className="font-24 text-black">
                  <Link className="links-fix text-black" to={`/recipe/${item._id}`}>{item.blogheading}</Link></h1>
                <p>{item.blogslogan}</p>
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export  { Blog, NavBlog };
