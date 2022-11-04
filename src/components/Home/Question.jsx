import React, { useEffect, useState } from "react";
import { api } from "../../constants/api";

function Question({ setLetter, setAccomplished, correctLetters, setCorrectLetters, attempts, setAttempts, displayLetter, setDisplayLetter, gameStarted, countryData, setCountryData }) {
  const [worldData, setWorldData] = useState();
  const [loading, setLoading] = useState(true);
  const [underscore, setUnderscore] = useState();
  const [wrongLetters, setWrongLetters] = useState([]);

  onkeyup = (event) => {
    if (gameStarted) {
      setAccomplished(false);
      let currentLetter = event.key;
      console.log(currentLetter);
      setLetter(event.key);
      const capital = countryData.capital;
      let matchedLetter = capital.match(currentLetter) || capital.toLowerCase().match(currentLetter.toLowerCase()) !== null;
      if (matchedLetter) {
        //Search through capital name if input letter can be found
        let currentUnderscore = underscore;
        for (let i = 0; i < capital.length; i++) {
          if (capital[i].toLowerCase() === currentLetter.toLowerCase()) {
            currentLetter = capital[i].toUpperCase() === capital[i] ? currentLetter.toUpperCase() : currentLetter.toLowerCase();
            currentUnderscore = currentUnderscore.substring(0, i) + currentLetter + currentUnderscore.substring(i + 1);
            setCorrectLetters(correctLetters + currentLetter.toLowerCase());
          }
        }
        //Check if user has found all the letters
        if (currentUnderscore === countryData.capital) {
          setUnderscore(currentUnderscore);
          let highLightEl = document.querySelectorAll(".question__capital")[1];
          highLightEl.style.color = "green";
          setTimeout(() => {
            highLightEl.style.color = "black";
            const country = worldData[Math.floor(Math.random() * worldData.length)];
            setCountryData(country);
            setAccomplished(true);
            setWrongLetters([]);
          }, 300);
        } else {
          setUnderscore(currentUnderscore);
        }
      }
      //Is a letter, does not match, has a length of 1 (so that it doesn't accept keys such as "Tab" and isn't already used)
      if (!matchedLetter && /^[a-zA-Z]+$/.test(currentLetter) && currentLetter.length === 1 && !wrongLetters.includes(currentLetter)) {
        setWrongLetters((oldLetters) => [...oldLetters, currentLetter]);
        setAttempts(attempts + 1);
      }
      setDisplayLetter(false);
    }
  };

  useEffect(() => {
    if (!gameStarted && worldData) {
      const country = worldData[Math.floor(Math.random() * worldData.length)];
      setCountryData(country);
      setAccomplished(true);
      setWrongLetters([]);
    }
    // eslint-disable-next-line
  }, [gameStarted]);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(api);
        const data = await response.json();
        const countriesWithCapitals = data.data.filter((country) => country.capital.length > 0);
        setWorldData(countriesWithCapitals);
        const country = countriesWithCapitals[Math.floor(Math.random() * countriesWithCapitals.length)];
        setCountryData(country);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (countryData) {
      setUnderscore(countryData.capital.replace(/[a-z,A-Z]/g, "_"));
    }
  }, [countryData]);

  useEffect(() => {
    //Display the first hidden letter with a simulated keyboard event.
    console.log(displayLetter);
    if (countryData && displayLetter) {
      let char;
      for (let i = 0; i < countryData.capital.length; i++) {
        if (!correctLetters.match(countryData.capital[i].toLowerCase())) {
          char = countryData.capital[i].toLowerCase();
          break;
        }
      }
      let evt = new KeyboardEvent("keyup", {
        key: `${char}`,
      });
      window.dispatchEvent(evt);
      setAttempts(attempts + 1);
    }
    // eslint-disable-next-line
  }, [displayLetter]);

  if (loading) {
    return <main>Fetching World...</main>;
  }

  return (
    <div className="question game__block" style={{ opacity: gameStarted ? 1 : 0 }}>
      <div>What is the capital of "{countryData.name}"?</div>
      <div className="question__capital">{countryData.capital}</div>
      <div className="question__capital">{underscore}</div>
    </div>
  );
}

export default Question;
