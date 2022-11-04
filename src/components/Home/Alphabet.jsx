import React, { useState, useEffect } from "react";

function Alphabet({ letter, accomplished, correctLetters, setCorrectLetters, gameStarted }) {
  const alphString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [underscore, setUnderscore] = useState(alphString.replace(/[A-Z]/g, "_"));
  const [underscoreArray, setUnderscoreArray] = useState([]);
  const [colorEffect, setColorEffect] = useState(false);
  useEffect(() => {
    let currentUnderscore = underscore;
    for (let i = 0; i < alphString.length; i++) {
      if (alphString[i].toLowerCase() === letter) {
        currentUnderscore = currentUnderscore.substring(0, i) + letter.toUpperCase() + currentUnderscore.substring(i + 1);
      }
    }
    let tempArray = [];
    if (accomplished) {
      setUnderscore(alphString.replace(/[A-Z]/g, "_"));
      for (let i = 0; i < alphString.length; i++) {
        tempArray.push("_");
        setCorrectLetters("");
      }
    } else {
      setUnderscore(currentUnderscore);
      for (let i = 0; i < currentUnderscore.length; i++) {
        tempArray.push(currentUnderscore[i]);
      }
    }
    setUnderscoreArray(tempArray);
  }, [letter, accomplished]);

  useEffect(() => {
    const hightlightAlph = document.querySelectorAll(".alphabet__displayed");
    const chars = hightlightAlph.length;
    let interval, interval1, interval2;
    for (let i = 0; i < chars; i++) {
      interval = setInterval(() => {
        hightlightAlph[i].style.color = "#f2be22";
      }, 2000);
      interval1 = setInterval(() => {
        hightlightAlph[i].style.color = "darkgreen";
      }, 4000);
      interval2 = setInterval(() => {
        hightlightAlph[i].style.color = "black";
      }, 3000);
    }
    return () => {
      clearInterval(interval);
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [gameStarted]);

  return (
    <div className="alphabet">
      <div className="alphabet__wrapper">
        {underscoreArray.map((char, index) => {
          return (
            <span className="alphabet__letter" key={index}>
              <span className={`alphabet__underscore ${correctLetters.match(char.toLowerCase()) ? "alphabet__success" : char !== "_" ? "alphabet__failure" : ""}`}>{char}</span>
              <span className="alphabet__displayed">{alphString.substring(index, index + 1)}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Alphabet;
