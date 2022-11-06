import React, { useEffect, useState } from "react";

function Modal({ gameStarted, setGameStarted, username, setUsername, gameFinished, setGameFinished, failedCountry, score, replacePosition, setReplacePosition, top10 }) {
  const [tooShort, setTooShort] = useState(false);
  const [tooLong, setTooLong] = useState(false);

  useEffect(() => {
    setUsername(JSON.parse(localStorage.getItem("username")));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (gameFinished) {
      setGameStarted(false);
    }
    // eslint-disable-next-line
  }, [gameFinished]);

  function startGame() {
    setReplacePosition(false);
    if (!username) {
      const userInput = document.querySelector("#username");
      if (userInput.value.length > 2 && userInput.value.length < 16) {
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
    }
    setGameFinished(false);
  }

  return (
    <div className="welcome" style={{ opacity: gameStarted ? 0 : 1, zIndex: gameStarted ? 0 : 10 }}>
      <div className="welcome__wrapper">
        <div className="welcome__message">
          {gameFinished && username ? (
            <div className="welcome__text">
              <p>
                <span className="welcome__block">
                  {replacePosition ? "Well done!" : "Ups!"} You ran out of attempts{replacePosition ? ", but did good!" : "."}
                </span>
                <span className="welcome__block">
                  The capital of <span className="welcome__bold">{failedCountry.name}</span> is <span className="welcome__bold">{failedCountry.capital}</span>
                </span>
                <span className="welcome__bold">
                  <span className="welcome__green welcome__block" style={{ color: score === 0 ? "red" : "green" }}>
                    {" "}
                    You got {score} correct!{" "}
                  </span>{" "}
                  {replacePosition ? `And you made it into top 10 at ${replacePosition.position}th place! Well done!` : `${Math.min(...top10.map((item) => item.attributes.score)) - score + 1} points more to 10th place.`}
                </span>
                <span className="welcome__block welcome__question"> Want to try again, {username}?</span>
              </p>
            </div>
          ) : username ? (
            <div className="welcome__text">
              <p>Ready for another try, {username}?</p>
            </div>
          ) : (
            <>
              <div className="welcome__text">
                <p>
                  How many capitals do you know? <span className="welcome__block">1 point for each correct.</span>
                </p>
              </div>
              <div className="welcome__input">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" />
                {tooShort && <span className="username-error">Min. 3 characters</span>}
                {tooLong && <span className="username-error">Max. 15 characters</span>}
              </div>
            </>
          )}
          <button className="cta" onClick={startGame}>
            {gameFinished ? "Try again!" : "Start game"}
          </button>
          <span className="welcome__info">Game tip: press a key when on desktop, else click on letters</span>
          {username && (
            <div>
              <button
                className="cta--small"
                onClick={() => {
                  setUsername(false);
                  localStorage.setItem("username", JSON.stringify(false));
                }}
              >
                Change Username
              </button>
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
}

export default Modal;
