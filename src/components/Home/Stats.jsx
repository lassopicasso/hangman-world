import React, { useEffect, useState } from "react";

function Stats({ accomplished, attempts, setAttempts, setDisplayLetter, gameFinished, setGameFinished, gameStarted, setGameStarted, setFailedCountry, countryData, score, setScore }) {
  const [chances, setChances] = useState(5);

  useEffect(() => {
    if (accomplished === true && !gameFinished) {
      setScore(score + 1);
      let changeStyleScore = document.querySelector(".stats__score");
      console.log("gooogle");
      changeStyleScore.style.color = "black";
      changeStyleScore.style.backgroundColor = "rgba(255, 255, 255, 0.4)";
      setTimeout(() => {
        changeStyleScore.style.color = "white";
        changeStyleScore.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      }, 1500);

      setChances(chances + 1);
    }
    // eslint-disable-next-line
  }, [accomplished]);

  useEffect(() => {
    if (gameStarted) {
      setScore(0);
      setChances(5);
      setAttempts(0);
    }
    // eslint-disable-next-line
  }, [gameStarted]);

  useEffect(() => {
    if (attempts > chances) {
      setGameStarted(false);
      setGameFinished(true);
      setFailedCountry(countryData);
    }
    // eslint-disable-next-line
  }, [attempts]);

  return (
    <div className="stats game__block">
      <button className="cta cta-letter" onClick={() => setDisplayLetter(true)}>
        Display letter (+1 attempt)
      </button>
      <div className="stats__number">
        <div>
          Attempts: {attempts} / {chances}
        </div>
        <div className="stats__score">Score: {score} </div>
      </div>
    </div>
  );
}

export default Stats;
