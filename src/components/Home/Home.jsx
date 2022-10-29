import React, { useState } from "react";
import Header from "../common/Header";
import Alphabet from "./Alphabet";
import Capital from "./Capital";

function Home() {
  const [letter, setLetter] = useState("");
  const [accomplished, setAccomplished] = useState(false);
  const [capitalName, setCapitalName] = useState("");
  const [correctLetters, setCorrectLetters] = useState("");

  return (
    <main>
      <Header type="first" content="Hangman World" />
      <Alphabet letter={letter.toLowerCase()} accomplished={accomplished} correctLetters={correctLetters} />
      <Capital setLetter={setLetter} setAccomplished={setAccomplished} correctLetters={correctLetters} setCorrectLetters={setCorrectLetters} />
    </main>
  );
}

export default Home;
