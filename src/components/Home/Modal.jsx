import React, { useEffect, useState } from "react";

function Modal({ gameStarted, setGameStarted, username, setUsername, gameFinished, setGameFinished }) {
  const [tooShort, setTooShort] = useState(false);
  const [tooLong, setTooLong] = useState(false);

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("username")));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setGameStarted(false);
  }, [gameFinished]);

  function startGame() {
    if (!username) {
      const userInput = document.querySelector("#username");
      if (userInput.value.length > 2 && userInput.value.length < 16) {
        console.log(gameStarted);
        setGameStarted(true);
        setGameFinished(false);
        setUsername(userInput.value);
        localStorage.setItem("username", JSON.stringify(userInput.value));
      } else if (userInput.value.length < 3) {
        setTooShort(true);
        setTooLong(false);
      } else {
        setTooLong(true);
        setTooShort(false);
      }
    } else {
      setGameStarted(true);
      setGameFinished(false);
    }
  }
  return (
    <div className="welcome" style={{ opacity: gameStarted ? 0 : 1, zIndex: gameStarted ? 0 : 10 }}>
      <div className="welcome__wrapper">
        <div className="welcome__message">
          {username ? (
            <div className="welcome__text">Ready for another game, {username}?</div>
          ) : (
            <>
              <div className="welcome__text">
                How many capitals do you know? <span>1 point for each correct.</span>
              </div>
              <div className="welcome__input">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" />
                {tooShort && <span className="username-error">Min. 3 characters</span>}
                {tooLong && <span className="username-error">Max. 15 characters</span>}
              </div>
            </>
          )}
          <div className="welcome__cta">
            {username && (
              <button
                className="cta"
                onClick={() => {
                  setUsername(false);
                  localStorage.setItem("username", JSON.stringify(false));
                }}
              >
                Change Username
              </button>
            )}
            <button className="cta" onClick={startGame}>
              Start game
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
