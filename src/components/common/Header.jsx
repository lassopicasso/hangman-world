import React from "react";

function Header({ type, content }) {
  if (type === "first") {
    return <h1>{content}</h1>;
  }
  if (type === "second") {
    return <h2>{content}</h2>;
  }
  if (type === "third") {
    return <h3>{content}</h3>;
  }
}

export default Header;
