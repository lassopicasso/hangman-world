import React, { useState } from "react";
import Header from "../common/Header";
import Alphabet from "./Alphabet";
import Capital from "./Capital";

function Home() {
  const [letter, setLetter] = useState();
  const [accomplished, setAccomplished] = useState(false);

  // onkeydown = (event) => {
  //   console.log(event.key);
  //   setLetter(event.key);
  // };

  return (
    <main>
      <Header type="first" content="Hangman World" />
      <Alphabet letter={letter} accomplished={accomplished} />
      <Capital setLetter={setLetter} setAccomplished={setAccomplished} />
    </main>
  );
}

export default Home;
