import React, { useState } from "react";
import Header from "../common/Header";
import Alphabet from "./Alphabet";
import Capital from "./Capital";
import Stats from "./Stats";

function Home() {
  const [letter, setLetter] = useState("");
  const [accomplished, setAccomplished] = useState(false);
  const [correctLetters, setCorrectLetters] = useState("");
  const [wrongLetters, setWrongLetters] = useState([]);
  const [attempts, setAttempts] = useState(0);
  console.log(attempts);
  return (
    <main>
      <Header type="first" content="Hangman World" />
      <div className="container">
        <Alphabet letter={letter.toLowerCase()} accomplished={accomplished} correctLetters={correctLetters} />
        <Stats wrongLetters={wrongLetters} accomplished={accomplished} attempts={attempts} />
        <Capital setLetter={setLetter} setAccomplished={setAccomplished} correctLetters={correctLetters} setCorrectLetters={setCorrectLetters} wrongLetters={wrongLetters} setWrongLetters={setWrongLetters} attempts={attempts} setAttempts={setAttempts} />
      </div>
    </main>
  );
}

export default Home;
