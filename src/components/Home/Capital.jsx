import React, { useEffect, useState } from "react";
import { api } from "../../constants/api";

function Capital() {
  const [worldData, setWorldData] = useState();
  const [countryData, setCountryData] = useState();
  const [loading, setLoading] = useState(true);
  const [underscore, setUnderscore] = useState();
  // const [underscoreTest, setUnderscoreTest] = useState();
  // const [cTest, setCTest] = useState();

  onkeydown = (event) => {
    let key = event.key;
    const capital = countryData.capital;
    let matchedLetter = capital.match(key) || capital.toLowerCase().match(key) !== null;
    // let capitalTest = cTest;
    // let matchedLetterTest = capitalTest.match(key) || capitalTest.toLowerCase().match(key) !== null;

    if (matchedLetter) {
      //Search through capital name if input letter can be found
      let currentUnderscore = underscore;
      for (let i = 0; i < capital.length; i++) {
        if (capital[i].toLowerCase() === key.toLowerCase()) {
          console.log(capital[i]);
          key = capital[i].toUpperCase() === capital[i] ? key.toUpperCase() : key.toLowerCase();
          currentUnderscore = currentUnderscore.substring(0, i) + key + currentUnderscore.substring(i + 1);
        }
      }

      //Check if user has found all the letters
      if (currentUnderscore === countryData.capital) {
        const country = worldData[Math.floor(Math.random() * worldData.length)];
        setCountryData(country);
      } else {
        setUnderscore(currentUnderscore);
      }
    }
    // if (matchedLetterTest) {
    //   let currentUnderscoreTest = underscoreTest;
    //   for (let i = 0; i < capitalTest.length; i++) {
    //     if (capitalTest[i].toLowerCase() === key.toLowerCase()) {
    //       console.log(capitalTest[i].toUpperCase());
    //       console.log(capitalTest[i]);
    //       console.log(capitalTest[i].toUpperCase() === capitalTest[i]);
    //       key = capitalTest[i].toUpperCase() === capitalTest[i] ? key.toUpperCase() : key.toLowerCase();
    //       // key = i === 0 || capitalTest[i - 1] === (" " || "-") ? key.toUpperCase() : key.toLowerCase();
    //       currentUnderscoreTest = currentUnderscoreTest.substring(0, i) + key + currentUnderscoreTest.substring(i + 1);
    //     }
    //   }
    //   setUnderscoreTest(currentUnderscoreTest);
    // }
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
        // setCTest("Saint-Pierre");
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
      // setUnderscoreTest(cTest.replace(/[a-z,A-Z]/g, "_"));
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
      {/* <div className="country__capital">{cTest}</div>
      <div className="country__capital">{underscoreTest}</div> */}
    </div>
  );
}

export default Capital;
