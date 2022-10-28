import React, { useEffect, useState } from "react";
import { api } from "../../constants/api";

function Capital() {
  const [worldData, setWorldData] = useState();
  const [countryData, setCountryData] = useState();
  const [loading, setLoading] = useState(true);
  const [underscore, setUnderscore] = useState();

  onkeydown = (event) => {
    let key = event.key;
    console.log(countryData.capital);
    const capital = countryData.capital.toLowerCase();
    let matchedLetter = capital.match(key) !== null;

    if (matchedLetter) {
      console.log("hello");
      //Search through capital name if input letter can be found
      let currentUnderscore = underscore;
      for (let i = 0; i < capital.length; i++) {
        if (capital[i] === key.toLowerCase()) {
          key = i === 0 || capital[i - 1] === " " ? key.toUpperCase() : key;
          currentUnderscore = currentUnderscore.substring(0, i) + key + currentUnderscore.substring(i + 1);
        }
      }
      setUnderscore(currentUnderscore);
    }
    console.log(capital.match(key));
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
      <div>{worldData.length}</div>
      <div>{countryData.capital.length}</div>
      <div>{countryData.name}</div>
      <div className="country__capital">{countryData.capital}</div>
      <div className="country__capital">{underscore}</div>
    </div>
  );
}

export default Capital;
