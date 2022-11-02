import React from "react";

function Modal({ gameStarted, setGameStarted }) {
  return (
    <div className="start-game" style={{ opacity: gameStarted ? 0 : 1 }}>
      <p>How well do you know the World's capitals?</p>
      <button onClick={() => setGameStarted(true)}>Start game</button>
    </div>
  );
}

export default Modal;
