import React, { useState, useEffect } from "react";

function Alphabet({ letter, accomplished, capitalName, correctLetters }) {
  const alphString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [underscore, setUnderscore] = useState(alphString.replace(/[A-Z]/g, "_"));
  const [underscoreArray, setUnderscoreArray] = useState([]);
  console.log(correctLetters);
  useEffect(() => {
    let currentUnderscore = underscore;
    if (letter) {
      for (let i = 0; i < alphString.length; i++) {
        if (alphString[i].toLowerCase() === letter.toLowerCase()) {
          currentUnderscore = currentUnderscore.substring(0, i) + letter.toUpperCase() + currentUnderscore.substring(i + 1);
        }
      }
      if (accomplished) {
        setUnderscore(alphString.replace(/[A-Z]/g, "_"));
      } else {
        setUnderscore(currentUnderscore);
        let tempArray = [];
        for (let i = 0; i < currentUnderscore.length; i++) {
          tempArray.push(currentUnderscore[i]);
        }
        setUnderscoreArray(tempArray);
      }
    }
  }, [letter]);
  console.log(capitalName);
  return (
    <div className="alphabet">
      <div className="alphabet__underscore">
        {underscoreArray.map((char, index) => {
          return (
            <span className={`${correctLetters.match(letter) && correctLetters.match(char.toLowerCase()) ? "alphabet__success" : char !== "_" ? "alphabet__failure" : ""}`} key={index}>
              {char}
            </span>
          );
        })}
      </div>
      <div className="alphabet__displayed">{alphString}</div>
    </div>
  );
}

export default Alphabet;
