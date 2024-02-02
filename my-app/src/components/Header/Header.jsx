import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import Logo from "../Logo/Logo";

function Header() {
  return (
    <div className="header-container">
      <nav className="navbar">
        <Logo />
        <div className="nav-links">
          <Link className="text-black links-fix" to="/">
            Home
          </Link>
          <Link className="text-black links-fix" to="/recipe">
            Recipe
          </Link>
          <Link className="text-black links-fix" to="/add-recipe">
            Add Recipe
          </Link>
          <Link className="text-black links-fix" to="/blog">
            Blog
          </Link>
          <Link className="text-black links-fix" to="/about">
            About us
          </Link>
        </div>
        <div className="nav-buttons">
          <button className="btn-sec-small cursor"><Link className="text-black links-fix" to="/login">Log in</Link></button>
          <button className="btn-primary-small cursor"><Link className="text-white links-fix" to="/signup">Sign up</Link></button>
        </div>
        <div className="nav-hamburger">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="24"
            viewBox="0 0 32 24"
            fill="none"
          >
            <rect width="32" height="3" rx="1.5" fill="black" />
            <rect y="8.23535" width="32" height="3" rx="1.5" fill="black" />
            <rect y="16.4707" width="32" height="3" rx="1.5" fill="black" />
          </svg>
        </div>
      </nav>
    </div>
  );
}

export default Header;
