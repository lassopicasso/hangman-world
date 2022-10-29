import React, { useState, useEffect } from "react";

function Alphabet({ letter, accomplished }) {
  const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const [underscore, setUnderscore] = useState(alph.replace(/[A-Z]/g, "_"));

  useEffect(() => {
    if (letter) {
      console.log(accomplished);
      let currentUnderscore = underscore;
      for (let i = 0; i < alph.length; i++) {
        if (alph[i].toLowerCase() === letter.toLowerCase()) {
          currentUnderscore = currentUnderscore.substring(0, i) + letter.toUpperCase() + currentUnderscore.substring(i + 1);
          setUnderscore(currentUnderscore);
          if (accomplished) {
            setUnderscore(alph.replace(/[A-Z]/g, "_"));
          }
        }
      }
    }
  }, [letter]);

  return (
    <div>
      <div className="alphabet">{alph}</div>
      <div className="alphabet">{underscore}</div>
    </div>
  );
}

export default Alphabet;
