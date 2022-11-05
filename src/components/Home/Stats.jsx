import React, { useEffect, useState } from "react";
import { statsReaction } from "../../js/common";

function Stats({ accomplished, attempts, setAttempts, setDisplayLetter, gameFinished, setGameFinished, gameStarted, setGameStarted, setFailedCountry, countryData, score, setScore }) {
  const [chances, setChances] = useState(8);

  useEffect(() => {
    if (accomplished === true && !gameFinished) {
      setScore(score + 1);
      statsReaction(".stats__score");
      setChances(chances + 1);
    }
    // eslint-disable-next-line
  }, [accomplished]);

  useEffect(() => {
    if (gameStarted) {
      setScore(0);
      setChances(8);
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
        <div className="stats__attempt">
          Attempts: {attempts} / {chances}
        </div>
        <div className="stats__score">Score: {score} </div>
      </div>
    </div>
  );
}

export default Stats;
