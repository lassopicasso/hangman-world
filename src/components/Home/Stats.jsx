import React, { useEffect, useState } from "react";

function Stats({ accomplished, attempts, setDisplayLetter, gameStarted }) {
  const [score, setScore] = useState(0);
  const [chances, setChances] = useState(5);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (accomplished === true) {
      setScore(score + 1);
      setChances(chances + 1);
    }
  }, [accomplished]);

  useEffect(() => {
    if (attempts > chances) {
      setFailed(true);
    }
  }, [attempts]);

  function handleClick() {
    if (gameStarted) {
      setDisplayLetter(true);
    }
  }
  return (
    <div className="stats">
      {failed ? (
        <div className="stats__gameOver">oh no!</div>
      ) : (
        <>
          <button onClick={handleClick}>Display first unknown letter (+1 attempt)</button>
          <div>
            <div>
              Attempts {attempts} / {chances}
            </div>
            <div>Score: {score} </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Stats;
