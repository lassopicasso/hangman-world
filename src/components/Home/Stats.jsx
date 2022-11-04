import React, { useEffect, useState } from "react";

function Stats({ accomplished, attempts, setAttempts, setDisplayLetter, gameFinished, setGameFinished, gameStarted, setGameStarted, setFailedCountry, countryData, score, setScore }) {
  const [chances, setChances] = useState(5);

  useEffect(() => {
    if (accomplished === true && !gameFinished) {
      setScore(score + 1);
      setChances(chances + 1);
    }
  }, [accomplished]);

  useEffect(() => {
    if (gameStarted) {
      setScore(0);
      setChances(5);
      setAttempts(0);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (attempts > chances) {
      setGameStarted(false);
      setGameFinished(true);
      setFailedCountry(countryData);
    }
  }, [attempts]);

  return (
    <div className="stats">
      <button className="cta" onClick={() => setDisplayLetter(true)}>
        Display first unknown letter (+1 attempt)
      </button>
      <div>
        <div>
          Attempts {attempts} / {chances}
        </div>
        <div>Score: {score} </div>
      </div>
    </div>
  );
}

export default Stats;
