import React, { useEffect, useState } from "react";
import { api } from "../../constants/api";

function Capital() {
  const [worldData, setWorldData] = useState();
  const [countryData, setCountryData] = useState();
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <main>Fetching World...</main>;
  }
  if (loading === false) {
    
  }
  return (
    <div>
      <div>{worldData.length}</div>
      <div>{countryData.capital.length}</div>
      <div>{countryData.name}</div>
      <div>{countryData.capital}</div>
    </div>
  );
}

export default Capital;
