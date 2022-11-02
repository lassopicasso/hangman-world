import React, { useState } from "react";
import Header from "../common/Header";
import Alphabet from "./Alphabet";
import Modal from "./Modal";
import Question from "./Question";
import Stats from "./Stats";

function Home() {
  const [letter, setLetter] = useState("");
  const [accomplished, setAccomplished] = useState(false);
  const [correctLetters, setCorrectLetters] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [displayLetter, setDisplayLetter] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  //Change color on body when focus/blur
  const body = document.querySelector("body");
  body.style.backgroundColor = "lightblue";
  window.addEventListener("focus", () => {
    body.style.backgroundColor = "lightblue";
  });
  window.addEventListener("blur", () => {
    body.style.backgroundColor = "#FFCCCB";
  });

  return (
    <main>
      <Header type="first" content="Hangman World" />
      <Modal setGameStarted={setGameStarted} gameStarted={gameStarted} />
      <Alphabet letter={letter.toLowerCase()} accomplished={accomplished} correctLetters={correctLetters} setCorrectLetters={setCorrectLetters} />
      <Stats accomplished={accomplished} attempts={attempts} setDisplayLetter={setDisplayLetter} gameStarted={gameStarted} />
      <Question setLetter={setLetter} setAccomplished={setAccomplished} correctLetters={correctLetters} setCorrectLetters={setCorrectLetters} attempts={attempts} setAttempts={setAttempts} displayLetter={displayLetter} setDisplayLetter={setDisplayLetter} gameStarted={gameStarted} />
    </main>
  );
}

export default Home;
