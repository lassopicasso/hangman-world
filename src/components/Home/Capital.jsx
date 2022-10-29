import React, { useEffect, useState } from "react";
import { api } from "../../constants/api";

function Capital({ setLetter, setAccomplished, correctLetters, setCorrectLetters }) {
  const [worldData, setWorldData] = useState();
  const [countryData, setCountryData] = useState();
  const [loading, setLoading] = useState(true);
  const [underscore, setUnderscore] = useState();

  // if (letter) {
  onkeydown = (event) => {
    setAccomplished(false);
    let currentLetter = event.key;
    setLetter(event.key);
    const capital = countryData.capital;
    let matchedLetter = capital.match(currentLetter) || capital.toLowerCase().match(currentLetter.toLowerCase()) !== null;

    if (matchedLetter) {
      //Search through capital name if input letter can be found
      let currentUnderscore = underscore;
      for (let i = 0; i < capital.length; i++) {
        console.log(currentLetter.match(/[a-z]/i));
        if (capital[i].toLowerCase() === currentLetter.toLowerCase()) {
          currentLetter = capital[i].toUpperCase() === capital[i] ? currentLetter.toUpperCase() : currentLetter.toLowerCase();
          currentUnderscore = currentUnderscore.substring(0, i) + currentLetter + currentUnderscore.substring(i + 1);
          setCorrectLetters(correctLetters + currentLetter.toLowerCase());
        }
      }

      //Check if user has found all the letters
      if (currentUnderscore === countryData.capital) {
        const country = worldData[Math.floor(Math.random() * worldData.length)];
        setCountryData(country);
        setAccomplished(true);
      } else {
        setUnderscore(currentUnderscore);
      }
    }
  };

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
  }, []);
  useEffect(() => {
    if (countryData) {
      setUnderscore(countryData.capital.replace(/[a-z,A-Z]/g, "_"));
    }
  }, [countryData]);

  if (loading) {
    return <main>Fetching World...</main>;
  }

  return (
    <div className="country">
      <div>{countryData.name}</div>
      <div className="country__capital">{countryData.capital}</div>
      <div className="country__capital">{underscore}</div>
    </div>
  );
}

export default Capital;
