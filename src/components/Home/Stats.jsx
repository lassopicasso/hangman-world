import React, { useEffect, useState } from "react";

function Stats({ wrongLetters, accomplished, attempts }) {
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
    if (attempts === chances) {
      setFailed(true);
    }
  }, [attempts]);

  console.log(attempts);
  return (
    <div className="stats">
      {failed ? (
        <div className="stats__gameOver">oh no!</div>
      ) : (
        <>
          <button>Display first unknown letter (+1 attempt)</button>
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
