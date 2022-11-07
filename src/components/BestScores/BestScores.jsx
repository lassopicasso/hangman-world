import React, { useState, useEffect } from "react";
import Header from "../common/Header";
import { apiScores, apiScoresAfrica, apiScoresAmerica, apiScoresAsia, apiScoresEurope, apiScoresOceanias } from "../../constants/api";

function BestScores({ continent, setContinent }) {
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let currentAPI = continent === "world" ? apiScores : continent === "europe" ? apiScoresEurope : continent === "africa" ? apiScoresAfrica : continent === "america" ? apiScoresAmerica : continent === "asia" ? apiScoresAsia : apiScoresOceanias;
      try {
        const response = await fetch(currentAPI);
        if (response.ok) {
          const data = await response.json();
          let sortedScores = data.data.sort((a, b) => b.attributes.score - a.attributes.score);
          setScores(sortedScores.slice(0, 10));
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [continent]);

  return (
    <>
      <div className="backgroundImg"></div>
      <main>
        <span className="top-header">
          <Header type="first" content="Top 10" />
        </span>
        {loading ? (
          <span style={{ color: "white" }}>"Waking up Mr Heroku (server) and then fetch some scores.."</span>
        ) : (
          <>
            <div className="cta-filters">
              <button className={`cta-filter${continent === "world" ? "-active" : ""}`} onClick={() => setContinent("world")}>
                World
              </button>
              <button className={`cta-filter${continent === "europe" ? "-active" : ""}`} onClick={() => setContinent("europe")}>
                Europe
              </button>
              <button className={`cta-filter${continent === "africa" ? "-active" : ""}`} onClick={() => setContinent("africa")}>
                Africa
              </button>
              <button className={`cta-filter${continent === "asia" ? "-active" : ""}`} onClick={() => setContinent("asia")}>
                Asia
              </button>
              <button className={`cta-filter${continent === "oceania" ? "-active" : ""}`} onClick={() => setContinent("oceania")}>
                Oceania
              </button>
              <button className={`cta-filter${continent === "america" ? "-active" : ""}`} onClick={() => setContinent("america")}>
                America
              </button>
            </div>
            <div className="table">
              {scores.map((score, index) => {
                let ordinalNumber = index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th";
                return (
                  <div className="table__element" key={index}>
                    <div>{score.attributes.name} </div>
                    <div>
                      {index + 1}
                      {ordinalNumber}
                    </div>
                    <div>{score.attributes.score} points </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default BestScores;
