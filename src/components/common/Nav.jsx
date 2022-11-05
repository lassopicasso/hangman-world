import React from "react";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation().pathname;

  return (
    <nav className="nav">
      <div className="nav__container">
        <Link to="/" className="nav__logo">
          HW
        </Link>
        <div className="nav__links">
          <Link to="/" className={`nav__link${location === "/" ? "-active" : ""} `}>
            Game
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
