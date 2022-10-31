import React, { useState, useEffect } from "react";

function Alphabet({ letter, accomplished, correctLetters }) {
  const alphString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [underscore, setUnderscore] = useState(alphString.replace(/[A-Z]/g, "_"));
  const [underscoreArray, setUnderscoreArray] = useState([]);

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
      }
    } else {
      setUnderscore(currentUnderscore);
      for (let i = 0; i < currentUnderscore.length; i++) {
        tempArray.push(currentUnderscore[i]);
      }
    }
    setUnderscoreArray(tempArray);
  }, [letter, accomplished]);

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
