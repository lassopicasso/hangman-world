import React, { useEffect, useState } from "react";
import { api } from "../../constants/api";
import { statsReaction } from "../../js/common";
import { europe, asia, africa, america, oceania } from "../../constants/continents";

function Question({ setLetter, setAccomplished, correctLetters, setCorrectLetters, attempts, setAttempts, displayLetter, setDisplayLetter, gameStarted, countryData, setCountryData, continent, worldData, setWorldData }) {
  const [loading, setLoading] = useState(true);
  const [underscore, setUnderscore] = useState();
  const [wrongLetters, setWrongLetters] = useState([]);
  const [chosenCountries, setChosenCountries] = useState([]);

  onkeyup = (event) => {
    console.log(event);
    if (gameStarted) {
      setAccomplished(false);
      let currentLetter = event.key;
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
          let highLightEl = document.querySelector(".question__capital");
          console.log(highLightEl);
          highLightEl.style.color = "green";
          setTimeout(() => {
            highLightEl.style.color = "black";
            console.log(chosenCountries);
            const country = chosenCountries[Math.floor(Math.random() * chosenCountries.length)];
            let currentCountriesLeft = chosenCountries.filter((place) => place.name !== country.name);
            setChosenCountries(currentCountriesLeft);
            if (currentCountriesLeft.length === 0) {
              setAttempts(100);
            }
            setCountryData(country);
            setAccomplished(true);
            setWrongLetters([]);
          }, 400);
        } else {
          setUnderscore(currentUnderscore);
        }
      }
      //Is a letter, does not match, has a length of 1 (so that it doesn't accept keys such as "Tab" and isn't already used)
      if (!matchedLetter && /^[a-zA-Z]+$/.test(currentLetter) && currentLetter.length === 1 && !wrongLetters.includes(currentLetter)) {
        setWrongLetters((oldLetters) => [...oldLetters, currentLetter]);
        setAttempts(attempts + 1);
        statsReaction(".stats__attempt");
      }
      setDisplayLetter(false);
    }
  };

  useEffect(() => {
    let countriesArray;
    let currentContinent = continent === "europe" ? europe : continent === "asia" ? asia : continent === "africa" ? africa : continent === "america" ? america : continent === "oceania" ? oceania : worldData;
    if (worldData) {
      if (continent !== "world") {
        countriesArray = worldData.filter((country) => currentContinent.includes(country.iso3));
        setChosenCountries(countriesArray);
      } else {
        countriesArray = worldData;
        setChosenCountries(countriesArray);
      }
      const country = countriesArray[Math.floor(Math.random() * countriesArray.length)];
      setCountryData(country);
    }
    // eslint-disable-next-line
  }, [continent]);

  useEffect(() => {
    if (!gameStarted && worldData) {
      console.log(chosenCountries);
      const country = chosenCountries[Math.floor(Math.random() * chosenCountries.length)];
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
        console.log(chosenCountries);
        setCountryData(country);
        setChosenCountries((oldCountries) => [...oldCountries, country]);
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
      statsReaction(".stats__attempt");
    }
    // eslint-disable-next-line
  }, [displayLetter]);

  if (loading) {
    return <main>Fetching World...</main>;
  }
  console.log(countryData);
  return (
    <div className="question game__block" style={{ opacity: gameStarted ? 1 : 0 }}>
      <div>What is the capital of "{countryData.name}"?</div>
      <div className="question__capital">{underscore}</div>
    </div>
  );
}

export default Question;
