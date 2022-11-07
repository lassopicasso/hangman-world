import React, { useEffect, useState } from "react";
import Header from "../common/Header";
import Alphabet from "./Alphabet";
import Modal from "./Modal";
import Question from "./Question";
import Stats from "./Stats";
import { apiScores, apiScoresAfrica, apiScoresAmerica, apiScoresAsia, apiScoresEurope, apiScoresOceanias } from "../../constants/api";
import { usePrompt } from "../../hooks/usePrompt";
import { confetti } from "../../js/confetti";

function Home({ continent, setContinent }) {
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
  const [replacePosition, setReplacePosition] = useState(false);
  const [worldData, setWorldData] = useState();

  usePrompt("Are you sure you want to leave before your finish the game? Progress will be lost.", gameStarted);
  useEffect(() => {
    (async function fetchData() {
      let currentAPI = continent === "world" ? apiScores : continent === "europe" ? apiScoresEurope : continent === "africa" ? apiScoresAfrica : continent === "america" ? apiScoresAmerica : continent === "asia" ? apiScoresAsia : apiScoresOceanias;
      try {
        const response = await fetch(currentAPI);
        if (response.ok) {
          const data = await response.json();
          let sortedScores = data.data.sort((a, b) => b.attributes.score - a.attributes.score);
          setTop10(sortedScores.slice(0, 10));
        }
      } catch (error) {
        console.log(error);
      }
    })();
    // eslint-disable-next-line
  }, [continent]);

  //When game is over, check if player made it to top 10
  useEffect(() => {
    if (gameFinished) {
      for (let i = 0; i < top10.length; i++) {
        if (top10[i].attributes.score < score) {
          setReplacePosition({ id: top10[i].id, position: i + 1, name: username });
          break;
        }
      }
    }
    // eslint-disable-next-line
  }, [gameFinished]);

  useEffect(() => {
    confetti(replacePosition);
    if (replacePosition) {
      const data = JSON.stringify({
        data: { name: username, score: score },
      });
      const options = {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      };
      let currentAPI = continent === "world" ? apiScores : continent === "europe" ? apiScoresEurope : continent === "africa" ? apiScoresAfrica : continent === "america" ? apiScoresAmerica : continent === "asia" ? apiScoresAsia : apiScoresOceanias;

      (async function addToTop10() {
        try {
          const response = await fetch(currentAPI, options);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      })();
    }
    // eslint-disable-next-line
  }, [replacePosition]);

  // //Change color on body when focus/blur (gives player a notice if keyboard is active or not, when a key is pressed)
  // const body = document.querySelector("body");
  // window.addEventListener("blur", () => {
  //   body.style.backgroundColor = "rgba(0,0,0, 0.2)";
  // });
  // window.addEventListener("focus", () => {
  //   body.style.backgroundColor = "lightblue";
  // });

  return (
    <>
      <Modal
        setGameStarted={setGameStarted}
        gameStarted={gameStarted}
        username={username}
        setUsername={setUsername}
        gameFinished={gameFinished}
        setGameFinished={setGameFinished}
        failedCountry={failedCountry}
        score={score}
        replacePosition={replacePosition}
        setReplacePosition={setReplacePosition}
        top10={top10}
        setContinent={setContinent}
        continent={continent}
        worldData={worldData}
        setWorldData={setWorldData}
      />
      <div className="backgroundImg backgroundImg-home"></div>
      <main>
        <Header type="first" content={`Hangman ${continent.charAt(0).toUpperCase() + continent.slice(1)}`} />
        <div className="game">
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
            accomplished={accomplished}
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
            continent={continent}
            worldData={worldData}
            setWorldData={setWorldData}
          />
          <Alphabet letter={letter.toLowerCase()} accomplished={accomplished} correctLetters={correctLetters} setCorrectLetters={setCorrectLetters} gameStarted={gameStarted} />
        </div>
      </main>
      <div id="confetti-wrapper"></div>
    </>
  );
}

export default Home;
