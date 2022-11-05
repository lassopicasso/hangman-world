import React from "react";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation().pathname;

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/" className="nav__logo">
          H-W
        </Link>
        <div className="nav__links">
          <Link to="/" className={`nav__link${location === "/" ? "-active" : ""} `}>
            Home
          </Link>
          <Link to="/top10" className={`nav__link${location === "/top10" ? "-active" : ""} `}>
            Top 10
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
