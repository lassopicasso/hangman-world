import React from "react";
import Header from "../common/Header";
import Capital from "./Capital";

function home() {
  return (
    <main>
      <Header type="first" content="Hangman World" />
      <Capital />
    </main>
  );
}

export default home;
