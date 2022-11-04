import React, { useEffect, useState } from "react";

function Stats({ accomplished, attempts, setAttempts, setDisplayLetter, gameFinished, setGameFinished, gameStarted, setGameStarted, setFailedCountry, countryData, score, setScore }) {
  const [chances, setChances] = useState(5);

  useEffect(() => {
    if (accomplished === true && !gameFinished) {
      setScore(score + 1);
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
        <div>Score: {score} </div>
      </div>
    </div>
  );
}

export default Stats;
