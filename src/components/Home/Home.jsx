import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Alphabet from "./Alphabet";
import Modal from "./Modal";
import Question from "./Question";
import Stats from "./Stats";
import { apiScores } from "../../constants/api";
import { usePrompt } from "../../hooks/usePrompt";

function Home() {
  const [letter, setLetter] = useState("");
  const [accomplished, setAccomplished] = useState(false);
  const [correctLetters, setCorrectLetters] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [displayLetter, setDisplayLetter] = useState(false);
  const [username, setUsername] = useState("");
  const [top10, setTop10] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [countryData, setCountryData] = useState();
  const [failedCountry, setFailedCountry] = useState();
  const [score, setScore] = useState(0);
  usePrompt("Are you sure you want to leave before your finish the game? Progress will be lost.", gameStarted);
  console.log(gameFinished);
  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(apiScores);
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          let sortedScores = data.data.sort((a, b) => b.attributes.score - a.attributes.score);
          setTop10(sortedScores);
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, []);

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
    <>
      <Modal setGameStarted={setGameStarted} gameStarted={gameStarted} username={username} setUsername={setUsername} gameFinished={gameFinished} setGameFinished={setGameFinished} failedCountry={failedCountry} score={score} />
      <main>
        <Header type="first" content="Hangman World" />
        <Alphabet letter={letter.toLowerCase()} accomplished={accomplished} correctLetters={correctLetters} setCorrectLetters={setCorrectLetters} gameStarted={gameStarted} />
        <Stats
          accomplished={accomplished}
          attempts={attempts}
          setAttempts={setAttempts}
          setDisplayLetter={setDisplayLetter}
          gameFinished={gameFinished}
          setGameFinished={setGameFinished}
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
          countryData={countryData}
          setFailedCountry={setFailedCountry}
          score={score}
          setScore={setScore}
        />
        <Question
          setLetter={setLetter}
          setAccomplished={setAccomplished}
          correctLetters={correctLetters}
          setCorrectLetters={setCorrectLetters}
          attempts={attempts}
          setAttempts={setAttempts}
          displayLetter={displayLetter}
          setDisplayLetter={setDisplayLetter}
          gameStarted={gameStarted}
          countryData={countryData}
          setCountryData={setCountryData}
        />
      </main>
    </>
  );
}

export default Home;
